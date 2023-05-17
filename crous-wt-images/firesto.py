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
# blob = bucket.blob("1.jpg")
# image_data = BytesIO()
# blob.download_to_file(image_data)
# image_data.seek(0)
# image = Image.open(image_data)
# image.show()

# # Upload an image to the bucket
# blob = bucket.blob("4.jpg")
# blob.metadata = {"processed": "false"}
# blob.content_type = 'image/jpeg'
# blob.upload_from_filename("images/4.jpg")
