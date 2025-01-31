import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: `https://playground-a5d1a-default-rtdb.asia-southeast1.firebasedatabase.app/`
}
const app = initializeApp(appSettings)
const database = getDatabase(app)

const startTimeInDb = ref(database, `identity/${sessionStorage.getItem("key")}/starttime`)
const running = ref(database, `identity/${sessionStorage.getItem("key")}/running`)
const totalTime = ref(database, `identity/${sessionStorage.getItem("key")}/totaltime`)
const allTimeTotal = ref(database, `identity/${sessionStorage.getItem("key")}/allTimeTotal`)
const coins = ref(database, `identity/${sessionStorage.getItem("key")}/coins`)
const activebackground = ref(database, `identity/${sessionStorage.getItem("key")}/activebackground`)

let localRunning = false
let localStartTime = null
let localTotalTime = 0 
let timeStudied =  0
let localCoins = 0
let localAllTimeTotal = 0
//DOM
let startBtn = document.getElementById("start-btn")
let pauseBtn = document.getElementById("pause-btn")
let doneBtn  = document.getElementById("done-btn")
let convertBTtn = document.getElementById("convert-btn")
let timeStudiedCurrent = document.getElementById("time-studied-current")
let timeStudiedTotal = document.getElementById("time-studied-total")
let coinsCount = document.getElementById("coins-count")
let allTimeTotalEl = document.getElementById("all-time-total")
let shopBtn = document.getElementById("shop-btn")
let inventoryBtn = document.getElementById("inventory-btn")
let leaderBtn = document.getElementById("leaderboard-btn")


onValue(activebackground, function(snapshot) {
    const data = snapshot.val();
    if (data) { // Check if data is not null
        let backgroundUrl = Object.values(data)[0]; // Get the first value
        if (backgroundUrl) { // Ensure it's not null or undefined
            document.body.style.backgroundImage = `url('${backgroundUrl}')`;
        }
    }
});



onValue(running, function(snapshot){
    let runningArray = Object.values(snapshot.val())
    let isrunning = runningArray[0]
    localRunning = isrunning
})
onValue(startTimeInDb, function(snapshot){
    
    let start = Object.values(snapshot.val())[0]
    localStartTime = start
})
onValue(totalTime, function(snapshot){
    let totalTime = Object.values(snapshot.val())[0]
    localTotalTime = totalTime
    timeStudiedTotal.innerText = format(localTotalTime)
})
onValue(coins, function(snapshot){
    let coins = Object.values(snapshot.val())[0]
    localCoins = coins
    coinsCount.innerText = localCoins
})
onValue(allTimeTotal, function(snapshot){
    let allTimeTotal = Object.values(snapshot.val())[0]
    localAllTimeTotal = allTimeTotal
    allTimeTotalEl.innerText = format(localAllTimeTotal)
})

//set up total time

 function format(time){
    let time_s = time
    let h = Math.floor(time_s/3600)
    time_s -= h*3600
    let m = Math.floor(time_s/60)
    time_s -=m*60
    let s = time_s
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

function second(){
    if (localRunning == "true"){
    timeStudied = Math.floor((new Date()-new Date(localStartTime))/1000)
    timeStudiedCurrent.innerText = format(timeStudied)
    timeStudiedTotal.innerText = format(localTotalTime)

}}

startBtn.addEventListener("click", function(){
        if (localRunning !== "true" ){
            remove(running)
            push(running,"true")
            push (startTimeInDb, `${new Date()}`)
        }
    })

doneBtn.addEventListener("click", function(){
        remove(running)
        remove(startTimeInDb)
        push(running,"false")
        timeStudiedCurrent.innerText = format(0)
        localTotalTime += timeStudied
        localAllTimeTotal += timeStudied
        timeStudied = 0 
        remove(totalTime)
        push(totalTime, localTotalTime)
        timeStudiedTotal.innerText = format(localTotalTime)
        remove(allTimeTotal)
        push(allTimeTotal, localAllTimeTotal)
        allTimeTotalEl.innerText = format(localAllTimeTotal)
    })



convertBTtn.addEventListener("click", function(){
    let amount = Math.floor(localTotalTime/60)
    localTotalTime -= amount*60
    timeStudiedTotal.innerText = format(localTotalTime)
    localCoins += amount
    remove(coins)
    push(coins, localCoins)
    coinsCount.innerText = localCoins
})
    

shopBtn.addEventListener("click", function(){
    window.location.href = "../shop/shop.html"
})
inventoryBtn.addEventListener("click", function(){
    window.location.href = "../inventory/inventory.html"
})
leaderBtn.addEventListener("click", function(){ 
    window.location.href = "../leaderboard/leaderboard.html"
}
)
setInterval(second, 1)
