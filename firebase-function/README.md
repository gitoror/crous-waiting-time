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
   Meme principe

3. Pub/Sub triggers  
   A l'envoi d'une image dans le bucket supabase il faudrait aussi envoyer un message sur le topic Pub/Sub établi
