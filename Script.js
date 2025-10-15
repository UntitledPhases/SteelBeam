//fill this up with all the games that we will be using  
const games = [
    { title: "The Binding of Isaac: Rebirth", img: "https://placehold.co/200x266?text=Isaac" },
    { title: "Battlefield 6", img: "https://placehold.co/200x266?text=Battlefield+6" },
    { title: "Hades", img: "https://placehold.co/200x266?text=Hades" },
    { title: "Noita", img: "https://placehold.co/200x266?text=Noita" },
    { title: "Hollow Knight", img: "https://placehold.co/200x266?text=Hollow+Knight" },
    { title: "Terraria", img: "https://placehold.co/200x266?text=Terraria" },
    { title: "Celeste", img: "https://placehold.co/200x266?text=Celeste" },
    { title: "Dark Souls 3", img: "https://placehold.co/200x266?text=Dark+Souls+3" },
    { title: "Dead Cells", img: "https://placehold.co/200x266?text=Dead+Cells" },
    { title: "Cuphead", img: "https://placehold.co/200x266?text=Cuphead" },
    { title: "Cyberpunk 2077", img: "https://placehold.co/200x266?text=Cyberpunk+2077" },
    { title: "God of War", img: "https://placehold.co/200x266?text=God+of+War" },
    { title: "Risk of Rain 2", img: "https://placehold.co/200x266?text=Risk+of+Rain+2" }
];

const library = document.querySelector(".library"); // Find library container

games.forEach(game => {
    const card = document.createElement("a");
    card.classList.add("card");
    card.href = "#"; //placeholder link
    
    card.innerHTML =
        `<img src="${game.img}" alt="${game.title}">`;

    library.appendChild(card);  // Fill library container with cards
});
