import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
    databaseURL: `https://playground-a5d1a-default-rtdb.asia-southeast1.firebasedatabase.app/`
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const identity = ref(database, "identity");
const Leaderboard = document.getElementById("Leaderboard");

function format(time){
    let time_s = time
    let h = Math.floor(time_s/3600)
    time_s -= h*3600
    let m = Math.floor(time_s/60)
    time_s -=m*60
    let s = time_s
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

onValue(identity, function(snapshot) {
    const data = snapshot.val();
    if (!data) {
        console.log("No data available");
        return;
    }

    let identityArray = Object.values(data);
    console.log("Identity Array:", identityArray);

    let localArray = JSON.parse(JSON.stringify(identityArray));
    console.log("Local Array:", localArray);

    // Clear the leaderboard before appending new data
    Leaderboard.innerHTML =   
    `
    <tr>
    <th>Place</th>
    <th>Name</th>
    <th>Total Time Studied</th>
  </tr>`

    // Find the top 10 entries
    for (let i = 0; i < 10 && localArray.length > 0; i++) {
        let highestTime = 0;
        let winnerIndex = 0;

        for (let j = 0; j < localArray.length; j++) {
            let time = Object.values(localArray[j].allTimeTotal)[0];
            if (time > highestTime) {
                highestTime = time;
                winnerIndex = j;
            }
        }

        let winnerData = localArray[winnerIndex];
        localArray.splice(winnerIndex, 1);

        let newEl = document.createElement("tr");
        newEl.innerHTML = `<td>${i+1}</td><td>${winnerData.username}</td><td>${format(Object.values(winnerData.allTimeTotal)[0])}</td>`;
        Leaderboard.appendChild(newEl);
    }
});