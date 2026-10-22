import cv2
import torch
import numpy as np
from PIL import Image
import torchvision.models as models
from torchvision.models import MobileNet_V2_Weights
import torchvision.transforms as transforms
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image

def generate_gradcam(video_path):
    """
    Generates a Grad-CAM heatmap on the first frame of the video
    using MobileNetV2 to show which regions influenced the model.
    """
    cap = cv2.VideoCapture(video_path)
    ret, frame = cap.read()
    cap.release()
    
    if not ret:
        return None
        
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(frame_rgb)
    
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    
    input_tensor = preprocess(pil_img)
    input_batch = input_tensor.unsqueeze(0)
    
    # We need the original image scaled to [0, 1] and cropped similarly to overlay
    # the heatmap properly
    img_resized = cv2.resize(frame_rgb, (256, 256))
    # Center crop 224
    start_x = (256 - 224) // 2
    start_y = (256 - 224) // 2
    rgb_img = img_resized[start_y:start_y+224, start_x:start_x+224]
    rgb_img = np.float32(rgb_img) / 255
    
    model = models.mobilenet_v2(weights=MobileNet_V2_Weights.DEFAULT)
    model.eval()
    
    target_layers = [model.features[-1]]
    
    cam = GradCAM(model=model, target_layers=target_layers)
    
    # We don't have a specific target class for deepfake, so we use highest score
    targets = None 
    
    grayscale_cam = cam(input_tensor=input_batch, targets=targets)
    grayscale_cam = grayscale_cam[0, :]
    
    visualization = show_cam_on_image(rgb_img, grayscale_cam, use_rgb=True)
    
    # Convert back to PIL Image for Streamlit
    return Image.fromarray(visualization)
