//Game data - same as in Script.js
const games = [
    { title: "The Binding of Isaac: Rebirth", img: "Images/Isaac.png", platform: ["PC", "Switch", "Xbox", "Playstation"], genre: ["Shooter", "RPG", "Roguelike", "Action"]},
    { title: "Hades", img: "Images/Hades.png", platform: ["PC","Switch","Xbox", "Playstation"], genre: ["RPG", "Roguelike", "Action"] },
    { title: "Noita", img: "Images/Noita.png", platform: ["PC"], genre: ["Adventure", "RPG", "Roguelike", "Action"] },
    { title: "Hollow Knight", img: "Images/hollowknight.png", platform: ["PC","Switch","Xbox", "Playstation"], genre: ["Adventure"] },
    { title: "Terraria", img: "Images/Terraria.png", platform: ["PC","Switch","Xbox", "Playstation"], genre: ["Adventure", "RPG"] },
    { title: "Cuphead", img: "Images/Cuphead.png", platform: ["PC","Switch","Xbox", "Playstation"], genre: ["Shooter", "Platformer", "Action"] },
    { title: "Cyberpunk 2077", img: "Images/cyberpunk.png", platform: ["PC","Xbox", "Playstation"], genre: ["RPG", "Action"] },
    { title: "Risk of Rain 2", img: "Images/RoR2.png", platform: ["PC","Switch","Xbox", "Playstation"], genre: ["Roguelike", "Action"] },
    { title: "Stardew Valley", img: "Images/Stardew.png", platform: ["PC","Switch","Xbox", "Playstation"], genre: ["Adventure"] },
    { title: "Team Fortress 2", img: "Images/TF2.png", platform: ["PC"], genre: ["Shooter", "Action"] },
    { title: "Heroes of Hammerwatch", img: "Images/HoH.png", platform: ["PC"], genre: ["RPG", "Action", "Adventure"] },
    { title: "Tokyo Xtreme Racer", img: "Images/tokyoxtreme.png", platform: ["PC", "Playstation"], genre: ["Racing"] }
];

//Assign IDs to games just like in Script.js
games.forEach((game, i) => {
    game.id = i + 1;
});

//localStorage functions - same as Script.js
const KEY = "game_data";
const DATA = {
    collections: {
        favorites: [],
        wishlist: [],
        completed: []
    },
    rating: {},
};

function initializeStorage() {
    if (!localStorage.getItem(KEY)) {
        localStorage.setItem(KEY, JSON.stringify(DATA));
    }
}

function getData() {
    return JSON.parse(localStorage.getItem(KEY));
}

function saveData(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}

initializeStorage();

//Get the game ID from the hidden input
const gameId = parseInt(document.getElementById("current-game-id").value);

//Find the game in the games array
const currentGame = games.find(g => g.id === gameId);

//If game not found, redirect back
if (!currentGame) {
    window.location.href = "library.php";
}

//Populate the page with game information
document.getElementById("game-title").textContent = currentGame.title;
document.getElementById("game-image").src = currentGame.img;
document.getElementById("game-image").alt = currentGame.title;
document.getElementById("game-genre").textContent = currentGame.genre.join(", ");
document.getElementById("game-platform").textContent = currentGame.platform.join(", ");

//Rating functionality
function setRatingFilled(container, i) {
    [].forEach.call(container.children, function(sym, j) {
        if (j <= i) {
            sym.classList.add("rate-symbol-filled");
        } else {
            sym.classList.remove("rate-symbol-filled");
        }
    })
}

//Create rating stars
const rateContainer = document.querySelector(".rate-container-details");
for (let i = 0; i < 5; i++) {
    let rateSymbol = document.createElement("span");
    rateSymbol.classList.add("rate-symbol");
    rateSymbol.addEventListener("click", (event) => {
        let data = getData();
        let clear = false;
        if (data.rating[gameId] == i + 1) {
            delete data.rating[gameId];
            clear = true;
        } else {
            data.rating[gameId] = i + 1;
        }

        setRatingFilled(rateContainer, clear ? -1 : i);
        saveData(data);
    });
    rateContainer.appendChild(rateSymbol);
}

//Load current rating
const data = getData();
if (gameId in data.rating) {
    setRatingFilled(rateContainer, data.rating[gameId] - 1);
}

//Collection button functionality
const btnFavorites = document.getElementById("btn-favorites");
const btnWishlist = document.getElementById("btn-wishlist");
const btnCompleted = document.getElementById("btn-completed");
const btnRemove = document.getElementById("btn-remove");

//Function to update button states based on current collection
function updateCollectionButtons() {
    const data = getData();
    
    //Reset all button states
    btnFavorites.classList.remove("active");
    btnWishlist.classList.remove("active");
    btnCompleted.classList.remove("active");
    
    //Set active state for current collection
    if (data.collections.favorites.includes(gameId)) {
        btnFavorites.classList.add("active");
    } else if (data.collections.wishlist.includes(gameId)) {
        btnWishlist.classList.add("active");
    } else if (data.collections.completed.includes(gameId)) {
        btnCompleted.classList.add("active");
    }
}

//Add to favorites
btnFavorites.addEventListener("click", () => {
    const data = getData();
    
    //Remove from other collections first
    data.collections.wishlist = data.collections.wishlist.filter(id => id !== gameId);
    data.collections.completed = data.collections.completed.filter(id => id !== gameId);
    
    //Add to favorites if not already there
    if (!data.collections.favorites.includes(gameId)) {
        data.collections.favorites.push(gameId);
    }
    
    saveData(data);
    updateCollectionButtons();
});

//Add to wishlist
btnWishlist.addEventListener("click", () => {
    const data = getData();
    
    //Remove from other collections first
    data.collections.favorites = data.collections.favorites.filter(id => id !== gameId);
    data.collections.completed = data.collections.completed.filter(id => id !== gameId);
    
    //Add to wishlist if not already there
    if (!data.collections.wishlist.includes(gameId)) {
        data.collections.wishlist.push(gameId);
    }
    
    saveData(data);
    updateCollectionButtons();
});

//Add to completed
btnCompleted.addEventListener("click", () => {
    const data = getData();
    
    //Remove from other collections first
    data.collections.favorites = data.collections.favorites.filter(id => id !== gameId);
    data.collections.wishlist = data.collections.wishlist.filter(id => id !== gameId);
    
    //Add to completed if not already there
    if (!data.collections.completed.includes(gameId)) {
        data.collections.completed.push(gameId);
    }
    
    saveData(data);
    updateCollectionButtons();
});

//Remove from all collections
btnRemove.addEventListener("click", () => {
    const data = getData();
    
    //Remove from all collections
    data.collections.favorites = data.collections.favorites.filter(id => id !== gameId);
    data.collections.wishlist = data.collections.wishlist.filter(id => id !== gameId);
    data.collections.completed = data.collections.completed.filter(id => id !== gameId);
    
    saveData(data);
    updateCollectionButtons();
});

//Initialize button states on page load
updateCollectionButtons();