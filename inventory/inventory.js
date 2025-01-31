import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const appSettings = {
    databaseURL: `https://playground-a5d1a-default-rtdb.asia-southeast1.firebasedatabase.app/`
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const items = ref(database, `identity/${sessionStorage.getItem("key")}/items`);
const activebackground = ref(database, `identity/${sessionStorage.getItem("key")}/activebackground`);

// DOM elements
const backgrounds = document.getElementById("backgrounds");
const backBtn = document.getElementById("back-btn");

// Array to store local items
let localitems = [];

// Set background from active background reference
onValue(activebackground, function (snapshot) {
    const activebackground = Object.values(snapshot.val())[0];
    document.body.style.backgroundImage = `url('${activebackground}')`; // Set as background
});

// Fetch and display items
onValue(items, function (snapshot) {
    // Clear existing items in the list before appending new ones
    backgrounds.innerHTML = '';

    const itemsArray = Object.values(snapshot.val()) || []; // Ensure fallback if data is empty
    console.log(itemsArray);

    itemsArray.forEach(item => {
        let newEl = document.createElement("li");
        newEl.textContent = `${item.rarity} ${item.theme} background`;
        backgrounds.append(newEl);

        // Add click event listener to change background
        newEl.addEventListener("click", function () {
            document.body.style.backgroundImage = `url('${item.url}')`; // Set background
            remove(activebackground); // Remove previous active background reference
            push(activebackground, item.url); // Set new active background in Firebase
        });

        // Hover effect to trigger button "click down"
        newEl.addEventListener("mouseover", () => {
            backBtn.classList.add("clicked"); // Add the "clicked" class to trigger button animation
        });

        newEl.addEventListener("mouseout", () => {
            backBtn.classList.remove("clicked"); // Remove the "clicked" class when hover ends
        });
    });

    // Update the localitems array with the latest items
    localitems = itemsArray;
});

// Back button functionality
backBtn.addEventListener("click", function () {
    window.location.href = '../home/home.html';
});
