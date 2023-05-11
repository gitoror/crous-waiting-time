Depuis l'ordinateur, on envoie des images au worker (ce sera plus tard automatisé sur un controleur).  
Le worker, qui tourne en boucle, reçoit l'image. Il lance alors les calculs et envoie le résultat à l'app web
qui tourne est dans l'attente d'une réception de la part du worker cloudflare. Elle effiche le résultat sur le site.

image (ordi) --> traitement (worker cloudflare) --> affichage sur l'app web
