
-- DROP AND CREATE DATABASE
DROP DATABASE IF EXISTS SteelBeam;
CREATE DATABASE SteelBeam;
USE SteelBeam;

-- CREATE USERS TABLE
CREATE TABLE users (
    user_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL
);

-- CREATE GAMES TABLE
CREATE TABLE games (
    game_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    game_title VARCHAR(100) NOT NULL,
    genre VARCHAR(30),
    platform VARCHAR(30),
    status ENUM('Favorites', 'Wishlist', 'Completed') DEFAULT NULL,
    rating INT(2),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- CREATE USERS AND GRANT PRIVILEGES
GRANT SELECT, INSERT, DELETE, UPDATE
ON SteelBeam.*
TO mgs_user@localhost
IDENTIFIED BY 'pa55word';

GRANT SELECT
ON SteelBeam.*
TO mgs_tester@localhost
IDENTIFIED BY 'pa55word';
