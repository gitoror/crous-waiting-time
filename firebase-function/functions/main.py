# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

import os
import pathlib

from firebase_functions import https_fn
from firebase_functions import storage_fn
from firebase_admin import initialize_app
from firebase_admin import storage
from storage3 import create_client
from PIL import Image
from io import BytesIO
from firebase_functions.params import IntParam, StringParam

initialize_app()


@https_fn.on_request()
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    headers = {"Authorization": f"Bearer {key}"}
    storage_client = create_client(url, headers, is_async=False)
    b = storage_client.list_buckets()
    return https_fn.Response(f'{url}! I am a function!')


@storage_fn.on_object_finalized()
def process_images(
    event: storage_fn.CloudEvent[storage_fn.StorageObjectData],
):
    bucket_name = event.data.bucket
    file_path = pathlib.PurePath(event.data.name)
    content_type = event.data.content_type

    # if not content_type or not content_type.startswith("image/"):
    #     print(f"This is not an image. ({content_type})")
    #     return

    # if event.data.metadata["processed"] == "true":
    #     print("Already processed.")
    #     return
    bucket = storage.bucket(bucket_name)
    image_blob = bucket.blob(str(file_path))
    image_bytes = image_blob.download_as_bytes()
    image = Image.open(BytesIO(image_bytes))
    val = process_image(image)
    print(val)
    if image_blob.metadata == None:
        image_blob.metadata = {"processed": "true"}
    else:
        image_blob.metadata["processed"] = "true"
    image_blob.patch()


def process_image(image: Image):
    return 0
