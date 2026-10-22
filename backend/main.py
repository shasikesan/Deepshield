import os
import sys
import shutil
import tempfile
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Add the project root to sys.path so we can import src.*
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from src.model.predict import analyze_video
from src.model.explain import generate_gradcam
from src.video_processing.landmarks import extract_face_mesh
from src.blockchain.blockchain_logger import log_to_ledger

app = FastAPI(title="DeepShield API")

# Allow CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure static directory exists for serving images
STATIC_DIR = os.path.join(PROJECT_ROOT, "static")
os.makedirs(STATIC_DIR, exist_ok=True)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.post("/api/analyze")
async def analyze(file: UploadFile = File(...)):
    """Accepts a video upload, runs the AI pipeline, returns results."""
    tfile = tempfile.NamedTemporaryFile(delete=False, suffix='.mp4')
    try:
        shutil.copyfileobj(file.file, tfile)
        tfile.close()
        video_path = tfile.name

        # 1. Run analysis
        confidence_score, result_label = analyze_video(video_path)
        
        # 2. Generate XAI Heatmap
        heatmap_url = None
        try:
            heatmap_img = generate_gradcam(video_path)
            if heatmap_img is not None:
                filename = f"heatmap_{os.path.basename(video_path)}.jpg"
                heatmap_img.save(os.path.join(STATIC_DIR, filename))
                heatmap_url = f"/static/{filename}"
        except Exception as e:
            print(f"Heatmap error: {e}")
            pass

        # 3. Generate Face Mesh
        landmarks_url = None
        try:
            landmarks_img = extract_face_mesh(video_path)
            if landmarks_img is not None:
                filename = f"mesh_{os.path.basename(video_path)}.jpg"
                landmarks_img.save(os.path.join(STATIC_DIR, filename))
                landmarks_url = f"/static/{filename}"
        except Exception as e:
            print(f"Landmarks error: {e}")
            pass

        # 4. Log to Blockchain
        block_hash = ""
        try:
            block_hash = log_to_ledger(file.filename, result_label, confidence_score)
        except Exception:
            block_hash = "logging-unavailable"

        return {
            "status": "success",
            "filename": file.filename,
            "verdict": result_label,
            "confidence": confidence_score,
            "heatmap_url": heatmap_url,
            "landmarks_url": landmarks_url,
            "block_hash": block_hash
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        if os.path.exists(tfile.name):
            try:
                os.unlink(tfile.name)
            except Exception:
                pass

@app.get("/api/health")
async def health():
    return {"status": "ok"}

@app.get("/api/history")
async def get_history():
    from src.blockchain.blockchain_logger import get_ledger
    try:
        ledger = get_ledger()
        # Sort from newest to oldest based on timestamp if needed, but returning as is for now
        return {"status": "success", "history": ledger}
    except Exception as e:
        return {"status": "error", "message": str(e)}
