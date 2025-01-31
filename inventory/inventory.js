import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: `https://playground-a5d1a-default-rtdb.asia-southeast1.firebasedatabase.app/`
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const items  = ref(database, `identity/${sessionStorage.getItem("key")}/items`)
const activebackground = ref(database, `identity/${sessionStorage.getItem("key")}/activebackground`)
//DOM
const backgrounds = document.getElementById("backgrounds")
const backBtn = document.getElementById("back-btn")
const equipBtn = document.getElementById("equip-1")


let localitems = []



onValue(activebackground, function(snapshot){
        let activebackground = Object.values(snapshot.val())[0]
        document.body.style.backgroundImage = `url('${activebackground}')`; // Set as background
    })

onValue(items, function(snapshot){
    
    let itemsArray = Object.values(snapshot.val())
    console.log(itemsArray)
    for (let i = 0; i < itemsArray.length; i++){
        backgrounds.innerHTML += 
        `
        <li>${itemsArray[i].rarity} ${itemsArray[i].theme} background</li>
        <button id="equip-${i}">Equip</button>
        <script> 
        const equipBtn = document.getElementById("equip-${i}")
        equipBtn.addEventListener("click", function(){
        console.log("equip clicked")
        push(activebackground, itemsArray[i].url)
        })

        </script>

        `

    }
    let items = itemsArray[0]
    localitems = items
})


coinscount.innerText = localcoins 


backBtn.addEventListener("click", function(){
    window.location.href = '../home/home.html'
})











