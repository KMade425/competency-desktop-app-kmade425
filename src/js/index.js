const electron = require('electron')
const path = require('path')
const fs = require('fs')

const BrowserWindow = electron.remote.BrowserWindow

let usersData = {
    "status": "1",
    "users": [
        { "name": "test", "email": "test@test.com", "pass": "12345" },
        { "name": "test1", "email": "test1@test.com", "pass": "12345" },
        { "name": "test2", "email": "test2@test.com", "pass": "12345" }
    ]
}
let usersfile = 'src/file_system/users.json'
var fileRead;
usersData = JSON.stringify(usersData)

fileRead = JSON.parse(fs.readFileSync(usersfile, 'utf8'));
console.log(fileRead);
userArray = fileRead.users
console.log(userArray)



const loginBtn = document.getElementById('login')
loginBtn.addEventListener('click', function(event) {
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value
    if (username == "" || password == "") {
        if (username == "" && password == "") {
            console.log("all fields are empty");
        } else if (username == "") {
            console.log("Username is empty");
        } else if (password == "") {
            console.log("Password is empty");
        }
    } else {
        var notFound = 0;
        var found = 0
        for (var i = 0; i < userArray.length; i++) {
            if (userArray[i].email === username && userArray[i].pass === password) {
                console.log(userArray[i])
                window.localStorage.setItem("name", userArray[i].name)
                window.localStorage.setItem("email", userArray[i].email)
                window.localStorage.setItem("password", userArray[i].pass)
                window.localStorage.setItem("allDetails", JSON.stringify(userArray[i]))
                window.localStorage.setItem("loggedin", "1")
                found++
            } else {
                notFound++
            }
            if (i == (userArray.length - 1)) {
                if (notFound == userArray.length) {
                    console.log("user not found")
                } else if (found == 1) {
                    console.log('found')
                    window.location.replace("dashboard.html")
                }
            }
        }

    }
})










/** 
// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
    window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
    window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange ||
    window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB.")
} else {
    console.log("yes");
}
const userData = [
    { id: "1", name: "jeff jones", age: 35, email: "gopal@tutorialspoint.com", password: "12345" },
    { id: "2", name: "aliko hussein", age: 32, email: "prasad@tutorialspoint.com", password: "12345" }
];
var db;
var request = window.indexedDB.open("userDB", 2);
request.onerror = function(event) {
    console.log("error: ");
};
request.onsuccess = function(event) {
    db = request.result;
    console.log("success: " + db);
};
request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("user", { keyPath: "id" });

    for (var i in userData) {
        objectStore.add(userData[i]);
    }
}
*/