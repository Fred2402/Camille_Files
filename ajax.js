function ajaxRequest(type, url, callback, data = null) {
    const xhr = new XMLHttpRequest();
    xhr.open(type, url, true);

    // Définition du Content-Type pour POST
    if (type === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Succès, appel du callback
                try {
                    const response = JSON.parse(xhr.responseText);
                    callback(response);
                } catch (error) {
                    console.error("Erreur lors de l'analyse de la réponse AJAX :", error);
                }
            } else {
                console.error("Erreur lors de la requête AJAX :", xhr.status, xhr.statusText);
            }
        }
    };
    

    xhr.send(data);
}
