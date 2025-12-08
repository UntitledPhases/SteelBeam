<?php
require_once 'db.php';

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
        <link rel="stylesheet" href="Style_Sheet.css">
        <title >Login</title>
    </head>

    <h2>SteelBeam Login</h2>
<body>
    <form method="POST">
        <label>Username:
            <input type="text" name="username"><br><br>
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