<?php
session_start();
require_once 'db.php';

//Get game ID from URL parameter
$uid = (int)$_SESSION['user_id'];
$game_id = isset($_GET['game_id']) ? intval($_GET['game_id']) : 0;

$stmt = $db->prepare("
    SELECT game_id, game_title, genre, cover_url, platform, status, rating
    FROM games
    WHERE user_id = :uid AND game_id = :game_id
");
$stmt->execute([':game_id'=>$game_id, ':uid'=>$uid]);
$game = $stmt->fetch(PDO::FETCH_ASSOC);

//If no valid game ID, redirect back to main page
if ($game_id <= 0) {
    header("Location: library.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="Style_Sheet.css">
        <script src="state.js" defer></script>
        <script src="game_details.js" defer></script>
        <title>Game Details - SteelBeam</title>
    </head>
    <body>
        <img src="Images/SteelBeamLogo.png" alt="logo" class="logo">
        
        <div class="back-button-container">
            <a href="javascript:history.go(-1)" class="back-button">← Back to Catalog</a>
        </div>

        <div class="game-details-container">
            <div class="game-image-section">
                <img id="game-image" src=<?= htmlspecialchars($game['cover_url']) ?> alt="Game Cover">
            </div>
            
            <div class="game-info-section">
                <h1 id="game-title"><?= htmlspecialchars($game['game_title']) ?></h1>
                
                <div class="game-metadata">
                    <p><strong>Genre:</strong> <span id="game-genre"><?= htmlspecialchars($game['genre'] ?? 'N/A') ?></span></p>
                    <p><strong>Platform:</strong> <span id="game-platform"><?= htmlspecialchars($game['platform'] ?? 'N/A') ?></span></p>
                </div>

                <div class="rating-section">
                    <h3>Rate this game:</h3>
                    <div class="rate-container-details"></div>
                </div>

                <div class="collection-section">
                    <h3>Add to collection:</h3>
                    <div class="collection-buttons">
                        <button id="btn-favorites" class="collection-btn btn-favorites">
                            Favorites
                        </button>
                        <button id="btn-wishlist" class="collection-btn btn-wishlist">
                            Wishlist
                        </button>
                        <button id="btn-completed" class="collection-btn btn-completed">
                            Completed
                        </button>
                        <button id="btn-remove" class="collection-btn btn-remove">
                            Remove from Collections
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Hidden input to pass game_id to JavaScript -->
        <input type="hidden" id="current-game-id" value="<?php echo $game_id; ?>">
    </body>
</html>