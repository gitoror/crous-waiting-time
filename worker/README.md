Depuis l'ordinateur, on envoie des images sur supabase (ce sera plus tard automatisé sur un controleur).  
Le worker, qui gette supabase en boucle finit par recevoir l'image. Il lance alors les calculs et envoie le résultat à l'app web
qui tourne est dans l'attente d'une réception de la part du worker cloudflare. Elle effiche le résultat sur le site.

image (ordi) --> bucket supabase --> traitement (worker cloudflare) --> DB supabase --> affichage sur l'app web


Le worker doit : 
- instancier un supabase storage_client
- comparer le contenu du fichier images dans le bucket img de supabse au contenu à t-1
- quand le contenu diffère : dowload la/les nouvelle(s) image(s) et effectuer les calculs puis envoyer à la DB supabase.
