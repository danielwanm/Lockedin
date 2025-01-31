import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: `https://playground-a5d1a-default-rtdb.asia-southeast1.firebasedatabase.app/`
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const items  = ref(database, `identity/${sessionStorage.getItem("key")}/items`)

const backgrounds = document.getElementById("backgrounds")
let localitems = []



onValue(items, function(snapshot){
    
    let itemsArray = Object.values(snapshot.val())
    console.log(itemsArray)
    for (let i = 0; i < itemsArray.length; i++){
        backgrounds.innerHTML += `<li>${itemsArray[i].rarity} ${itemsArray[i].theme} background</li>`

    }
    let items = itemsArray[0]
    localitems = items
})


coinscount.innerText = localcoins 














