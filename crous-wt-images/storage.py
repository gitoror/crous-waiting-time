from storage3 import create_client
import os
from dotenv import load_dotenv
load_dotenv()

url = os.getenv("SUPABASE_URL")
service_key = os.getenv("SUPABASE_KEY")
# service key !!!! apiKey inutile dans les headers
headers = {"Authorization": f"Bearer {service_key}"}

storage_client = create_client(url, headers, is_async=False)
print(storage_client.list_buckets())

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
