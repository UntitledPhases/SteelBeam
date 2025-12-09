<?php
session_start();
require_once 'db.php';

$uid = (int)$_SESSION['user_id'];

$stmt = $db->prepare("
    SELECT game_id, game_title, genre, platform, status, rating
    FROM games
    WHERE user_id = :uid
");
$stmt->execute([':uid'=>$uid]);
$games = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($games);
?>