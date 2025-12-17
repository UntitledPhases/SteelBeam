<?php
session_start();
require_once 'db.php';

//Need to be careful differentiating user ID and game ID
$uid = $_SESSION['user_id'];

$query = isset($_GET["q"]) ? $_GET["q"] : null;
$gid = isset($_GET["gid"]) ? intval($_GET["gid"]) : null;
$results = [];
$response = null; #I think we need to initialize this to avoid undefined variables when the page reloads?

//If game ID provided, fetch game details and add to user's library
if (!is_null($gid)) {
    $response = file_get_contents("https://api.rawg.io/api/games/" . $gid . "?key=" . $apiKey);

    if ($response != false) {
        $gameData = json_decode($response, true);

        //moved field mapping inside this block to avoid undefined variable errors
        $title = $gameData['name'] ?? 'Unknown Title';
        $genre = $gameData['genres'][0]['name'] ?? null;
        $platform_names = array_map(function($platform) {return $platform['platform']['name'];}, $gameData['platforms'] ?? []);
        $platform = join(", ", $platform_names);
        $coverUrl = $gameData['background_image'] ?? ('https://placehold.co/222x168?text=' . urlencode($title));

        $query = "INSERT INTO games (user_id, rawg_id, game_title, cover_url, genre, platform) 
        VALUES (:uid, :rawg_id, :title, :coverUrl, :genre, :platform);";

        $stmt = $db->prepare($query);
        $stmt->execute([
            ':uid' => $uid,
            ':rawg_id' => $gid,
            ':title' => $title,
            ':coverUrl' => $coverUrl,
            ':genre' => $genre,
            ':platform' => $platform
        ]);
    }

    //After adding restart search
    header("Location: add_game.php");
    exit();
}

//Search and show top 24 results 
else if (!is_null($query)) {
    $response = file_get_contents("https://api.rawg.io/api/games?" . http_build_query([
        'key' => $apiKey,
        'search' => $query,
        'page_size' => 24, # Show only top 24 results
    ]));
}

else {
    //default is top 24 most popular games
    $response = file_get_contents("https://api.rawg.io/api/games?" . http_build_query([
        'key' => $apiKey,
        'page_size' => 24,
        'ordering' => '-added' # Most added games
    ]));
}

if ($response != false) {
    $data = json_decode($response);
    $results = $data->results;
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="Style_Sheet.css">
        <title>Add Game - SteelBeam</title>
    </head>
    
    <body>
        <img src="Images/SteelBeamLogo.png" alt="logo" class="logo">

        <div class="back-button-container">
            <a href="library.php" class="back-button">← Back to Catalog</a>
        </div>

        <form action="" method="get">
            <input type="text" name="q" placeholder="Search RAWG..." value="<?php echo $query; ?>" required />
            <input type="submit" value="Go!" />
        </form>
        <br><br>
        
        <center>
            <div class="library"></div>
            <script>
                //Send API results to Script.js
                window.apiResults = <?php echo json_encode($results); ?>;
            </script>
        </center>
        <script src="Script.js" defer></script>
    </body>
</html>