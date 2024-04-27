<?php
// Connexion à la base de données
function dbConnect() {
    $host = 'localhost';
    $db_name = 'comweb_project';
    $username = 'comweb_project';
    $password = 'tcejorp_bewmoc_isen29';

    try {
        $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (\PDOException $e) {
        /** @var \PDOException $e */
        error_log("Erreur de connexion: " . $e->getMessage());
        return null;
    }
}

// Récupérer les photos
function dbRequestPhotos($db) {
    try {
        $query = $db->query("SELECT id, small_url, large_url, name FROM photos");
        return $query->fetchAll(PDO::FETCH_ASSOC);
    } catch (\PDOException $e) {
        /** @var \PDOException $e */
        error_log("Erreur lors de la récupération des photos: " . $e->getMessage());
        return false;
    }
}



function dbRequestComments($db, $photoId) {
    $query = "SELECT * FROM comments WHERE photoId = :photoId"; // Correspond aux noms des colonnes de votre table
    $statement = $db->prepare($query);
    $statement->bindValue(':photoId', $photoId, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}





// Fonction pour ajouter un commentaire à une photo
function dbAddComment($db, $userLogin, $photoId, $comment) {
    try {
        $sql = "INSERT INTO comments (userLogin, photoId, comment) VALUES (:userLogin, :photoId, :comment)";
        $stmt = $db->prepare($sql);

        $stmt->bindValue(':photoId', $photoId, PDO::PARAM_INT);
        $stmt->bindValue(':userLogin', $userLogin, PDO::PARAM_STR);
        $stmt->bindValue(':comment', $comment, PDO::PARAM_STR);

        return $stmt->execute();
    } catch (PDOException $e) {
        error_log("Erreur lors de l'ajout de commentaire: " . $e->getMessage());
        return false;
    }
}


// Fonction pour supprimer un commentaire
function dbDeleteComment($db, $userLogin, $id) {
    $sql = "DELETE FROM comments WHERE id = :id AND userLogin = :userLogin"; // Correction du nom de colonne
    $stmt = $db->prepare($sql);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->bindValue(':userLogin', $userLogin, PDO::PARAM_STR); // Correction du nom de colonne
    return $stmt->execute();
}
function dbUpdateComment($db, $login, $commentId, $newComment) {
    try {
        $stmt = $db->prepare("UPDATE comments SET comment = :comment WHERE id = :id");
        $stmt->bindParam(':comment', $newComment);
        $stmt->bindParam(':id', $commentId, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (PDOException $e) {
        error_log("Erreur lors de la mise à jour du commentaire: " . $e->getMessage());
        return false;
    }
}
