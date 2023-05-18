
from google.cloud import storage
from supabase import create_client
import os
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO
load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

response = supabase.table('number_persons').select("*")
print(response)


# url = os.getenv("SUPABASE_URL")
# service_key = os.getenv("SUPABASE_KEY")
# # service key !!!! apiKey inutile dans les headers
# headers = {"Authorization": f"Bearer {service_key}"}

# storage_client = create_client(url, headers, is_async=False)
# print(storage_client.list_buckets())

# res = storage_client.from_('img').download("images/2.jpg")
# print(type(res))

# # Ouvrir l'image à partir des bytes
# image = Image.open(BytesIO(res))

# # Afficher l'image
# image.show()
# img = Image.open("Capture2.PNG")
# width, height = img.size
# pixels = [[0 for x in range(width)] for y in range(height)]
# for x in range(width):
#     for y in range(height):
#         r, g, b, a = img.getpixel((x, y))
#         pixels[y][x] = (r, g, b, a)

# print(pixels)
# download file
# with open("coucou.jpg", 'wb+') as f:
#     res = storage_client.from_('img').download("images/2.jpg")
#     f.write(res)

# upload file
# with open("images/1.jpg", 'rb+') as f:
#     res = storage_client.from_('img').upload(
#         "images/1.jpg", os.path.abspath("images/1.jpg"), {"content-type": "image/jpeg"})

# TODO : créer worker python qui download les images et les traite puis
# envoie les données à la base de données

# TODO : créer une fonction python qui upload automatiquement les images dans la base de données
# lorsqu'elles sont ajoutées dans le dossier images
