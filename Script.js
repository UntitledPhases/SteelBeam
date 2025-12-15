let games = [];

const library = document.querySelector(".library"); // Find library container

const genreSelect = document.getElementById('genre-filter');
const platformSelect = document.getElementById('platform-filter');

function setRatingFilled(container, i) {
    [].forEach.call(container.children, function(sym, j) {
        if (j <= i) {
            sym.classList.add("rate-symbol-filled");
        } else {
            sym.classList.remove("rate-symbol-filled");
        }
    })
}

function renderLibraryCards() {
    games.forEach((game) => {
        const card = document.createElement("a");
        card.classList.add("card");
        card.href = "#";
        card.dataset.id = game.game_id;
        const img = game.cover_url;
        card.innerHTML =
            `<img src="${img}" alt="${game.game_title}">`;

        library.appendChild(card);  // Fill library container with cards, library is wrapper for all cards

        card.addEventListener("click", (event) => {
            event.preventDefault();

            //if game is from API, add, else go to game details page when clicking, yes the logic sucks but it works ¯\(ツ)/¯
            if (game.fromApi) {
                window.location.href = `add_game.php?api_game_id=${game.game_id}`
            }

            else {
            window.location.href = `game_details.php?game_id=${game.game_id}`;
            }
        });
    })
}

//async function to load game data from database
async function loadGames() {
    const response = await fetch('get_games.php');
    games = await response.json();
    renderLibraryCards();

    const allGenres = [...new Set(games.flatMap(g => g.genre))].filter(Boolean);
    const allPlatforms = [...new Set(games.flatMap(g => g.platform))].filter(Boolean);

    allGenres.forEach(g => {
        const option = document.createElement('option');
        option.value = g;
        option.textContent = g;
        genreSelect.appendChild(option);
    });

    allPlatforms.forEach(p => {
        const option = document.createElement('option');
        option.value = p;
        option.textContent = p;
        platformSelect.appendChild(option);
    });
}

//Renders cards from API results
function renderSearchCards(results) {
    results.forEach((r) =>{
        const card = document.createElement("a");
        card.classList.add("card");
        const title = r.name;
        const img = r.background_image || 'https://placehold.co/222x168.475?text=' + encodeURIComponent(r.name);

        card.innerHTML = `
            <img src="${img}" alt="${title}">
            <div class="card-title-container">
                <span class="card-title">${title}</span>
                <form method="get" action="add_game.php">
                    <input type="hidden" name="gid" value="${r.id}">
                    <input type="submit" class="card-add-btn" value="Add">
                </form>
            </div>
        `;

        library.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    //if API results exist, use them, else load from database
    if (Array.isArray(window.apiResults) && window.apiResults.length) {
        renderSearchCards(window.apiResults);
    } else {
        // otherwise (library.php), load from database
        loadGames();
    }
});

//functions to create keys and store them in localStorage for different collections

const KEY = "game_data"; //key for game data, just so we don't have to type it out every time we update the localStorage
const DATA = {
    collections: {                      //Collections and platform hold arrays, they simply hold IDs of games that belong to each category
        favorites: [],
        wishlist: [],                   //favorites: [3, 12, 18, etc.]
        completed: []                   //each number is the ID associated with a game
    },                                  //so if a game is added to favorites, add the game ID to the favorites array

    rating: {},                         //ratings stored as key value pair, gameID maps to rating value
};

//ngl I feel like properly storing things in this is going to be a nightmare but we got this guys we can do anything
// ok now to actually create the thing in localStorage
function initializeStorage() {
    if (!localStorage.getItem(KEY)) {   //if the key doesn't already exist in localStorage
        localStorage.setItem(KEY, JSON.stringify(DATA)); //store the DATA key array thing in it
    }
}

initializeStorage(); //call the function once when page loads

console.log('INIT data:', getData());
//ok so these 2 functions are how we put data in and get data out of localStorage.
//put data in so we can update user's collections and we pull data out so we can display it on the page.
function getData() {
    return JSON.parse(localStorage.getItem(KEY));
}

function saveData(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}

const get = getData(); //can use this inside functions to get copy of user's data from localStorage

//to actually start adding games to collections and stuff, we can do something like this inside another function:
get.collections.favorites.push(/*<gameID>*/);
saveData(get);
//this updates the local copy of the localStorage data, then saves it back to user's localStorage

//Now to actually make the filtering buttons work
const buttons = document.querySelectorAll("[data-filter]"); //select all buttons with data-filter attribute

function filterCards(filter) {
    const cards = document.querySelectorAll(".card"); //select all game cards

    const get = getData(); //get fresh copy of data from
    const selectedGenre = genreSelect.value;
    const selectedPlatform = platformSelect.value;

    cards.forEach(card => {
        const id = Number(card.dataset.id); //get the game ID from the card, convert from string to number

        const game = games.find(g => g.game_id === id);
        let visible = true;

        switch (filter) {
            case "Favorites":
                visible = get.collections.favorites.includes(id);
                break;
            case "Wishlist":
                visible = get.collections.wishlist.includes(id);
                break;
            case "Completed":
                visible = get.collections.completed.includes(id);
                break;
            default:
                visible = true;
        }
        if (selectedGenre !== "all" && !game.genre.includes(selectedGenre)) {
            visible = false;
        }

        if (selectedPlatform !== "all" && !game.platform.includes(selectedPlatform)) {
            visible = false;
        }

        card.style.display = visible ? "" : "none";
    });
};

//now to add event listeners to buttons so they actually do something when clicked
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter; //get the filter type from button's data-filter attribute
        filterCards(filter); //call filterCards function with the selected filter
    });
});

