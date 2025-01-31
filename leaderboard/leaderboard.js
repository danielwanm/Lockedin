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
    console.log(identityArray)

})