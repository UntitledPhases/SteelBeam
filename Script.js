//fill this up with all the games that we will be using
//need to create some sort of similar storage structure in localStorage, need to also add in game genre and platform,
const games = [
    { title: "The Binding of Isaac: Rebirth", img: "Images/Isaac.png" },
    { title: "Battlefield 6", img: "https://placehold.co/200x266?text=Battlefield+6" },
    { title: "Hades", img: "https://placehold.co/200x266?text=Hades" },
    { title: "Noita", img: "Images/Noita.png" },
    { title: "Hollow Knight", img: "https://placehold.co/200x266?text=Hollow+Knight" },
    { title: "Terraria", img: "Images/Terraria.png" },
    { title: "Celeste", img: "https://placehold.co/200x266?text=Celeste" },
    { title: "Dark Souls 3", img: "https://placehold.co/200x266?text=Dark+Souls+3" },
    { title: "Dead Cells", img: "https://placehold.co/200x266?text=Dead+Cells" },
    { title: "Cuphead", img: "Images/Cuphead.png" },
    { title: "Cyberpunk 2077", img: "https://placehold.co/200x266?text=Cyberpunk+2077" },
    { title: "God of War", img: "https://placehold.co/200x266?text=God+of+War" },
    { title: "Risk of Rain 2", img: "Images/RoR2.png" },
];

//sort games alphabetically by title
//games.sort((a, b) => a.title.localeCompare(b.title));

//Ok this code is kind of fucked up ngl but trust me if you go line by line it makes sense.
//Basically we have the library container in HTML. Thats the first line. Then we loop through each game in the array above
// and give it an ID. We then loop through again, yes IK theres gotta be a better way to do it, but we create the cards which
// are the actual little boxes you see on the screen, we attach the game ID to the card as well and it
// goes into the library container.

const library = document.querySelector(".library"); // Find library container

games.forEach((game, i) => {
    game.id = i + 1; //Assign an ID to each game as we loop through the array
});

games.forEach(game => {
    const card = document.createElement("a"); //creates card element for each game in the array
    card.classList.add("card"); // adds card class to each card so we can style it with CSS
    card.href = "#"; //placeholder link to make cards clickable, don't know if we need this
    card.dataset.id = game.id //gives each card the same ID as the game it represents, we need this to associate cards with games in the key arrays
    card.innerHTML =
        `<img src="${game.img}" alt="${game.title}">`; //Fill card element with game image and alt info

    library.appendChild(card);  // Fill library container with cards, library is wrapper for all cards
});

//functions to create keys and store them in localStorage for different collections

const KEY = "gc"; //key for game collections
const DEFAULT_COLLECTIONS = {
    collections: {                      //Collections and platform hold arrays, they simply hold IDs of games that belong to each category
        favorites: [],                  
        wishlist: [],                   //favorites: [3, 12, 18, etc.]
        completed: []                   //each number is the ID associated with a game
    },                                  //so if a game is added to favorites, add the game ID to the favorites array
                                        //same for platform, each array stores game IDs that belong to that platform
    platform: {
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