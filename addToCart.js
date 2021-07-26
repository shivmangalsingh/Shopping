const prompt = require("prompt-sync")();
//const { itemList } = require('./data.js');
const { update } = require('./db.js');
let userItemList = [];

function addToCart() {
    let id = new Array();
    id = prompt("Enter productId  of items by space seprated ").split(' ');
    for (let i = 0; i < id.length; i++) {
        userItemList.push(id[i]);
    }
    if (update()) {
        console.log("You have successfuly added items in your cart!");
    }
}

module.exports.addToCart = addToCart;
module.exports.userItemList = userItemList;