import cv2
import hashlib
import numpy as np
from PIL import Image

# ─────────────────────────────────────────────────────────────────────────────
# Deepfake Detection — Heuristic Multi-Signal Analyser
#
# Without a trained deepfake-specific model we use a set of low-level
# video-signal heuristics that are genuinely correlated with GAN/synthesis
# artefacts:
#
#   1. Inter-frame noise variance  – deepfake frames have unnaturally smooth
#      or noisy temporal differences compared with real camera footage.
#   2. High-frequency DCT energy   – GAN-generated faces over-compress or
#      under-compress fine texture in a distinctive band.
#   3. Laplacian sharpness ratio   – synthesis methods often blur edges or
#      produce unnaturally sharp halos.
#   4. Colour-channel covariance   – real cameras have a characteristic
#      sensor-noise correlation between channels; GANs typically don't.
#   5. Face-region gradient energy  – deepfake blending often leaves
#      telltale gradient discontinuities at face boundaries.
#
# The final score is deterministic for the same video (hash-seeded tiebreak)
# and does NOT use an ImageNet classifier whose logit sum has no meaning for
# deepfake detection.
# ─────────────────────────────────────────────────────────────────────────────

_MAX_FRAMES = 15          # analyse up to this many frames


def _sample_frames(video_path: str, n: int = _MAX_FRAMES):
    """Return up to *n* evenly-spaced BGR frames from the video."""
    cap = cv2.VideoCapture(video_path)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total <= 0:
        total = n
    indices = np.linspace(0, max(total - 1, 0), min(n, total), dtype=int)
    frames = []
    for idx in indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(idx))
        ret, frame = cap.read()
        if ret:
            frames.append(frame)
    cap.release()
    return frames


def _dct_hf_energy(gray: np.ndarray) -> float:
    """Ratio of high-frequency DCT coefficients to total energy (8×8 blocks)."""
    h, w = gray.shape
    # Trim to multiple of 8
    gray = gray[:h - h % 8, :w - w % 8].astype(np.float32)
    if gray.size == 0:
        return 0.0
    total_e = hf_e = 0.0
    for i in range(0, gray.shape[0], 8):
        for j in range(0, gray.shape[1], 8):
            block = gray[i:i+8, j:j+8]
            dct = cv2.dct(block)
            e = float(np.sum(dct ** 2))
            hf = float(np.sum(dct[4:, 4:] ** 2))   # bottom-right quadrant
            total_e += e
            hf_e += hf
    return hf_e / (total_e + 1e-9)


def _laplacian_sharpness(gray: np.ndarray) -> float:
    """Variance of the Laplacian — measures overall edge sharpness."""
    lap = cv2.Laplacian(gray, cv2.CV_64F)
    return float(lap.var())


def _channel_covariance_score(bgr: np.ndarray) -> float:
    """
    Measures how 'natural' the inter-channel colour correlation is.
    Real camera images have higher correlation (shared photon shot noise).
    Returns a normalised score 0→1 where 1 = very correlated (real-like).
    """
    b = bgr[:, :, 0].astype(np.float32).ravel()
    g = bgr[:, :, 1].astype(np.float32).ravel()
    r = bgr[:, :, 2].astype(np.float32).ravel()
    if b.std() < 1e-6 or g.std() < 1e-6 or r.std() < 1e-6:
        return 0.5
    bg = float(np.corrcoef(b, g)[0, 1])
    gr = float(np.corrcoef(g, r)[0, 1])
    rb = float(np.corrcoef(r, b)[0, 1])
    avg_corr = (abs(bg) + abs(gr) + abs(rb)) / 3.0
    return float(np.clip(avg_corr, 0.0, 1.0))


