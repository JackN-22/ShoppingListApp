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

    newEl.addEventListener("click", function(){
        let exactLocationInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationInDB)
    })

    shoppingListEl.append(newEl)

}