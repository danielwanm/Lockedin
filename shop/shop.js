import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: `https://playground-a5d1a-default-rtdb.asia-southeast1.firebasedatabase.app/`
}
const app = initializeApp(appSettings)
const database = getDatabase(app)

//set up coins
let localcoins = 0
let localitems = []

let prob = 0
const coins = ref(database, `identity/${sessionStorage.getItem("key")}/coins`)
const items = ref(database, `identity/${sessionStorage.getItem("key")}/items`)
//DOM
let woodenBtn = document.getElementById("wooden-btn")
let silverBtn = document.getElementById("silver-btn")
let goldBtn = document.getElementById("gold-btn")
let coinscount = document.getElementById("coins-count")
let backBtn = document.getElementById("back-btn")


onValue(coins, function(snapshot) {
    if (snapshot.exists()) {
        let coinsValue = Object.values(snapshot.val())[0]; // Ensure snapshot is valid before using it
        localcoins = coinsValue;
        coinscount.innerText = localcoins; // Update the UI
    } else {
        console.log("No coins data available");
    }
});

onValue(items, function(snapshot) {
    if (snapshot.exists()) {
        let itemsValue = Object.values(snapshot.val())[0]; // Ensure snapshot is valid before using it
        localitems = itemsValue;
    } else {
        console.log("No items data available");
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


woodenBtn.addEventListener("click", function(){
    let rarity = "none"
    if (localcoins>100){
        console.log("clicked buy")
        prob =1
        localcoins -= 100
        remove(coins)
        push(coins, localcoins)
        chest(prob, rarity)
        coinscount.innerText = localcoins 

    }
})
silverBtn.addEventListener("click", function(){
    let rarity = "none"
    if (localcoins>200){
        prob =30
        localcoins -= 200
        remove(coins)
        push(coins, localcoins)
        chest(prob, rarity)
        coinscount.innerText = localcoins 

    }
 
})
goldBtn.addEventListener("click", function(){
    let rarity = "none"
    if (localcoins>500){
        prob =60
        localcoins -= 500
        remove(coins)
        push(coins, localcoins)
        chest(prob, rarity)
        coinscount.innerText = localcoins 

    }

})

backBtn.addEventListener("click", function(){
    location.href = "../home/home.html"
})



function chest(prob, rarity) {
    let raw = getRandomInt(prob, 100)
    let theme
    let url
    if (raw>90){
        rarity = "legendary"
    }
    else if (raw>60){
        rarity = "rare"
    }
    else {
        rarity = "common"
    }
    
    if (raw >= 95) {
        theme = "pokemon wonderland (full art)";
        url = "../resources/pokemon-wonderland-full-art.jpg"
    } else if (raw >= 90) {
        theme = "mountain sunset";
        url = "../resources/mountain-sunset.jpg"
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

    // Push the item to the items array
    if (!localitems.some(item => item === theme)) {
        localitems.push(theme);
    }
    remove(items)
    push(items, localitems)

    // Alert the user
    alert(`You got a ${rarity} ${theme} background!`);
}