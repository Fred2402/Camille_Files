<?php
require_once 'constantes.php';
require_once 'database.php';

// Connexion à la base de données
$db = dbConnect();
if ($db === false) {
    header('HTTP/1.1 503 Service Unavailable');
    echo json_encode(["error" => "Service indisponible"]);
    exit();
}

$requestMethod = $_SERVER['REQUEST_METHOD'];
$request = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';
$requestParts = explode('/', ltrim($request, '/'));
$requestResource = $requestParts[0];
$requestId = isset($requestParts[1]) ? intval($requestParts[1]) : null;

// Définition du Content-Type pour les réponses JSON
header('Content-Type: application/json');

// Définir un login par défaut
$login = 'cir2';

// Traitement des requêtes REST
switch ($requestMethod) {
    case 'GET':
        if ($requestResource === 'photos') {
            // Renvoie des données des photos
            $photos = [
                ['id' => 1, 'name' => 'Photo 1', 'small_url' => 'img/small/photo1.png', 'large_url' => 'img/large/photo1.png'],
                ['id' => 2, 'name' => 'Photo 2', 'small_url' => 'img/small/photo2.png', 'large_url' => 'img/large/photo2.png'],
                ['id' => 3, 'name' => 'Photo 3', 'small_url' => 'img/small/photo3.png', 'large_url' => 'img/large/photo3.png'],
                ['id' => 4, 'name' => 'Photo 4', 'small_url' => 'img/small/photo4.png', 'large_url' => 'img/large/photo4.png'],
                ['id' => 5, 'name' => 'Photo 5', 'small_url' => 'img/small/photo5.png', 'large_url' => 'img/large/photo5.png'],
                ['id' => 6, 'name' => 'Photo 6', 'small_url' => 'img/small/photo6.png', 'large_url' => 'img/large/photo6.png'],
                ['id' => 7, 'name' => 'Photo 7', 'small_url' => 'img/small/photo7.png', 'large_url' => 'img/large/photo7.png'],
                ['id' => 8, 'name' => 'Photo 8', 'small_url' => 'img/small/photo8.png', 'large_url' => 'img/large/photo8.png'],
                ['id' => 9, 'name' => 'Photo 9', 'small_url' => 'img/small/photo9.png', 'large_url' => 'img/large/photo9.png'],
                ['id' => 10, 'name' => 'Photo 10', 'small_url' => 'img/small/photo10.png', 'large_url' => 'img/large/photo10.png'],
                ['id' => 11, 'name' => 'Photo 11', 'small_url' => 'img/small/photo11.png', 'large_url' => 'img/large/photo11.png'],
                ['id' => 12, 'name' => 'Photo 12', 'small_url' => 'img/small/photo12.png', 'large_url' => 'img/large/photo12.png'],
            ];
            echo json_encode($photos);
        } elseif ($requestResource === 'comments') {
            if (isset($_GET['id'])) {
                $photoId = intval($_GET['id']);
                $comments = dbRequestComments($db, $photoId);

                if ($comments === false) {
                    http_response_code(500); 
                    echo json_encode(["error" => "Erreur lors de la récupération des commentaires"]);
                } else {
                    echo json_encode($comments);
                }
            } else {
                http_response_code(400); 
                echo json_encode(["error" => "Paramètres manquants"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Ressource non trouvée"]);
        }
        break;

    case 'POST':
        if ($requestResource === 'comments') {
            $photoId = $_POST['id'] ?? null;
            $comment = $_POST['comment'] ?? null;

            if ($photoId && $comment) {
                $photoId = intval($photoId);
                $result = dbAddComment($db, $login, $photoId, $comment);

                if ($result) {
                    http_response_code(201);
                    echo json_encode(["message" => "Commentaire ajouté"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Erreur lors de l'ajout du commentaire"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Paramètres manquants"]);
            }
        } else {
            http_response_code(405); // Méthode non autorisée
            echo json_encode(["error" => "Méthode non autorisée"]);
        }
        break;

    case 'DELETE':
        if ($requestResource === 'comments' && $requestId !== null) {
            if (dbDeleteComment($db, $login, $requestId)) {
                http_response_code(200);
                echo json_encode(["message" => "Commentaire supprimé avec succès"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Erreur lors de la suppression du commentaire"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Paramètres manquants"]);
        }
        break;

        case 'PUT':
            if ($requestResource === 'comments' && $requestId !== null) {
                // Lire le corps de la requête pour obtenir les données mises à jour
                parse_str(file_get_contents("php://input"), $data);
                $newComment = isset($data['comment']) ? $data['comment'] : null;
        
                if ($newComment) {
                    if (dbUpdateComment($db, $login, $requestId, $newComment)) { // dbUpdateComment doit être implémentée
                        http_response_code(200); // Succès
                        echo json_encode(["message" => "Commentaire mis à jour avec succès"]);
                    } else {
                        http_response_code(500); // Erreur interne du serveur
                        echo json_encode(["error" => "Erreur lors de la mise à jour du commentaire"]);
                    }
                } else {
                    http_response_code(400); // Mauvaise requête
                    echo json_encode(["error" => "Texte du commentaire manquant"]);
                }
            } else {
                http_response_code(400); // Paramètres manquants
                echo json_encode(["error" => "ID du commentaire ou ressource incorrecte"]);
            }
            break;
        
}

$db = null;
?>