genreSelect.addEventListener("change", () => {
    const activeButton = document.querySelector("[data-filter][aria-pressed='true']") || { dataset: { filter: "all" } };
    filterCards(activeButton.dataset.filter);
});
platformSelect.addEventListener("change", () => {
    const activeButton = document.querySelector("[data-filter][aria-pressed='true']") || { dataset: { filter: "all" } };
    filterCards(activeButton.dataset.filter);
})

//reset functions on page reload, ideally this would stay

//this should (hope) cycle cards through each collection when double clicked
//border color by collection in css file
//can't really have games in more than one though.. maybe later
/*
cards.forEach(card =>{
    card.addEventListener("dblclick", (c1) =>{
        c1.preventDefault() //don't really need but just incase
        const gameId=Number(card.dataset.id); //get game id and data
        const data = getData();

        //variables to check where game is rn
        const inFavorites = data.collections.favorites.includes(gameId);
        const inWishlist = data.collections.wishlist.includes(gameId);
        const inCompleted = data.collections.completed.includes(gameId);

        //self explanatory me thinks
        let currentstate = "none";
        if (inFavorites) currentstate = "favorites";
        else if (inWishlist) currentstate = "wishlist";
        else if (inCompleted) currentstate = "completed";

        switch (currentstate) {
            case "none":
                //not in any collection, add to favorites
                data.collections.favorites.push(gameId);
                card.classList.add("in-favorites");
                break;
            case "favorites":
                //in favorites, move to wishlist
                data.collections.favorites = data.collections.favorites.filter(id => id !== gameId);
                data.collections.wishlist.push(gameId);
                card.classList.remove("in-favorites");
                card.classList.add("in-wishlist");
                break;
            case "wishlist":
                //in wishlist, move to completed
                data.collections.wishlist = data.collections.wishlist.filter(id => id !== gameId);
                data.collections.completed.push(gameId);
                card.classList.remove("in-wishlist");
                card.classList.add("in-completed");
                break;
            case "completed":
                //in completed, remove from all collections
                data.collections.completed = data.collections.completed.filter(id => id !== gameId);
                card.classList.remove("in-completed");
                break;
        }
        saveData(data);
        console.log("updated collections", data.collections);

    });
});
*/
//works mostly ok but sometimes you need to hover off when changing multiple times, not important

function restoreCardBorder(){ //cards weren't keeping color on page refresh so this exists
    const cards = document.querySelectorAll(".card"); //select all game cards
    const data = getData();
    cards.forEach(card=>{
        const gameId=Number(card.dataset.id);
        card.classList.remove("in-favorites", "in-wishlist", "in-completed"); //remove first
        //check collection to see if card is in it then add class back
        if (data.collections.favorites.includes(gameId)){
            card.classList.add("in-favorites")
        }
        else if (data.collections.wishlist.includes(gameId)){
            card.classList.add("in-wishlist")
        }
        else if (data.collections.completed.includes(gameId)){
            card.classList.add("in-completed")
        }
    })
}
/* - not on main page no longer need here
function restoreRatings() {
    const data = getData();
    cards.forEach(card=>{
        const gameId=Number(card.dataset.id);
        let container = card.querySelector(".rate-container");
        if (gameId in data.rating) {
            setRatingFilled(container, data.rating[gameId] - 1);
        }
    });
}
*/

//initially show all cards
filterCards("all");
//keep card border colors
restoreCardBorder();
//keep ratings
//restoreRatings();