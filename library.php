<?php
require_once 'db.php';
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
        <h2>Catalog</h2>
        <h5>Click a card to view details</h5>
        <h5>Games can be rated in the details page</h5>

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
        </div>

        <div class="add-game-button-container">
            <a href="add_game.php" class="add-game-button">+ Add Game</a>
        </div>

        <!--Actual game cards-->
        <!--Replace placeholder images with actual images which need to be placed in images folder-->
        <!--Use https://developer.mozilla.org/en-US/ to figure out what things do-->
        <div class="library"></div>


    </body>
</html>