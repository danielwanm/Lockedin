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


function chest(prob, rarity) {
    let raw = getRandomInt(prob, 100)
    if (raw>95){
        rarity = "legendary"
        push(items, "legendary")

    }
    else if (raw>60){
        rarity = "rare"
        push(items, "rare")
    }
    else {
        rarity = "common"
        push(items, "common")
    }
    alert(`you got a ${rarity} background`)

}