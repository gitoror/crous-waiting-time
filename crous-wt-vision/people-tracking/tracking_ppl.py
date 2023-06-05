import cv2
import logging
from pathlib import Path
from ultralytics import YOLO
from utils import Point, to_vector, draw_detection, update_counter, Counter
import os
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
print(supabase.table('vision-counter').select("*").execute())
script_dir = os.path.dirname(os.path.abspath(__file__))
cap = cv2.VideoCapture(script_dir+"/../videos/people_.mp4")
mask = cv2.imread(script_dir+"/../images/mask.png")
r, frame = cap.read()
cap_out = cv2.VideoWriter(script_dir+"/../videos/people_out.mp4", cv2.VideoWriter_fourcc(
    *"mp4v"), cap.get(cv2.CAP_PROP_FPS), (frame.shape[1], frame.shape[0]))

model = YOLO("../yolo_models/yolov8n.pt")

tracker_states = {}
line = [Point(295, 454), Point(1004, 454)]
line_vector = to_vector(line[0], line[1])
counter = Counter()

while True:
    # Read
    previous_counter_up = counter.up
    ret, frame = cap.read()
    if not ret:
        print("Video ended or error reading file.")
        break
    frame_mask = cv2.bitwise_and(frame, mask)
    # Detect/Track
    results = model.track(frame_mask, persist=True, verbose=False)
    boxes = results[0].boxes.xyxy.cpu().numpy().astype(int)
    ids = results[0].boxes.id.cpu().numpy().astype(int)
    classes = results[0].boxes.cls.cpu().numpy().astype(int)
    confs = results[0].boxes.conf.cpu().numpy()
    # Counter
    for detection in zip(boxes, ids, classes, confs):
        update_counter(detection, line, line_vector, tracker_states, counter)
    # Draw
    cv2.line(frame, (line[0].x, line[0].y),
             (line[1].x, line[1].y), (0, 0, 255), 2)
    for detection in zip(boxes, ids, classes, confs):
        draw_detection(frame, model, detection, counter)
    cv2.imshow("frame", frame)
    # Exit
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break
    # cap_out.write(frame)
    # Send to firebase
    if counter.up != previous_counter_up:
        diff_counter_up = counter.up - previous_counter_up
        data, count = supabase.table('vision-counter').insert(
            {"count_in": diff_counter_up}).execute()

cap.release()
cap_out.release()
cv2.destroyAllWindows()
