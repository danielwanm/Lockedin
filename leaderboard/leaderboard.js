import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: `https://playground-a5d1a-default-rtdb.asia-southeast1.firebasedatabase.app/`
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const identity = ref(database, "identity")
const Leaderboard = document.getElementById("leaderboard")

onValue(identity, function(snapshot){

    let identityArray = Object.values(snapshot.val())
    let localArray =[...identityArray]
    console.log(identityArray)
    for (let i = 0; i <10;i++){
        let localmax = 0
        let winner
        for (let j = 0; j < localArray.length; j++){
            console.log("in inner loop")
            let time = Object.values(localArray[j].allTimeTotal)[0]
            console.log(time)

            if (time > localmax){
                localmax = time
                winner = j
                console.log(winner)

            }
        }
        localArray.splice(winner, 1)
        let newEl = document.createElement("tr")
        console.log(localArray[winner])
        newEl.innerHTML = `<td>${localArray[winner].username}</td><td>${Object.values(localArray[winner].allTimeTotal)[0]}</td>`
        Leaderboard.append(newEl)

    }   

}


)