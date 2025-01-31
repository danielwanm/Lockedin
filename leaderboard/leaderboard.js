import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: `https://playground-a5d1a-default-rtdb.asia-southeast1.firebasedatabase.app/`
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const identity = ref(database, "identity")

onValue(identity, function(snapshot){

    let identityArray = Object.values(snapshot.val())
    let localArray =[...identityArray]
    console.log(identityArray)
    for (let i = 0; i <10;i++){
        let localmax = 0
        let winner
        for (let j = 0; j < localArray.length; j++){
            if (localArray[j].allTimeTotal > localmax){
                localmax = localArray[j].allTimeTotal
                winner = j
                let newEl = document.createElement("tr")
                newEl.innerHTML = `<td>${localArray[winner].username}</td><td>${localArray[winner].allTimeTotal}</td>`
            }
        }
        localArray.splice(winner, 1)

    }   

}


)