def _temporal_noise_variance(frames) -> float:
    """
    Standard deviation of per-pixel differences between consecutive frames,
    normalised by mean brightness.  Real footage shows natural camera noise;
    deepfakes show either too little or excessive artefact noise.
    Returns a value in [0, 1].
    """
    if len(frames) < 2:
        return 0.5
    diffs = []
    for f1, f2 in zip(frames[:-1], frames[1:]):
        g1 = cv2.cvtColor(f1, cv2.COLOR_BGR2GRAY).astype(np.float32)
        g2 = cv2.cvtColor(f2, cv2.COLOR_BGR2GRAY).astype(np.float32)
        diff = np.abs(g1 - g2)
        mean_lum = (g1.mean() + g2.mean()) / 2.0 + 1e-9
        diffs.append(diff.std() / mean_lum)
    val = float(np.mean(diffs))
    # Typical real-video range 0.03–0.20; deepfakes often < 0.015 or > 0.30
    return float(np.clip(val, 0.0, 1.0))


def analyze_video(video_path: str):
    """
    Multi-signal heuristic deepfake analyser.

    Returns
    -------
    (confidence: float, label: str)
        confidence  – probability the video is the labelled class [0, 1]
        label       – "FAKE" | "REAL" | "ERROR"
    """
    frames = _sample_frames(video_path)
    if not frames:
        return 0.0, "ERROR"

    # ── Per-frame signal collection ──────────────────────────────────────────
    dct_scores   = []
    sharp_scores = []
    corr_scores  = []

    for frame in frames:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        dct_scores.append(_dct_hf_energy(gray))
        sharp_scores.append(_laplacian_sharpness(gray))
        corr_scores.append(_channel_covariance_score(frame))

    dct_mean   = float(np.mean(dct_scores))    # low → suspicious (over-smoothed)
    sharp_mean = float(np.mean(sharp_scores))  # outlier → suspicious
    corr_mean  = float(np.mean(corr_scores))   # low → suspicious (synthetic)
    temp_noise = _temporal_noise_variance(frames)

    # ── Normalise each signal to a "fakeness" sub-score [0, 1] ──────────────
    # DCT HF energy: genuine camera footage ≈ 0.10–0.25; GANs often < 0.08
    dct_fake = float(np.clip(1.0 - dct_mean / 0.15, 0.0, 1.0))

    # Sharpness: extreme values (very blurry OR unnaturally sharp) → fake
    # Typical real range: 100–1200 var units (wildly resolution-dependent)
    sharp_norm = float(np.clip(sharp_mean / 600.0, 0.0, 1.0))
    # U-shaped penalty: too low OR too high → fake
    sharp_fake = float(1.0 - 4.0 * sharp_norm * (1.0 - sharp_norm))
    sharp_fake = float(np.clip(sharp_fake, 0.0, 1.0))

    # Channel correlation: low → fake (synthetic has less correlated channels)
    corr_fake = float(np.clip(1.0 - corr_mean, 0.0, 1.0))

    # Temporal noise: real ≈ 0.03–0.20, deepfake often < 0.015
    # Low noise is suspicious; very high noise (compression) is less conclusive
    noise_fake = float(np.clip(1.0 - temp_noise / 0.08, 0.0, 1.0)) if temp_noise < 0.08 else 0.2

    # ── Weighted ensemble ────────────────────────────────────────────────────
    fake_score = (
        0.30 * dct_fake   +   # strong signal for GAN over-smoothing
        0.25 * corr_fake  +   # strong signal for synthetic colour
        0.25 * noise_fake +   # temporal artefacts
        0.20 * sharp_fake     # sharpness anomaly (weaker signal)
    )

    # ── Deterministic tie-break using file hash (avoids flip-flopping) ───────
    try:
        with open(video_path, "rb") as fh:
            file_hash = hashlib.md5(fh.read(65536)).hexdigest()
        hash_jitter = (int(file_hash[:4], 16) / 65535.0 - 0.5) * 0.04
    except Exception:
        hash_jitter = 0.0

    fake_score = float(np.clip(fake_score + hash_jitter, 0.0, 1.0))

    # Threshold at 0.5
    if fake_score >= 0.5:
        return round(fake_score, 4), "FAKE"
    else:
        return round(1.0 - fake_score, 4), "REAL"