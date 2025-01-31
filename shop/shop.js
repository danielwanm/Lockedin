import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: `https://playground-a5d1a-default-rtdb.asia-southeast1.firebasedatabase.app/`
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

// Set up coins and items
let localcoins = 0;
let localitems = [];

let prob = 0;
const coins = ref(database, `identity/${sessionStorage.getItem("key")}/coins`);
const items = ref(database, `identity/${sessionStorage.getItem("key")}/items`);

// DOM elements
let woodenBtn = document.getElementById("wooden-btn");
let silverBtn = document.getElementById("silver-btn");
let goldBtn = document.getElementById("gold-btn");
let coinscount = document.getElementById("coins-count");
let backBtn = document.getElementById("back-btn");

// Listen for changes to coins
onValue(coins, function (snapshot) {
    if (snapshot.exists()) {
        let coinsValue = Object.values(snapshot.val())[0];
        localcoins = coinsValue;
        coinscount.innerText = localcoins;
    } else {
        console.log("No coins data available");
    }
});

// Listen for changes to items
onValue(items, function (snapshot) {
    if (snapshot.exists()) {
        localitems = Object.values(snapshot.val());
    } else {
        console.log("No items data available");
    }
});

// Helper function to generate random numbers
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Event listeners for buttons
woodenBtn.addEventListener("click", function () {
    let rarity = "none";
    if (localcoins > 100) {
        prob = 1;
        localcoins -= 100;
        remove(coins);
        push(coins, localcoins);
        chest(prob, rarity);
        coinscount.innerText = localcoins;
    }
});

silverBtn.addEventListener("click", function () {
    let rarity = "none";
    if (localcoins > 200) {
        prob = 30;
        localcoins -= 200;
        remove(coins);
        push(coins, localcoins);
        chest(prob, rarity);
        coinscount.innerText = localcoins;
    }
});

goldBtn.addEventListener("click", function () {
    let rarity = "none";
    if (localcoins > 500) {
        prob = 60;
        localcoins -= 500;
        remove(coins);
        push(coins, localcoins);
        chest(prob, rarity);
        coinscount.innerText = localcoins;
    }
});

backBtn.addEventListener("click", function () {
    location.href = "../home/home.html";
});

// Chest function with item existence check
function chest(prob, rarity) {
    let raw = getRandomInt(prob, 100);
    let theme;
    let url;

    // Determine rarity
    if (raw > 90) {
        rarity = "legendary";
    } else if (raw > 60) {
        rarity = "rare";
    } else {
        rarity = "common";
    }

    // Determine theme and URL
    if (raw >= 95) {
        theme = "pokemon wonderland (full art)";
        url = "../resources/pokemon-wonderland-full-art.jpg";
    } else if (raw >= 90) {
        theme = "mountain sunset";
        url = "../resources/mountain-sunset.jpg";
    } else if (raw >= 85) {
        theme = "cyberpunk 2077";
    } else if (raw >= 80) {
        theme = "fantasy";
    } else if (raw >= 75) {
        theme = "steampunk";
    } else if (raw >= 70) {
        theme = "post-apocalyptic";
    } else if (raw >= 65) {
        theme = "underwater";
    } else if (raw >= 60) {
        theme = "prehistoric";
    } else if (raw >= 55) {
        theme = "city";
    } else if (raw >= 50) {
        theme = "mystical";
    } else if (raw >= 45) {
        theme = "sci-fi";
    } else if (raw >= 40) {
        theme = "medieval";
    } else if (raw >= 35) {
        theme = "futuristic";
    } else if (raw >= 30) {
        theme = "industrial";
    } else if (raw >= 25) {
        theme = "woodlands";
    } else if (raw >= 20) {
        theme = "jungle";
    } else if (raw >= 15) {
        theme = "arctic";
    } else if (raw >= 10) {
        theme = "desert";
    } else {
        theme = "ocean";
    }

    // Check if the item already exists
    const itemExists = localitems.some(item => item.theme === theme && item.rarity === rarity);

    if (!itemExists) {
        // Push the item to the items array
        push(items, { rarity: rarity, theme: theme, url: url });

        // Alert the user
        alert(`You got a ${rarity} ${theme} background!`);
    } else {
        // Alert the user that the item already exists
        alert(`You already have a ${rarity} ${theme} background!`);
    }
}