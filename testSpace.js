let snapshot = {
    1: "Fruit",
    2: "Vegetables",
    3: "Spaghetti",
    4: "Milk",
    5: "Eggs"
}


let snapshot2 = {
    1: ["Apple", "FruitAndVeg"],
    2: ["Potato", "FruitAndVeg"],
    3: ["Spaghetti", "Carbs"],
    4: ["Milk", "Dairy"],
    5: ["Eggs", "Protein"]
}



let shoppingListArray = Object.entries(snapshot);


// Array = [[], [], [],]

shoppingList = Object.entries(snapshot2);

shoppingListArray.forEach((i) => appendItems(i));

function appendItems(item){

    let itemID = item[0]
    let itemValue = item[1]
    
    console.log(`Appended item ${itemID}: "${itemValue}"`)
}

// Beyond this point was just to illustrate some new stuff for you, not relevant to your project as such!

let shoppingItemNames;

let FruitAndVeg;

let Carbs;

let Dairy;

let Protein;

shoppingItemNames = shoppingListArray.map(e => e[1])

shoppingItemNames = shoppingListArray.map(e => {
    return e[1]
})

FruitAndVeg = shoppingList.filter(i => i[1][1] === "FruitAndVeg").map(s => s[1][0]);

Carbs = shoppingList.filter(i => i[1][1] === "Carbs").map(s => s[1][0])

console.log(shoppingItemNames);

console.log(`Fruit and Vegetables: ${FruitAndVeg.join(", ")}`);

console.log(`Carbohydrates: ${Carbs.join(", ")}`)

function add(a, b){
    return a + b
}

const add2 = (a, b) => a + b; 

const add3 = function(a, b) {
    return a + b;
}


let Arr = [1, 2, 3, 4]

console.log(Arr.map(i => i+1))