'use strict';

let currentPhotoId;


// Fonction pour charger les miniatures des photos
function loadPhotos(photos) {
    if (!Array.isArray(photos)) {
        console.error("L'argument passé à loadPhotos n'est pas un tableau.");
        return;
    }

    const thumbnailsSection = document.getElementById('thumbnails');

    photos.forEach(function(photo) {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-xs-2 col-md-2';

        const aTag = document.createElement('a');
        aTag.href = '#';

        const imgTag = document.createElement('img');
        imgTag.id = 'thumbnail-' + photo.id;
        imgTag.setAttribute('photoid', photo.id);
        imgTag.src = photo.small_url;
        imgTag.className = 'img-thumbnail';

        imgTag.addEventListener('click', function(event) {
            const photoId = parseInt(event.target.getAttribute('photoid'), 10); // Assurez-vous que c'est un nombre
            currentPhotoId = photoId;

            const selectedPhoto = photos.find(p => p.id === photoId);

            if (selectedPhoto) {
                loadPhoto(selectedPhoto);
                loadComments(photoId); // Charge les commentaires pour cette photo
                document.getElementById('comment-add').style.display = 'block';
            }
        });

        aTag.appendChild(imgTag);
        colDiv.appendChild(aTag);
        thumbnailsSection.appendChild(colDiv);
    });
}

// Fonction pour charger la photo sélectionnée
function loadPhoto(photo) {
    const selectedPhotoSection = document.getElementById('selected-photo');
    selectedPhotoSection.src = photo.large_url;
    selectedPhotoSection.alt = photo.name;
}

// Fonction pour charger les commentaires d'une photo donnée
function loadComments(photoId) {
    const commentsDiv = document.getElementById('comments');

    if (!commentsDiv) {
        console.error("L'élément 'comments' n'a pas été trouvé.");
        return;
    }

    commentsDiv.innerHTML = ''; // Vider les anciens commentaires

    ajaxRequest('GET', `php/request.php/comments/?id=${photoId}`, (response) => {
        if (Array.isArray(response) && response.length > 0) {
            response.forEach(comment => {
                const panel = document.createElement('div');
                panel.className = 'panel panel-default';

                const panelBody = document.createElement('div');
                panelBody.className = 'panel-body';
                panelBody.innerText = comment.comment;

                panel.appendChild(panelBody);
                commentsDiv.appendChild(panel); // Ajoutez le commentaire au DOM

                // Bouton de modification
                const editButton = document.createElement('button');
                editButton.className = 'btn btn-light mod';
                editButton.innerHTML = '<i class="fa fa-edit"></i>';
                editButton.setAttribute('value', comment.id);

                // Bouton de suppression
                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger del';
                deleteButton.setAttribute('value', comment.id);
                deleteButton.innerHTML = '<i class="fa fa-trash"></i>';

                panelBody.appendChild(editButton); // Ajoutez les boutons
                panelBody.appendChild(deleteButton);
            });
        } else {
            commentsDiv.innerText = "Aucun commentaire trouvé ou une erreur s'est produite.";
        }
    });
}

// Fonction pour modifier un commentaire
function modifyComment(commentId) {
    const newCommentText = prompt("Entrez le nouveau texte du commentaire :");
    if (newCommentText) {
        const requestUrl = `php/request.php/comments/${commentId}`;
        const data = `comment=${encodeURIComponent(newCommentText)}`;

        ajaxRequest('PUT', requestUrl, (response) => {
            console.log("Modification réussie :", response);
            loadComments(currentPhotoId); // Recharge les commentaires de la photo actuelle
        }, data);
    }
}

// Fonction pour supprimer un commentaire
function deleteComment(commentId) {
    if (confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
        const requestUrl = `php/request.php/comments/${commentId}`;

        ajaxRequest('DELETE', requestUrl, (response) => {
            console.log("Suppression réussie :", response);
            loadComments(currentPhotoId); // Recharge les commentaires de la photo actuelle
        });
    }
}

// Fonction pour ajouter un commentaire
document.addEventListener("DOMContentLoaded", function() {
    ajaxRequest("GET", "php/request.php/photos", function(photos) {
        if (Array.isArray(photos)) {
            loadPhotos(photos); // Charger les miniatures des photos
        } else {
            console.error("La réponse des photos n'est pas un tableau.");
        }
    });

    document.getElementById('add-comment-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche la soumission du formulaire par défaut
        const commentText = document.getElementById('comment-text').value;

        if (typeof currentPhotoId !== 'undefined' && !isNaN(currentPhotoId)) {
            const data = `id=${currentPhotoId}&comment=${encodeURIComponent(commentText)}`;

            ajaxRequest("POST", "php/request.php/comments/", (response) => {
                console.log("Commentaire ajouté :", response);
                
                // Ajouter le commentaire immédiatement
                const commentsDiv = document.getElementById('comments');
                const panel = document.createElement('div');
                panel.className = 'panel panel-default';
            
                const panelBody = document.createElement('div');
                panelBody.className = 'panel-body';
                panelBody.innerText = document.getElementById('comment-text').value;
            
                panel.appendChild(panelBody);
                commentsDiv.appendChild(panel);
            
                // Optionnel : Vider le champ de texte du commentaire
                document.getElementById('comment-text').value = '';
            
                // Recharge les commentaires pour assurer la cohérence avec le serveur
                loadComments(currentPhotoId);
            }, data);
            
            
        } else {
            console.error("currentPhotoId n'est pas défini.");
        }
    });
});
// Exemple : Associez des gestionnaires d'événements aux boutons de suppression et de modification
document.addEventListener("DOMContentLoaded", function() {
    // Attachez le gestionnaire de soumission pour ajouter un commentaire
    document.getElementById('add-comment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Ajout du commentaire (comme mentionné plus haut)
    });

    // Gérer les boutons de suppression et de modification
    document.getElementById('comments').addEventListener('click', function(e) {
        if (e.target.classList.contains('del')) {
            // Gestionnaire de suppression
            const commentId = e.target.getAttribute('value');
            console.log('Bouton de suppression cliqué pour le commentaire ID:', commentId);
            deleteComment(commentId);
        } else if (e.target.classList.contains('mod')) {
            // Gestionnaire de modification
            const commentId = e.target.getAttribute('value');
            console.log('Bouton de modification cliqué pour le commentaire ID:', commentId);
            modifyComment(commentId);
        }
    });
});
