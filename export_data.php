<?php
//This just includes the database connection so we dont have to rewrite it for every php file
require_once 'db.php';
session_start();

//get user ID from session
$user_id = $_SESSION['user_id'];

header('Content-Type: application/json');


//Pull info for this user
$query = "SELECT game_id, status, rating FROM games WHERE user_id = :user_id";
$stmt = $db->prepare($query);
$stmt->execute([':user_id' => $user_id]);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

//Build the new and improved data structure muahahaha
$favorites = [];
$wishlist = [];
$completed = [];
$ratings = [];

foreach ($rows as $row) {
    $gid = (int)$row['game_id'];

    //Sort games into collections
    switch ($row['status']) {
        case 'Favorites':
            $favorites[] = $gid;
            break;
        case 'Wishlist':
            $wishlist[] = $gid;
            break;
        case 'Completed':
            $completed[] = $gid;
            break;
    }

    //If user rating exists for a game, add it to ratings
    if ($row['rating'] !== null) {
        $ratings[$gid] = (int)$row['rating'];
    }
}

//Turn into JSON and echo to browser
echo json_encode([
    'user_id' => $user_id,
    'favorites' => $favorites,
    'wishlist' => $wishlist,
    'completed' => $completed,
    'ratings' => $ratings
]);