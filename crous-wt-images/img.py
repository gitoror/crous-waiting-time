# stocker l'image das un variable

from PIL import Image


# Calculer le nombre de personne présente sur l'image
# sachant qu'un personne correspond aux pixels entre M - 10 et M
# 1 personne = 40 pixel dans le techlab
# convertir en entier

# print(int(count / 40))

# importer les 8 images i.png pour i allant de 1 à 8, les convertir en gris et les stocker dans une matrice

# Path: img.jpg

im1 = Image.open("images/1.jpg")


# calculer le nombre de personne présente sur chaque image


def countPerson(img):
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

# calculer le nombre de personne présente sur chaque image
# et afficher le résultat


print(countPerson(im1))
