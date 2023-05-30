# Aide Firebase

firebase login
firebase logout
firebase init (créer nouveau projet)

python3.X -m venv <env_name> (choisir parmi les versions déjà installées sur l'ordi)

source venv/bin/activate

python3 -m pip3 install -r requirements.txt (avec l'ajout des bibliothèques à important dans le fichier req.txt)

firebase deploy --only functions:<fn_name> functions:<fn_name2> ...

python3.11 a été nécessaire pour que ça marche sans erreur

# Pour la prochaine fois

- Changer le bucket de trigger (ok)
- Implémenter process_image (ok)
- Créer realtime db ou alors mettre sur supabse (surement plus simple) (ok)
- Relier au temps d'attente : c'est la dérivée du nombre de personnes qui est important

# idées calcul du temps d'attente

Si une personne met 10 sec a traverser l'image, prenons une image toutes le s10 sec en moy, alors on aura forcément des personnes différentes sur chaque image. Si le nombre de personnes est cte alors c'est qu'il y a autant de personnes qui entrent et qui sortent. Si le nombre de personnes augmente alors c'est soit que des personnes sortent du crous, soit que des personnes viennent d'entrer sur l'image depuis ARTEM. Si le nombre de personnes diminue, alors c'est que des personnes viennet d'entrer au crous, soit que des personnes viennet de sortir de l'image vers ARTEM.

Une personnes met 20 min en moyenne pour manger. Donc elle devrait sortir 20 min après sont entrée et faire augmenter le nombre de personnes. Pour compenser cet effet là, on fera le calcul avec un nombre effectif de personne

N(t+20) = N(t) + pers - comp(20min) avec comp(20min) = N(t)
N(t+10sec) = N(t) + pers - comp(10sec) avce comp(10sec) = 10sec/20min \* N(t) hyp de proportioanlité. 10s/20min ~ 0,1

# idée 1

Le nombre de personnes observées apparait dans les calulcs
Par ex, si 1000 élèves au total. Si on est à 200 élèves alors beaucoup risquent de rentrer dans le crous, mais si on est à 700 élèves beaucoup risquent de sortir.

N(0) + N(10) + ... + N(tf) = 1000
tf = 13h-11h45 = 1h15
Sum_N(t) = N(0) + ... + N(t)
On va regarder la dérivée de Sum_N, on ne la connait qu'en valeur absolue car on ne connait pas le sens de circulation (pas de tracage, photo toutes les 30 sec)
Si elle est forte alors c'est soit qu'il y a beaucoup d'entrées, soit qu'il y beaucoup de sorties.
Comment trancher ?
Un passage au crous fait à peu près 30min. Donc toutes les 30 min un élève sort du crous. Le premier élève rentrait dans le crous. Il est très probable que le deuxième élève visible soit un autre étudiant car la photo a été prises 30 sec plus tard et que la durée min de passage au crous est de 5min (cafet) et que d'autres étudiants vont arriver dans les 5min. Donc la première sortie ne peut s'effectuer que 5min plus tars.
C'est un peu compliqué

# idée 2

Si SumN entre 0 et 50 : 0min d'attente
50-200 : 10 min
200-400: 15min
...
mais non car ne prend pas en compte l'arrivée massive de personens (dérivée

# idée 3

Regarder Sum_N(t) - Sum_N(t-20) = diff_N
capacité queue (diff_N):

- 20 personnes : 2 min
- 20 - 40 personnes : 5 min
- 40 - 60 personnes : 10 min

Mais il faut coupler à Sum_N pour rejoindre l'idée 1, qui dit qu'on ne peut connaitre diff_N qu'en valeur absolue et que si Sum_N est petit alors diff_N est probablement > 0 et sinon < 0

att = K1 \* diff_N + K2

- Sum_N < 100 : K1 = 0.1
- 100 < Sum_N < 200 : K1 = 0.12
- 200 < Sum_N < 400 : K1 = 0.14
- 400 < Sum_N < 600 : K1 = 0.1
- 100 < Sum_N < 200 : K1 = 0.12
  ... pour les premiers essais 0.1 ?

- diff_N < 20 : K2 = 0
- 20 < diff_N < 40 : K2 = 2 min
- 40 < diff_N < 60 : K2 = 4min

# idée 4

Le temps d'attente est lié à :

- le taux d'accroissemnet du nombre de personnes = diff_N(t) = N(t) - N(t-dt)
- le nombre de personnes dans la file d'attente (file + table crous) = N_in(t) = N(t-20mn) + ... + N(t-dt) + N(t) (hyp : une personne met 20 min à manger)

Quelle formule choisir ?
temps_attente(t) = K1 x diff_N(t)^p1 + K2 x N_in(t)^p2
Si diff_N augmente alors temps_attente augmente --> p1 > 0
Si N_in augmente alors temps d'attente augmente --> p2 > 0

La dépendance en N_in^p2 n'est pas forcément proportionnelle. temps_attente peut évoluer par pallier de valeur de N_in puisque pour N_in < seuil il reste encore des places au niveau des tables de la cantine. Danx cet exemple, le facteur qui va alors beaucoup influencer temps_att est diff_N. En effet, si diff_N est tout d'un coup très grand pendant que N_in < seuil alors la queue risque de saturer très vite. Il est donc aussi possible de faire varier K1 en fonction de N_in

Cela semble raisonnable de choisir une dépendance proportionnelle à diff_N (p1 = 1), temps_att est proportionnel au nombre de gens dans la queue puisque une personne est traitée toutes les X sec quoi qu'il arrive.

Souci : en fait le temps d'attente n'est pas lié au nombre de personnes dans le crous en train de manger mais slmt à ceux dans la queue car il y a toujours des places dispo ou alors les gens galèrent 2 min pour trouver une place. Mais dans ce cas on ne parle plus d'attente dans la queue du crous. Ca peut donc être intéressant de donner un autre indicateur qui donnerait une image du nombre de places dispo. Par exemple, si diff_N a été très grand alors c'est que le nombre de place dispo diminue. N sera directmeent la quantité intéressante.

donc temps_att = K1 x diff_N + f(N_in(t))
avec f(n) = 0 si

# diff_N slmt

une

# idées IA

Améliorer le calcul de jour en jour

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
