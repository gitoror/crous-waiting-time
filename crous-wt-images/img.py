# stocker l'image das un variable

from PIL import Image
img = Image.open("Capture2.PNG")
width, height = img.size
pixels = [[0 for x in range(width)] for y in range(height)]
for x in range(width):
    for y in range(height):
        r, g, b, a = img.getpixel((x, y))
        pixels[y][x] = (r, g, b, a)

# print(pixels)

imgGrey = img.convert("L")
imgGrey.save("image_gris.png")
imGrey = Image.open("image_gris.png")

pixelsGrey = [[0 for x in range(width)] for y in range(height)]
for x in range(width):
    for y in range(height):
        g = imgGrey.getpixel((x, y))
        pixelsGrey[y][x] = g


# affiche la valeur max de pixelsGrey


M = max(
    [max(pixelsGrey[i]) for i in range(len(pixelsGrey))]
)
# compter le nombre de pixels qui sont entre M - 10 et M

count = 0
for i in range(len(pixelsGrey)):
    for j in range(len(pixelsGrey[0])):
        if pixelsGrey[i][j] >= M - 10:
            count += 1
# print(count)

# afficher le pourcentage de pixels qui sont entre M - 10 et M

# print(count / (width * height) * 100)

# Calculer le nombre de personne présente sur l'image
# sachant qu'un personne correspond aux pixels entre M - 10 et M
# 1 personne = 40 pixel dans le techlab
# convertir en entier

# print(int(count / 40))

# importer les 8 images i.png pour i allant de 1 à 8, les convertir en gris et les stocker dans une matrice

# Path: img.jpg

im1 = Image.open("1.jpg")
im2 = Image.open("2.jpg")
im3 = Image.open("3.jpg")
im4 = Image.open("4.jpg")
im5 = Image.open("5.jpg")
im6 = Image.open("6.jpg")
im7 = Image.open("7.jpg")
im8 = Image.open("8.jpg")

im1Grey = im1.convert("L")
im2Grey = im2.convert("L")
im3Grey = im3.convert("L")
im4Grey = im4.convert("L")
im5Grey = im5.convert("L")
im6Grey = im6.convert("L")
im7Grey = im7.convert("L")
im8Grey = im8.convert("L")

im1Grey.save("1Grey.jpg")
im2Grey.save("2Grey.jpg")
im3Grey.save("3Grey.jpg")
im4Grey.save("4Grey.jpg")
im5Grey.save("5Grey.jpg")
im6Grey.save("6Grey.jpg")
im7Grey.save("7Grey.jpg")
im8Grey.save("8Grey.jpg")

# calculer le nombre de personne présente sur chaque image


def countPerson(img):
    width, height = img.size
    pixelsGrey = [[0 for x in range(width)] for y in range(height)]
    for x in range(width):
        for y in range(height):
            g = img.getpixel((x, y))
            pixelsGrey[y][x] = g
    M = max(
        [max(pixelsGrey[i]) for i in range(len(pixelsGrey))]
    )
    count = 0
    for i in range(len(pixelsGrey)):
        for j in range(len(pixelsGrey[0])):
            if pixelsGrey[i][j] >= M - 10:
                count += 1
    return int(count / 70)

# calculer le nombre de personne présente sur chaque image
# et afficher le résultat


print(countPerson(im1Grey))
print(countPerson(im2Grey))
print(countPerson(im3Grey))
print(countPerson(im4Grey))
print(countPerson(im5Grey))
print(countPerson(im6Grey))
print(countPerson(im7Grey))
print(countPerson(im8Grey))
