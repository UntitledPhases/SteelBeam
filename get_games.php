<?php
//Small script to fetch games for user as JSON
session_start();
require_once 'db.php';

$uid = (int)$_SESSION['user_id'];

$stmt = $db->prepare("
    SELECT game_id, game_title, cover_url, genre, platform, status, rating
    FROM games
    WHERE user_id = :uid
");
$stmt->execute([':uid'=>$uid]);
$games = $stmt->fetchAll(PDO::FETCH_ASSOC);

for ($i = 0; $i < count($games); $i++) {
    $games[$i]['genre'] = explode(', ', $games[$i]['genre']);
    $games[$i]['platform'] = explode(', ', $games[$i]['platform']);
}

header('Content-Type: application/json');
echo json_encode($games);
?>