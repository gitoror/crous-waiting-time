from PIL import Image
from io import BytesIO
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

cred = credentials.Certificate(
    '/Users/tom/Desktop/crous-wt-firebase-adminsdk-5z2ii-e6b7253741.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'crous-wt.appspot.com'
})

bucket = storage.bucket("crous-wt")

# # Download an image from the bucket
# blob = bucket.blob("2.jpg")
# image_data = BytesIO()
# blob.download_to_file(image_data)
# image_data.seek(0)
# image = Image.open(image_data)
# image.show()

# And process the image


# def countPerson(img):
#     img_grey = img.convert("L")
#     width, height = img_grey.size
#     nb_pixels_per_person = 70
#     pixelsGrey = [[0 for x in range(width)] for y in range(height)]
#     for x in range(width):
#         for y in range(height):
#             g = img_grey.getpixel((x, y))
#             pixelsGrey[y][x] = g
#     M = max(
#         [max(pixelsGrey[i]) for i in range(len(pixelsGrey))]
#     )
#     count = 0
#     for i in range(len(pixelsGrey)):
#         for j in range(len(pixelsGrey[0])):
#             if pixelsGrey[i][j] >= M - 10:
#                 count += 1
#     return int(count / nb_pixels_per_person)


# print(countPerson(image))


# Upload an image to the bucket
blob = bucket.blob("8.jpg")
blob.metadata = {"processed": "false"}
blob.content_type = 'image/jpeg'
blob.upload_from_filename("images/4.jpg")
