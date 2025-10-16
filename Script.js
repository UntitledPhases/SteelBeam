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

/*localStorage collections? need to figure this out better
function createCollection(name) {
    const collections = JSON.parse(localStorage.getItem("collections"));
    if (!collections[name]) collections[name] = [];
    localStorage.setItem("collections", JSON.stringify(collections));
}

function addToCollection()

function loadCollection()
                                            comment end*/

//sort games alphabetically by title
//games.sort((a, b) => a.title.localeCompare(b.title));

const library = document.querySelector(".library"); // Find library container

games.forEach(game => {
    const card = document.createElement("a");
    card.classList.add("card");
    card.href = "#"; //placeholder link
    
    card.innerHTML =
        `<img src="${game.img}" alt="${game.title}">`;

    library.appendChild(card);  // Fill library container with cards
});
