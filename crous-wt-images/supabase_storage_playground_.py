from supabase import create_client
import os
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO
load_dotenv()

# Create client
url = os.getenv("SUPABASE_URL")
service_key = os.getenv("SUPABASE_KEY")
headers = {"Authorization": f"Bearer {service_key}"}

# Retrieve buckets
storage_client = create_client(url, headers, is_async=False)
print(storage_client.list_buckets())

# Download files
res = storage_client.from_('img').download("images/2.jpg")
print(type(res))

# Open image from bytes with PIL
image = Image.open(BytesIO(res))

# Afficher l'image
image.show()
img = Image.open("Capture2.PNG")
width, height = img.size
pixels = [[0 for x in range(width)] for y in range(height)]
for x in range(width):
    for y in range(height):
        r, g, b, a = img.getpixel((x, y))
        pixels[y][x] = (r, g, b, a)

print(pixels)

# Download a file
with open("coucou.jpg", 'wb+') as f:
    res = storage_client.from_('img').download("images/2.jpg")
    f.write(res)

# Upload a file
with open("images/1.jpg", 'rb+') as f:
    res = storage_client.from_('img').upload(
        "images/1.jpg", os.path.abspath("images/1.jpg"), {"content-type": "image/jpeg"})
