import os
import cv2
import numpy as np
import mediapipe as mp
from PIL import Image

# ─────────────────────────────────────────────────────────────────────────────
# MediaPipe 1.0+ uses the Tasks API (mp.tasks.vision).
# The legacy mp.solutions.face_mesh was removed in mediapipe >= 1.0.0.
# ─────────────────────────────────────────────────────────────────────────────

# Path to the face_landmarker.task model file (next to the project root)
_PROJECT_ROOT = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
_MODEL_PATH = os.path.join(_PROJECT_ROOT, "face_landmarker.task")

# Lazy-load Tasks API references
BaseOptions         = mp.tasks.BaseOptions
FaceLandmarker      = mp.tasks.vision.FaceLandmarker
FaceLandmarkerOpts  = mp.tasks.vision.FaceLandmarkerOptions
FaceLandmarksConns  = mp.tasks.vision.FaceLandmarksConnections
RunningMode         = mp.tasks.vision.RunningMode
drawing_utils       = mp.tasks.vision.drawing_utils
drawing_styles      = mp.tasks.vision.drawing_styles


def _draw_landmarks_on_image(rgb_image: np.ndarray, detection_result) -> np.ndarray:
    """Draw face mesh landmarks on a copy of the image and return it."""
    annotated = rgb_image.copy()
    for face_landmarks in detection_result.face_landmarks:
        # Convert NormalizedLandmark list to the format draw_landmarks expects
        face_landmarks_proto = _to_landmark_list_proto(face_landmarks, rgb_image.shape)

        # Tessellation
        drawing_utils.draw_landmarks(
            image=annotated,
            landmark_list=face_landmarks_proto,
            connections=FaceLandmarksConns.FACE_LANDMARKS_TESSELATION,
            landmark_drawing_spec=None,
            connection_drawing_spec=drawing_styles.get_default_face_mesh_tesselation_style(),
        )
        # Contours
        drawing_utils.draw_landmarks(
            image=annotated,
            landmark_list=face_landmarks_proto,
            connections=FaceLandmarksConns.FACE_LANDMARKS_CONTOURS,
            landmark_drawing_spec=None,
            connection_drawing_spec=drawing_styles.get_default_face_mesh_contours_style(),
        )
        # Irises (left + right)
        for iris_conn in (
            FaceLandmarksConns.FACE_LANDMARKS_LEFT_IRIS,
            FaceLandmarksConns.FACE_LANDMARKS_RIGHT_IRIS,
        ):
            drawing_utils.draw_landmarks(
                image=annotated,
                landmark_list=face_landmarks_proto,
                connections=iris_conn,
                landmark_drawing_spec=None,
                connection_drawing_spec=drawing_styles.get_default_face_mesh_iris_connections_style(),
            )
    return annotated


def _to_landmark_list_proto(face_landmarks, image_shape):
    """
    Convert a list of mediapipe NormalizedLandmark objects into the
    landmark_pb2.NormalizedLandmarkList proto that drawing_utils expects.
    """
    from mediapipe.framework.formats import landmark_pb2

    h, w = image_shape[:2]
    landmark_list = landmark_pb2.NormalizedLandmarkList()
    for lm in face_landmarks:
        proto_lm = landmark_list.landmark.add()
        proto_lm.x = lm.x
        proto_lm.y = lm.y
        proto_lm.z = lm.z
    return landmark_list


def extract_face_mesh(video_path: str):
    """
    Extracts the first frame of the video, runs MediaPipe FaceLandmarker
    (Tasks API, mediapipe >= 1.0), and returns a PIL image with landmarks drawn.

    Falls back to returning the plain frame if:
    - The video frame cannot be read.
    - The face_landmarker.task model file is missing.
    - No face is detected.
    """
    # Read the first frame
    cap = cv2.VideoCapture(video_path)
    ret, frame = cap.read()
    cap.release()

    if not ret:
        return None

    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Check model file exists
    if not os.path.exists(_MODEL_PATH):
        print(
            f"[landmarks] face_landmarker.task not found at {_MODEL_PATH}. "
            "Run: python -c \"import urllib.request; urllib.request.urlretrieve("
            "'https://storage.googleapis.com/mediapipe-models/face_landmarker/"
            "face_landmarker/float16/1/face_landmarker.task', 'face_landmarker.task')\""
        )
        # Return plain frame so the API doesn't fail entirely
        return Image.fromarray(frame_rgb)

    options = FaceLandmarkerOpts(
        base_options=BaseOptions(model_asset_path=_MODEL_PATH),
        running_mode=RunningMode.IMAGE,
        num_faces=1,
        min_face_detection_confidence=0.5,
        min_face_presence_confidence=0.5,
        min_tracking_confidence=0.5,
        output_face_blendshapes=False,
        output_facial_transformation_matrixes=False,
    )

    with FaceLandmarker.create_from_options(options) as detector:
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame_rgb)
        result = detector.detect(mp_image)

    if not result.face_landmarks:
        # No face detected — return plain frame
        return Image.fromarray(frame_rgb)

    annotated = _draw_landmarks_on_image(frame_rgb, result)
    return Image.fromarray(annotated)
