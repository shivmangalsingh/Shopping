const prompt = require("prompt-sync")();
const chalk = require("chalk");
//const { itemList } = require('./data.js');
//const { update } = require('./db.js');
//let userItemList = [];

function addToCart(userItemList) {
    let id = new Array();
    id = prompt("Enter productId of items by " + chalk.black.underline("space seprated") + " ").split(' ');
    for (let i = 0; i < id.length; i++) {
        userItemList.push(id[i]);
    }
    console.log(chalk.green("You have successfully added item to your cart!"));
}

//function userItemListUpdate(item) { userItemList.push(item); }

module.exports.addToCart = addToCart;
//module.exports.userItemList = userItemList;