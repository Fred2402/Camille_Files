# Projet de Communications Web

## Description
Le projet consiste en une application web de galerie photo avec les fonctionnalités suivantes :
- Visualisation d'une galerie de photos.
- Affichage d'une photo individuelle avec son titre.
- Ajout et suppression de commentaires.
- Discussion instantanée par chat.
- Authentification des utilisateurs.

Le projet utilise le framework CSS Bootstrap pour un design réactif et Font Awesome pour les icônes.

## Fonctionnalités
1. **Galerie Photo**
   - Visualisation d'un ensemble de photos.
   - Affichage d'une photo avec son titre.
   - Ajout et suppression de commentaires sous les photos.

2. **Chat en Temps Réel**
   - Discussion instantanée entre utilisateurs.
   - Utilisation de WebSocket pour le chat.

3. **Authentification**
   - Implémentation d'un système d'authentification pour les utilisateurs.

4. **Requêtes AJAX**
   - Chargement de données et interaction avec le serveur via AJAX.
   - Traitement des erreurs lors des requêtes AJAX.

## Structure du Projet
- **HTML/CSS**
  - Utilisation de Bootstrap pour le design réactif.
  - Sections principales : Galerie, Photo, Commentaires, Chat, Authentification.
- **JavaScript**
  - Implémentation des requêtes AJAX.
  - Gestion des interactions utilisateur et affichage dynamique.
- **PHP**
  - Traitement des requêtes serveur (GET, POST, PUT, DELETE).
  - Interaction avec la base de données MySQL.
- **MySQL**
  - Stockage des photos, des commentaires et des informations utilisateur.

## Installation
1. **Configuration WAMP**
   - Installez WAMP pour exécuter un environnement de serveur web local.
   - Configurez Apache et MySQL pour le projet.
   
2. **Base de Données MySQL**
   - Créez et initialisez la base de données à l'aide du script SQL fourni.
   - Configurez les constantes de connexion à la base de données dans `constantes.php`.

3. **Configuration du Projet**
   - Copiez les fichiers HTML, CSS, et JavaScript dans le dossier approprié.
   - Ajoutez les scripts JavaScript dans vos pages HTML.

4. **Mise en Place du Chat**
   - Copiez le script `chat.js` dans le dossier `js` et ajoutez-le à votre page HTML.

## Utilisation
- **Lancer l'Application**
  - Ouvrez le fichier HTML principal dans un navigateur web.
  - Interagissez avec la galerie photo, ajoutez des commentaires, et utilisez le chat.
  
- **Requêtes AJAX**
  - Les requêtes AJAX permettent de charger des données sans recharger la page.
  - Les scripts JavaScript envoient des requêtes au serveur pour récupérer des photos, des commentaires, etc.

## Contribution
Pour contribuer à ce projet, veuillez créer une branche à partir de `main`, apporter vos modifications, et soumettre une pull request.

