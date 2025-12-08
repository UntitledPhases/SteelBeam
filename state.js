//I hate javascript sometimes
//This just simplifies and modularizes the data structure that we use in local storage
const STATE_KEY = "user_state";

function emptyState(userId) {
    return {
        user_id: userId,
        favorites: [],
        wishlist: [],
        completed: [],
        ratings: {} //game_id maps to rating
    };
}

function getState() {
    const raw = localStorage.getItem(STATE_KEY);
    return raw ? JSON.parse(raw) : null;
}

function saveState(state) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
}