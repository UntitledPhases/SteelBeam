<?php
require_once 'db.php';
if ($_SERVER["REQUEST_METHOD"] === 'POST') {
    $user = $_POST["username"];
    $pass = $_POST["password"];

    //Check if username already exists
    $check = "SELECT * FROM users WHERE username =?";
    $stmt = $db->prepare($check);
    $stmt->execute([$user]);    
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);
    
    //Tiny script to show alert and redirect back if user exists
    if ($existingUser) {
        echo "<script>alert('Username already exists! Please choose another.'); window.location='new_user.php';</script>";
        exit();
    }

    //If not existing user, insert new user into db
    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $db->prepare($sql)->execute([$user, $pass]);

    //Tiny script to show success message and redirect to login page
    echo "<script>alert('User created successfully!'); window.location='login.php';</script>";
    exit();
}
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="Style_Sheet.css">
        <title >Login</title>
    </head>

    <h2>Create New User</h2>
<body>
    <form method="POST">
        Username:<br>
        <input type="text" name="username"><br><br>
        Password:<br>
        <input type="password" name="password"><br><br>

        <button type="submit" formaction="new_user.php">Create</button>
    </form>
    <br>
    <a href="login.php">
    <button type="button">Back to Login</button>
    </a>
    
</body>
</html>