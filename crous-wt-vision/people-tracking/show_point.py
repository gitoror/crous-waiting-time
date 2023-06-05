import cv2

# Mouse callback function


def get_coordinates(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        print("Coordinates: ({}, {})".format(x, y))


# Create a black image
video = cv2.VideoCapture("../videos/people_.mp4")
mask = cv2.imread("../images/mask.png")

_, img = video.read()
imgMask = cv2.bitwise_and(img, mask)
cv2.line(imgMask, (295, 274), (1004, 274), (0, 0, 255), 1)
cv2.line(imgMask, (295, 454), (1004, 454), (0, 0, 255), 1)
cv2.line(imgMask, (295, 634), (1004, 634), (0, 0, 255), 1)
cv2.imshow("Image", imgMask)


# Set the callback function for mouse events
cv2.setMouseCallback("Image", get_coordinates)

# Wait for a key press
cv2.waitKey(0)

# Close all windows
cv2.destroyAllWindows()
