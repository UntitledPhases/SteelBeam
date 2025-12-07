# SteelBeam
So far the idea is to have a catalog of 20-30 games, which can all be stored in an array in the actual HTML file. Then we provide the option to add games to favorites, wishlist, etc., which adds those games to keys (I thought they were called dictionaries?) stored in localStorage.
Basically, the keys in localStorage are 3d arrays containing

Make sure steelbeam folder is moved to: DRIVENAME:\xampp\htdocs 
Also add database to PHP admin

for testing use:
Username: test
Password: password123

index for apache use login.php

RAWG API Key: 4440e3e77e974156b392821e6186e4e0

RAWG queries: https://api.rawg.io/api/games?key=4440e3e77e974156b392821e6186e4e0&search=*ENTER NAME OF GAME HERE*
examples:     https://api.rawg.io/api/games?key=4440e3e77e974156b392821e6186e4e0&search=minecraft
              https://api.rawg.io/api/games?key=4440e3e77e974156b392821e6186e4e0&search=the-binding-of-isaac-repentance

RAWG also provides images