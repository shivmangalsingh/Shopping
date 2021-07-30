const prompt = require("prompt-sync")();
const chalk = require("chalk");

function addToCart(userItemList) {
    let id = new Array();
    id = prompt("Enter productId of items by " + chalk.black.underline("space seprated") + " ").split(' ');
    for (let i = 0; i < id.length; i++) {
        userItemList.push(id[i]);
    }
    console.log(chalk.green("You have successfully added item to your cart!"));
}
module.exports.addToCart = addToCart;