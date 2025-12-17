<?php
$dsn = 'mysql:host=localhost;dbname=steelbeam;charset=utf8mb4';
$username = 'mgs_user';
$password = 'pa55word';

$apiKey = '4440e3e77e974156b392821e6186e4e0';

try {
    $db = new PDO($dsn, $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Database Error: " . $e->getMessage();
    exit();
}
?>