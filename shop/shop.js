import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: `https://playground-a5d1a-default-rtdb.asia-southeast1.firebasedatabase.app/`
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
//set up prob
let prob = 0

//set up coins
let localcoins = 0
let coinscount = document.getElementById("coins-count")
const coins = ref(database, `identity/${sessionStorage.getItem("key")}/coins`)
onValue(coins, function(snapshot){
    
    let coinsArray = Object.values(snapshot.val())
    let coins = startArray[0]
    localcoins = coins
})
coinscount.innerText = localcoins 

//DOM
let woodenBtn = document.getElementById("wooden-btn")
let silverBtn = document.getElementById("silver-btn")
let goldBtn = document.getElementById("gold-btn")

woodenBtn.addEventListener("click", function(){
    let rarity = "none"
    if (localcoins>100){
        prob =1
        localcoins -= 100
     chest(prob)
    }
})
silverBtn.addEventListener("click", function(){
    let rarity = "none"
    if (localcoins>200){
        prob =6
        localcoins -= 200
        chest(prob)
    }
 
})
goldBtn.addEventListener("click", function(){
    let rarity = "none"
    if (localcoins>500){
        prob =9
        localcoins -= 500
        chest(prob)
    }

})


function chest(prob) {
    let raw = getRandomInt(prob, 10)
    if (raw>8){
        rarity = "epic"

    }
    else if (raw>5){
        rarity = "rare"
    }
    else {
        rarity = "common"
    }
    alert(`you got a ${rarity} item`)

}