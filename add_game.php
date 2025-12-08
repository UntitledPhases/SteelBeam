<?php
require_once 'db.php';
//Need to be careful differentiating user ID and game ID
$uid = isset($_GET["uid"]) ? intval($_GET["uid"]) : null;

$query = isset($_GET["q"]) ? $_GET["q"] : null;
$gid = isset($_GET["gid"]) ? intval($_GET["gid"]) : null;
$results = [];

//$context = stream_context_create(['http' => ['method' => 'GET']]);

if (!is_null($gid)) {
    $response = file_get_contents("https://api.rawg.io/api/games/" . $gid . "?key=" . $apiKey);

    if ($response != false) {
        $game = json_decode($response);

        $query = "INSERT INTO games (user_id, game_title, genre, platform) VALUES (:id, :title, :genre, :platform);";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ':uid' => $uid,
            ':title' => $title,
            ':genre' => $genre,
            ':platform' => $platform
        ]);
    }

    // redirect to the library page for this user
} else if (!is_null($query)) {
    $response = file_get_contents("https://api.rawg.io/api/games?" . http_build_query([
        'key' => '4440e3e77e974156b392821e6186e4e0',
        'search' => $query
    ]));

    if ($response != false) {
        $results = json_decode($response)->{'results'};
    }
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

        <table>
        <?php foreach ($results as $res) { ?>
        <tr>
            <td><?php echo $res->{'name'}; ?></td>
            <td><?php echo $res->{'released'}; ?></td>
            <td>Rating: <?php echo $res->{'rating'}; ?></td>
            <td><form action="" method="get">
                <input type="hidden" name="id" value="<?php echo $res->{'id'} ?>" />
                <input type="submit" value="Add" />
            </form></td>
        </tr>
        <?php } ?>
        </table>
    </body>
</html>