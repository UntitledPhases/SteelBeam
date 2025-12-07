<?php
$dsn = 'mysql:host=localhost;dbname=SteelBeam;charset=utf8';
$username = 'mgs_user';
$password = 'pa55word';

try {
    $db = new PDO($dsn, $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Database Error: " . $e->getMessage();
    exit();
}
?>