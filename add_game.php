<?php
require_once 'db.php';

$query = isset($_GET["q"]) ? $_GET["q"] : null;
$id = isset($_GET["id"]) ? $_GET["id"] : null;
$results = [];
$context = stream_context_create(['http' => ['method' => 'GET']]);

if (!is_null($id)) {
    $response = file_get_contents("https://api.rawg.io/api/games/" . $id . "?key=4440e3e77e974156b392821e6186e4e0");

    if ($response != false) {
        $game = json_decode($response);
        $query = "INSERT INTO games (user_id, game_title, genre, platform) VALUES (:id, :title, :genre, :platform);";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ':id' => $game->{'id'},
            ':title' => $game->{'name'},
            ':genre' => $game->{'genres'}[0]->{'name'},
            ':platform' => $game->{'platforms'}[0]->{'platform'}->{'name'},
        ]);
    }

    // redirect to the game page...
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