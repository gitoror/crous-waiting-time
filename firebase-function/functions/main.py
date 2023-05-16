# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

import os

from firebase_functions import https_fn
from firebase_admin import initialize_app
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
