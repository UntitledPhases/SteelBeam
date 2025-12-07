<?php
$dsn = 'mysql:host=localhost;dbname=steelbeam';
$username = 'mgs_user';
$password = 'pa55word';

try {
    $db = new PDO($dsn, $username, $password);

    #$query = "SELECT MovieID, MovieTitle, ReleaseDate, Genre FROM movie";
} catch (PDOException $e) {
    $error_message = $e->getMessage();
    include('database_error.php');
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === 'POST') {
    $user = $_POST["username"];
    $pass = $_POST["password"];

    $query = "SELECT * FROM users WHERE username =?";
    $stmt = $db->prepare($query);
    $stmt->execute([$user]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && $pass === $result["password"]) {
        header("Location: library.php?user_id=" . $result["user_id"]);
        exit();
} else {
    $error = "Invalid username or password!";
}
}
?>

<!DOCTYPE html>
<html>
    <head>
    <title >Login</title>
    </head>

    <h2>StealBeam Login</h2>
<body>
    <form method="POST">
        Username:<br>
        <input type="text" name="username" required><br><br>
        Password:<br>
        <input type="password" name="password" required><br><br>

        <button type="submit">Log in</button>
    </form>
</body>
</html>