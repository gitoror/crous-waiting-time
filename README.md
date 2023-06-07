## Crous Waiting Time

Ce projet a pour objectif d'afficher le temps d'attente dans la queue de la cantine de l'école.
Les `slides` de la soutenances sont également disponibles à la racine du repository.
Le projet se décline en deux versions :

# 1. Sondage - Advanced Software Engineering

En sondant les personnes dans la file d'attente, le temps d'attente par cette approche est affiché sur le site internet `https://crous-waiting-time.vercel.app`. Le temps d'attente est égal à la moyenne des réponses du sondage. Cette moyenne est issue d'un calcul réalise dans le cloud sur Cloudflare workers.

# 2. Analyse d'images/vidéos - Ambient systems

L'approche consiste à compter le nombre de personnes dans la file pour estimer le temps d'attente, qui est proportionnel au nombre de personnes dans la file. Le coefficient de proportionalité n'est pas dimensionné puisque nous n'avons des tests que sur des vidéos prises sur internet.  
Pour cela, une caméra (infrarouge ou non) prend en vidéo la zone d'entrée du crous. Puis les images sont traités.
Deux approches on été envisagées :

- Traitement par caméra infrarouge : Le nombre de personnes sur chaque images est obtenu en comptant les pixels chauds. Le calcul est réalisé sur le cloud avec Google Cloud. Nous utilisons Firebase pour stocker les images et Supabase pour stocker les données résulats. C'est tout à fait fonctionnel, le résultat n'est pas encore intégré au calcul du temps d'attente donc s'actualise sous forme brute sur le site `https://crous-waiting-time.vercel.app/counter_person`

- Traitement par suivi de personnes : Le nombre de personnes est obtenu en comptant les personnes entrant dans la file d'attente les 5 dernières minutes. Pour cela, on utilise la biblitohèque `ultralytics` pour disposer des outils de détection (YOLOv8) et de tracking (Bot-SORT). Une fois les personnes suivies, notre programme regadre si les personnes traversent une ligne virtuelle (produit vectoriel) et effectue les comptage. Comme démontré pendant la soutenance, le temps d'attente est calculé en même temps que le traitement de la vidéo. La solution n'a pas été développée jusqu'à la vidéo en live, mais c'est l'objectif. Un autre objectif est de réaliser le traitement sur l'edge ou sur le cloud (préférable sur l'edge), notamment en s'inspirant du travail déjà effectué avec l'approche par caméra infrarouge qui utilise Google Cloud. Le développement a necessité l'uitlisation de Google Colab pour faire tourner le programme sur GPU.

Il est possible de voir le résultat du suvi de personnes implémenté à la racine du repository `people_out.mp4`

# Les dossiers

- `crous-wt-app` : partie Ambient systems et Adv Software Engineering - site web `https://crous-waiting-time.vercel.app/`
- `crous-wt-images` : partie Ambient systems - traitement caméra infrarouge
- `crous-wt-vision` : partie Ambient systems - traitement par suivi de personnes
- `cloud-google`: partie Ambient systems - cloud function Google cloud pour traiter les images infrarouges
- `cloud-firebase` : partie Adv Software Engineering - cloud function Cloudflare worker pour la moyenne du temps d'attente
