const prompt = require("prompt-sync")();
const chalk = require("chalk");
let { viewCart } = require('./viewCart.js');
const { itemList } = require('./data.js');


function checkOut(userItemList) {
    if (userItemList.length == 0) {
        console.log(chalk.red("You did not have any item in your Cart! First add then comeback."));
        return 0;
    }

    viewCart(userItemList);
    let totalPrice = 0;
    for (let i = 0; i < userItemList.length; i++) {

        totalPrice += itemList[userItemList[i]].price;
    }
    console.log(chalk.yellow.underline.green(`Total Price You have to pay is: ${totalPrice} Rs.`));
    console.log("Please!Choose index:" + chalk.blue(" Buy(0) ") + "or " + chalk.red("Cancel(1) "));
    let id = prompt();
    if (id == "Buy" || id == 0) {
        return totalPrice;
    } else return 0;
}
module.exports.checkOut = checkOut;