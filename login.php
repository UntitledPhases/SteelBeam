<?php
session_start();
require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] === 'POST') {
    $user = $_POST["username"];
    $pass = $_POST["password"];

    $query = "SELECT user_id, password FROM users WHERE username = ?";
    $stmt = $db->prepare($query);
    $stmt->execute([$user]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && password_verify($pass, $result["password"])) {
        $_SESSION['user_id'] = (int)$result['user_id'];
        header("Location: library.php");
        exit();
} else {
    $error = "Invalid username or password!";
}
}
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="Style_Sheet.css">
        <title >Login</title>
    </head>

    <h2>SteelBeam Login</h2>
<body>
    <form method="POST">
        <label>Username:
            <input type="text" name="username" autofocus><br><br>
        </label>
        <br>

        <label>Password:
            <input type="password" name="password"><br><br>
        </label>
        <br>

        <button type="submit">Log in</button>
    </form>
    <br>
    <a href="new_user.php">
        <button type="button">New user</button>
    </a>
</body>
</html>