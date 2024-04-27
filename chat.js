// Variables globales pour la WebSocket et le login
let websocket;
let login = "cir2"; // Définissez votre pseudo

// Fonction pour créer la WebSocket
function createWebSocket() {
    // Utilisez localhost ou 127.0.0.1 pour une connexion locale
    const serverIP = "192.168.1.178"; // Adresse IP pour localhost
    const serverPort = "8080"; // Changez si nécessaire

    // Initialisation de la WebSocket avec l'adresse IP et le port du serveur
    websocket = new WebSocket(`ws://${serverIP}:${serverPort}`);

    // Callback pour gérer les messages reçus
    websocket.onmessage = function(event) {
        const message = event.data;
        const textArea = $("#chat-room"); // Zone de texte pour afficher les messages
        textArea.val(textArea.val() + message + "\n");
        textArea.scrollTop(textArea.prop('scrollHeight')); // Faire défiler vers le bas
    };

    websocket.onopen = function() {
        console.log("WebSocket connection established.");
    };

    websocket.onclose = function() {
        console.log("WebSocket connection closed.");
    };
}

// Fonction pour envoyer un message
function sendMessage(event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    const message = $("#chat-message").val(); // Récupération du message
    if (message.trim() === "") {
        return; // Ne pas envoyer de message vide
    }

    const fullMessage = `${login}: ${message}`; // Inclure le pseudo
    websocket.send(fullMessage); // Envoyer au serveur

    $("#chat-message").val(""); // Effacer le champ de texte
}

// Initialisation du WebSocket et gestionnaire d'événement
$(document).ready(function() {
    createWebSocket(); // Créer la connexion WebSocket
    
    // Associer l'envoi du formulaire à la fonction d'envoi de message
    $("#chat-send").submit(sendMessage);
});
function createWebSocket() {
    websocket = new WebSocket("ws://192.168.1.100:8080");

    websocket.onopen = function() {
        console.log("WebSocket connection established.");
    };

    websocket.onerror = function(event) {
        console.error("WebSocket Error:", event);
    };

    websocket.onclose = function() {
        console.log("WebSocket connection closed.");
        
        // Reconnexion après quelques secondes
        setTimeout(createWebSocket, 3000); // Essayer de se reconnecter après 3 secondes
    };

    websocket.onmessage = function(event) {
        // Gestionnaire de réception de messages
    };
}
