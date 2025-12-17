
-- DROP AND CREATE DATABASE
DROP DATABASE IF EXISTS SteelBeam;
CREATE DATABASE SteelBeam;
USE SteelBeam;

-- CREATE USERS TABLE
CREATE TABLE users (
    user_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- CREATE TEST USER --
-- Username: test --
-- Password: test --
INSERT INTO users (username, password)
VALUES ('test', '$2y$10$E9H7lX0x6kqZzE4tP8d3tOTsT8k5zE4bH0lFZ9m5wzX7XHkzR8e6G');

-- CREATE GAMES TABLE
CREATE TABLE games (
    game_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    game_title VARCHAR(100) NOT NULL,
    cover_url VARCHAR(255) NOT NULL,
    genre VARCHAR(30),
    platform VARCHAR(255),
    status ENUM('Favorites', 'Wishlist', 'Completed') DEFAULT NULL,
    rating INT(2),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- CREATE USERS AND GRANT PRIVILEGES -- Had to update this cause my SQL kept throwing errors
CREATE USER IF NOT EXISTS 'mgs_user'@'localhost' IDENTIFIED BY 'pa55word';
CREATE USER IF NOT EXISTS 'mgs_tester'@'localhost' IDENTIFIED BY 'pa55word';

GRANT SELECT, INSERT, DELETE, UPDATE
ON SteelBeam.*
TO 'mgs_user'@'localhost';

GRANT SELECT
ON SteelBeam.*
TO 'mgs_tester'@'localhost';