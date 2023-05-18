# Aide

firebase login
firebase logout
firebase init (créer nouveau projet)

python3.X -m venv <env_name> (choisir parmi les versions déjà installées sur l'ordi)
source venv/bin/activate  
python3 -m pip3 install -r requirements.txt (avec l'ajout des bibliothèques à important dans le fichier req.txt)  
firebase deploy --only functions:<fn_name> functions:<fn_name2> ...

# Possibilités Firebase

La fonction cloud Firebase doit surveiller le bucket Supabase
Checker Reference API Python > Cloud Functions

# 1. Call Functions directly

1. Appel depuis une app ou par HTTP

2. Enqueue functions with Cloud Tasks  
   Services utilisés : Google Cloud Tasks

- Ecrire des task queue functions
- Enqueue les tqf dans Cloud Tasks avec une cloud function et régler la config de la task

When writing a task queue function you can set per-queue retry and rate- limiting configuration. Code samples in this page are based on an app that sets up a service that backs up all images from NASA's Astronomy Picture of the Day:

scheduleTime, dispatchDeadline
on_task_dispatched

3. Scheduele functions

use on_schedule handler to create Pub/Sub topic that uses Cloud Schedule to trigger event on that topic

- Write a scheduled function with on_schedule (ex tous les jours à 00h efface les utilisateurs inactifs de la db)

When you deploy a scheduled function,

- the related scheduler job
- and pub/sub topic (between Cloud Schedule and the cloud function)
  are created automatically.

# 2. Trigger background functions

1. Realtime database trigger

In a typical lifecycle, a Firebase Realtime Database function does the following:

Waits for changes to a particular Realtime Database path.
Triggers when an event occurs and performs its tasks.
Receives a data object that contains a snapshot of the data stored at that path.

on_value_created()

2. Cloud Storage trigger  
   Meme principe mais le Cloud Storage est plutot fait pour des images ou videos alors que le Realtime database est du JSON donc pas adapté

3. Pub/Sub triggers  
   A l'envoi d'une image dans le bucket supabase il faudrait aussi envoyer un message sur le topic Pub/Sub établi. Pub = ordi, Sub = cloud function

Les options 1 et 2 obligent à migrer les données sur Firebase. La 2 slmt est adaptée pour stocker des images.
L'option 3 permet de rester avec un tiers comme supabase.
Pub/Sub est payant donc on n'aura plus accès au service après la fin de l'essai Google Cloud. C'est normal car cela permet de s'ouvrir à des tiers contrairement au Cloud Storage trigger qui oblige à rester chez Google.

# Conclusion

Solution Storage trigger.
Migration, assez simple ici car app pas encore lancée donc pas de données. Il faut juste consulter la doc Google Storage, ce qui va prendre un peu de temps
