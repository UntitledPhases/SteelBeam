<?php
session_start();
require_once 'db.php';

$uid = $_SESSION['user_id'];

//Fetch user's game library
$stmt = $db->prepare("SELECT game_id, game_title, genre, platform FROM games WHERE user_id = :uid");
$stmt->execute([':uid' => $uid]);
$games = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">

        <link rel="stylesheet" href="Style_Sheet.css">
        <script src="state.js" defer></script>
        <script src="Script.js" defer></script>
        <title>SteelBeam</title>
    </head>
    <body>
        <img src="Images/SteelBeamLogo.png" alt="logo" class="logo">
        <h1>Catalog</h1>

        <!--Add way to filter games based on collection-->
        <div class="filters">
            <button data-filter="all" aria-pressed="true">All</button>
            <button data-filter="Favorites" class="bfav">Favorites</button>
            <button data-filter="Wishlist" class="bwish">Wishlist</button>
            <button data-filter="Completed" class="bcomp">Completed</button>
            
            <select id="genre-filter">
                <option value="all">All Genres</option>
            </select>
            
            <select id="platform-filter">
                <option value="all">All Platforms</option>
            </select>
            <a href="add_game.php">
                <button type="button" class="add-game-button">+ Add Game</button>
            </a>
        </div>
        
        <!--Actual game cards-->
        <!--Replace placeholder images with actual images which need to be placed in images folder-->
        <!--Use https://developer.mozilla.org/en-US/ to figure out what things do-->
        <div class="library">
        </div>


    </body>
</html>