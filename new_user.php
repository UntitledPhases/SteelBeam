<?php
require_once 'db.php';

?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="Style_Sheet.css">
        <title >Login</title>
    </head>

    <h2>StealBeam Login</h2>
<body>
    <form method="POST">
        Username:<br>
        <input type="text" name="username"><br><br>
        Password:<br>
        <input type="password" name="password"><br><br>

        <button type="submit" formaction="create_user.php">Create</button>
        <a href="login.php">
        <button type="button">Back to Login</button>
        </a>
    </form>
</body>
</html>