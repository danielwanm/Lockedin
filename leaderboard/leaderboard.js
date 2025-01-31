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

    console.log("Raw Snapshot:", snapshot.val());
    let identityArray = Object.values(snapshot.val());
    console.log("Identity Array:", identityArray);
    let localArray =JSON.parse(JSON.stringify(identityArray))
    console.log(localArray)
    for (let i = 0; i <10;i++){



        let highestTime = 0
        let winner
        for (let j = 0; j < localArray.length; j++){
            let time = Object.values(localArray[j].allTimeTotal)[0]
            if (time > highestTime){
                highestTime = time
                winner = j
        }
    }
    let winnerData = localArray[winner];
    localArray.splice(winner, 1);
    console.log(localArray);
    
    let newEl = document.createElement("tr")
    console.log(winnerData)
    newEl.innerHTML = `<td>${winnerData.username}</td><td>${Object.values(winnerData.allTimeTotal)[0]}</td>`
    Leaderboard.append(newEl)
}   
})