//fill this up with all the games that we will be using
//need to create some sort of similar storage structure in localStorage, need to also add in game genre and platform,
const games = [
    { title: "The Binding of Isaac: Rebirth", img: "Images/Isaac.png" },
    { title: "Battlefield 6", img: "https://placehold.co/200x266?text=Battlefield+6" },
    { title: "Hades", img: "https://placehold.co/200x266?text=Hades" },
    { title: "Noita", img: "Images/Noita.png" },
    { title: "Hollow Knight", img: "Images/hollowknight.png" },
    { title: "Terraria", img: "Images/Terraria.png" },
    { title: "Celeste", img: "https://placehold.co/200x266?text=Celeste" },
    { title: "Dark Souls 3", img: "https://placehold.co/200x266?text=Dark+Souls+3" },
    { title: "Dead Cells", img: "https://placehold.co/200x266?text=Dead+Cells" },
    { title: "Cuphead", img: "Images/Cuphead.png" },
    { title: "Cyberpunk 2077", img: "Images/cyberpunk.png" },
    { title: "God of War", img: "https://placehold.co/200x266?text=God+of+War" },
    { title: "Risk of Rain 2", img: "Images/RoR2.png" },
    { title: "Stardew Valley", img: "Images/Stardew.png" },
    { title: "Team Fortress 2", img: "Images/TF2.png" },
    { title: "Heroes of Hammerwatch", img: "Images/HoH.png"},
    { title: "Tokyo Xtreme Racer", img: "Images/tokyoxtreme.png"}
];

//sort games alphabetically by title
//games.sort((a, b) => a.title.localeCompare(b.title));

//Ok this code is kind of fucked up ngl but trust me if you go line by line it makes sense.
//Basically we have the library container in HTML. Thats the first line. Then we loop through each game in the array above
// and give it an ID. We then create the cards which are the actual little boxes you see on the screen, 
// we attach the game ID to the card as well and it goes into the library container.

const library = document.querySelector(".library"); // Find library container


games.forEach((game, i) => {
    game.id = i + 1; //assign id to each game first, so we can use it when creating cards
    const card = document.createElement("a"); //creates card element for each game in the array
    card.classList.add("card"); // adds card class to each card so we can style it with CSS
    card.href = "#"; //placeholder link to make cards clickable, don't know if we need this
    card.dataset.id = game.id //gives each card the same ID as the game it represents, we need this to actually associate cards with games
    card.innerHTML =
        `<img src="${game.img}" alt="${game.title}">`; //Fill card element with game image and alt info
    library.appendChild(card);  // Fill library container with cards, library is wrapper for all cards
});

//functions to create keys and store them in localStorage for different collections

const KEY = "game_data"; //key for game data, just so we don't have to type it out every time we update the localStorage
const DATA = {
    collections: {                      //Collections and platform hold arrays, they simply hold IDs of games that belong to each category
        favorites: [],                  
        wishlist: [],                   //favorites: [3, 12, 18, etc.]
        completed: []                   //each number is the ID associated with a game
    },                                  //so if a game is added to favorites, add the game ID to the favorites array
                                        
    platform: {                         //same for platform, each array stores game IDs that belong to that platform
        PC: [],
        PlayStation: [],
        Xbox: [],
        Switch: []
    },

    meta: {                               //meta holds pairs of values, game ID maps to value
        rating: {},                       //rating {<gameID>: 3.5, <gameID>:5.0, etc.}
        hoursPlayed: {}                   //hoursPlayed {<gameID>: 12, <gameID>: 45, etc.}
    }
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
const cards = document.querySelectorAll(".card"); //select all game cards

function filterCards(filter) {
    const get = getData(); //get fresh copy of data from localStorage
    cards.forEach(card => {
        const id = Number(card.dataset.id); //get the game ID from the card, convert from string to number
        switch (filter) {
            case "All":
            default:
                card.style.display = ""; //show all cards
                break;
            case "Favorites":
                card.style.display = get.collections.favorites.includes(id) ? "" : "none";
                break;
            case "Wishlist":
                card.style.display = get.collections.wishlist.includes(id) ? "" : "none";
                break;
            case "Completed":
                card.style.display = get.collections.completed.includes(id) ? "" : "none";
                break;
        }
    });
};

//now to add event listeners to buttons so they actually do something when clicked
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter; //get the filter type from button's data-filter attribute
        filterCards(filter); //call filterCards function with the selected filter
    });
});

//reset functions on page reload, ideally this would stay

//this should (hope) cycle cards through each collection when double clicked
//border color by collection in css file
//can't really have games in more than one though.. maybe later
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
//works mostly ok but sometimes you need to hover off when changing multiple times, not important

function restoreCardBorder(){ //cards weren't keeping color on page refresh so this exists
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

//initially show all cards
filterCards("all");
//keep card border colors
restoreCardBorder();