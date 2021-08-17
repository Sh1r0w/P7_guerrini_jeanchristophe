# P7_guerrini_jeanchristophe

Projet 7 Groupomania

1 - l'installation des logiciels :

- Node.JS
- VUE 3 avec VUEX
- Git
et obligatoire

ainsi qu'un environnement de développement (VS Code de préférence)

-------------------------------
2 -Clonage du projet

Pour cloner le projet veuillez copier le lien : git clone https://github.com/Sh1r0w/P7_guerrini_jeanchristophe.git

Crée un fichier vide, ourez le avec VS Code, (ouvrire dossier)

ensuite ouvrez un terminal et coller le lien copier précédement.

-------------------------------

3- Création de la base de donnée

sur votre base de donnée MySql, executez la commande CREATE DATABASE groupomania.

ou sinon

installer XAMPP et créer une base de donnée nomée groupomania avec l'interclassement utf8_general_ci

ensuite avec la commande "nodemon server" les tables se rajouterons automatiquement à la bdd (parti 4 backend).

4- initialisation du frontend et du backend

Pour le backend 

IMPORTANT 

 --- Création du fichier .env  ---

dans la racine du backend un fichier .env doit être créer, à l'interieur les informations suivante doivent être renseigner.
un fichier .env-example et fourni à la racine du backend.

/////////
token= cléf de securité de votre choix
crypto= cléf de securité de votre choix / doit être la même que dans le fichier .env / VUE_APP_CRYPTO du frontend
DB=groupomania
USER=login de votre base de donnée
PASSWORD=password de votre base de donnée (laisser vide si aucun password)
HOST=localhost
DIALECT=mysql
/////////

Avec VS Code,

Rendez vous dans le backend avec la commande "cd backend"

installer node avec : "npm install"

ensuite pour lancer la connection au server taper "nodemon server" (créations des tables automatique)

un message de confirmation devrai apparaitre : Connexion à la base de donées réussie



IMPORTANT 
 --- Création du fichier .env  ---

dans la racine du frontend un fichier .env doit être créer, à l'interieur, les informations suivantes doivent être renseigner.
un fichier .env-example et fourni à la racine du frontend

/////////
VUE_APP_CRYPTO= la cléf doit être exactement la même que dans le fichier .env / crypto du backend
/////////

Pour le frontend

Avec VS Code toujours,

ouvrez un autre teminal.

Rendez vous dans le frontend avec la commande "cd frontend"

ensuite pour lancer la connection au server taper "npm run serve"


-------------------------------

Dans votre navigateur, connectez vous à l'adresse http://localhost:8080/

vous devriez arriver sur la page connection, rendez-vous dans enregistrement afin de créer votre premier compte.

pour avoir un access administrateur du forum, rendez vous dans la base de donnée sur l'utilisateur précédement créer éditez le et changez la valeur de la colone modérator de 0 à 1

cela vous donnera la possibilité de modérer tous les messages (suppréssion / modification).

vous avez la possibilité de poster soit un message,

ou un messages avec photo,

répondre avec un message ou message avec photo.

vous pouvez like, dislike.



