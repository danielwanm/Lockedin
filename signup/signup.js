import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-a5d1a-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const identity = ref(database, "identity");
const usercount = ref(database, "usercount");   
let localusercount = 0; // Declare outside


onValue(usercount, function(snapshot){
    console.log("in onvalue function")
    let usercountArray = Object.values(snapshot.val())
    let usercount = usercountArray[0]
    localusercount = usercount
    console.log(localusercount)
})
const form = document.getElementById("signup-form");
const submitBtn = document.getElementById("submit");
const password = document.getElementById("password");
const username = document.getElementById("username");

form.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form from submitting normally
    let identityRef = ref(database, `identity/${localusercount+1}`); // Replace 'customKey' with your desired name

    set(identityRef, {
        username: username.value,
        password: password.value,
        

    })
    .then(() => {
        console.log("Data pushed successfully");
        localusercount +=1
        remove(usercount)
        console.log(localusercount)
        push(usercount, localusercount)
        alert("account created")
        window.location.href = '../index.html'

    })
    .catch(error => {
        console.error("Error pushing data to Firebase:", error);
    });
});