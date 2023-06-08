import cv2
from pathlib import Path
from ultralytics import YOLO
import os


model = YOLO("yolo_models/yolov8n.pt")

for i in range(1, 9):
    res = model(
        f"images/{i}.jpg")

    res_plotted = res[0].plot()
    cv2.imshow("result", res_plotted)
    cv2.waitKey(0)
    cv2.imwrite(f"images/{i}_out.jpg", res_plotted)
