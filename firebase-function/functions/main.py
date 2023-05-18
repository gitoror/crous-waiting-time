# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`


import os
import pathlib
from firebase_functions import https_fn
from firebase_functions import storage_fn
from firebase_admin import initialize_app
from firebase_admin import storage
# from storage3 import create_client
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
from supabase import create_client
load_dotenv()


initialize_app()


@https_fn.on_request()
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    supabase = create_client(url, key)

    response = supabase.table('number_persons').select("*").execute()

    return https_fn.Response(f'I am a function! {response}')


def count_person(img):
    img_grey = img.convert("L")
    width, height = img_grey.size
    nb_pixels_per_person = 70
    pixelsGrey = [[0 for x in range(width)] for y in range(height)]
    for x in range(width):
        for y in range(height):
            g = img_grey.getpixel((x, y))
            pixelsGrey[y][x] = g
    M = max(
        [max(pixelsGrey[i]) for i in range(len(pixelsGrey))]
    )
    count = 0
    for i in range(len(pixelsGrey)):
        for j in range(len(pixelsGrey[0])):
            if pixelsGrey[i][j] >= M - 10:
                count += 1
    return int(count / nb_pixels_per_person)


@storage_fn.on_object_finalized()
def process_images(
    event: storage_fn.CloudEvent[storage_fn.StorageObjectData],
):
    bucket_name = event.data.bucket
    file_path = pathlib.PurePath(event.data.name)
    content_type = event.data.content_type

    if not content_type or not content_type.startswith("image/"):
        print(f"This is not an image. ({content_type})")
        return

    bucket = storage.bucket(bucket_name)
    image_blob = bucket.blob(str(file_path))
    image_bytes = image_blob.download_as_bytes()
    image = Image.open(BytesIO(image_bytes))
    val = count_person(image)
    print(val)
    if image_blob.metadata == None:
        image_blob.metadata = {"processed": "true"}
    else:
        image_blob.metadata["processed"] = "true"
    image_blob.patch()  # update metadata on firebase bucket

    # update on supabase
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    supabase = create_client(url, key)
    data, count = supabase.table('number_persons').insert(
        {"nb_of_persons": val, "img_id": event.data.name}).execute()
