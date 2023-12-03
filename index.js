import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-2f6d6-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "shoppingList")

const inputEl = document.getElementById("input-el")
const addBtn = document.getElementById("add-btn")
const shoppingListEl = document.getElementById("shopping-list")
const darkModeBtn = document.getElementById("icon")

onValue(itemsInDB, function(snapshot){

    if (snapshot.exists()) {

        let shoppingListArray = Object.entries(snapshot.val())
        clearShoppingList()
    
        for (let s = 0; s < shoppingListArray.length; s++){
            let currentItem = shoppingListArray[s]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
        
            appendItems(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = `<p style="color: white">No items here yet...</p>`
    }


})

addBtn.addEventListener("click", function(){
    let itemValue = inputEl.value
    push(itemsInDB, itemValue)
    clearInput()
})

document.addEventListener('DOMContentLoaded', function() {
    let shoppingIcon = document.getElementById('shopping');

    // Add a click event listener to trigger the animation
    addBtn.addEventListener('click', function() {
        // Disable the animation
        shoppingIcon.style.animation = 'none';

        // Force a reflow
        void shoppingIcon.offsetWidth;

        // Enable the animation again
        shoppingIcon.style.animation = 'jump-shaking 1s ease';
    });
});

function clearShoppingList(){
    shoppingListEl.innerHTML = ""
}

function clearInput(){
    inputEl.value = ""
}

function appendItems(item){

    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let exactLocationInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationInDB)
    })
    shoppingListEl.append(newEl)
}

darkModeBtn.addEventListener("click", function(){
    const body = document.body;
    const contentContainer = document.querySelector(".content")
    const shoppingColor = document.querySelector("#shopping")
    const icon = document.getElementById("icon")
    body.classList.toggle("light")
    body.classList.toggle("dark")

    contentContainer.classList.toggle("dark")
    contentContainer.classList.toggle("light-mode")
    shoppingColor.classList.toggle("dark-shopping")

    icon.classList.toggle("fa-sun");
    icon.classList.toggle("fa-moon");
})


