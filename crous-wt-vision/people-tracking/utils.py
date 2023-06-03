import cv2

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

def is_above_line(vector, line_vector):
    # cross product
    p = line_vector.x * vector.y - line_vector.y * vector.x
    return p < 0

def to_vector(point1, point2):
    return Point(point2.x - point1.x, point2.y - point1.y)

class Counter:
    def __init__(self):
        self.up = 0
        self.down = 0
    def inc_count_up(self):
        self.up += 1
    def inc_count_down(self): 
        self.down += 1


def update_counter(detection,line,line_vector, tracker_states, counter):
    # if id is not None:
    box, id, class_, conf = detection
    x1, y1, x2, y2 = box
    cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
    vector = to_vector(Point(cx, cy), line[0])
    state = is_above_line(vector, line_vector)
    # handle new id (new detection)
    if id not in tracker_states:
        tracker_states[id] = state
        print(f"New person {id} with state {state}")
    # handle state change (crossed line)
    if tracker_states[id] != state:
        if state:
            print(f"Person {id} crossed the line downwards")
            counter.inc_count_down()
        else:
            print(f"Person {id} crossed the line upwards")
            counter.inc_count_up()
        tracker_states[id] = state


def draw_detection(frame, model, detection, counter):
    box, id, class_, conf = detection
    print("Drawing, ", box, id, class_, conf)
    cv2.rectangle(frame, (box[0], box[1]), (box[2], box[3]), (0, 255, 0), 2)
    # draw center
    cx, cy = (box[0] + box[2]) // 2, (box[1] + box[3]) // 2
    cv2.circle(frame, (cx, cy), 1, (0, 0, 255), -1)
    cv2.putText(
        frame,
        f"Id {id} {model.names[class_]} - {conf:0.2f}",
        (box[0], box[1]),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.5,
        (0, 0, 255),
        1,
    )
    cv2.putText(
        frame,
        f"Count Up: {counter.up}",
        (50, 50),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 0, 255),
        2,
    )
    cv2.putText(
        frame,
        f"Count Down: {counter.down}",
        (50, 100),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 0, 255),
        2,
    )
  
    
    
