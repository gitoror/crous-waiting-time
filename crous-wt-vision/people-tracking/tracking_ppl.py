import cv2
import logging
from ultralytics import YOLO
from utils import Point, to_vector, draw_detection, update_counter, Counter

cap = cv2.VideoCapture("../videos/people_.mp4")
mask = cv2.imread("../images/mask.png")
model = YOLO("../yolov8n.pt")

tracker_states = {}
line = [Point(295, 454), Point(1004, 454)]
line_vector = to_vector(line[0], line[1])
counter = Counter()

while True:
    # Read
    ret, frame = cap.read()
    if not ret:
        logging.error("Video ended or error reading file.")
        break
    frame_mask = cv2.bitwise_and(frame, mask)
    # Detect/Track
    results = model.track(frame_mask, persist=True)
    boxes = results[0].boxes.xyxy.cpu().numpy().astype(int)
    ids = results[0].boxes.id.cpu().numpy().astype(int)
    classes = results[0].boxes.cls.cpu().numpy().astype(int)
    confs = results[0].boxes.conf.cpu().numpy()
    # Counter
    for detection in zip(boxes, ids, classes, confs):
        update_counter(detection, line,line_vector, tracker_states,counter)    
    # Draw
    cv2.line(frame, (line[0].x, line[0].y), (line[1].x, line[1].y), (0, 0, 255), 2)
    for detection in zip(boxes, ids, classes, confs):
        draw_detection(frame, model, detection, counter)
    cv2.imshow("frame", frame)
    # Exit
    if cv2.waitKey(0) & 0xFF == ord("q"):
        break
