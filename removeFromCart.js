const prompt = require("prompt-sync")();
const chalk = require("chalk");
const { update } = require('./db.js');

function removeFromCart(userItemList) {
    if (userItemList.length == 0) {
        console.log(chalk.red("Your Cart is empty! Firt add something!"));
        return;
    }
    let id = new Array();
    id = prompt("Enter productId  to remove or write " + chalk.red.bold("'Done'") + "if you done with it ").split(' ');
    console.log(userItemList);
    while (id[0] != "Done") {
        let rItem = -1;
        for (let i = 0; i < id.length; i++) {

            rItem = userItemList.indexOf(id[i]);
            if (rItem != -1) { userItemList.splice(rItem, 1); } else {
                console.log(`Item of this productID- ${id[i]} ` + chalk.red.underline(`does't exist in your Cart!`));
            }

        }
        id = prompt("Enter productId  to remove or write " + chalk.red.bold("'Done'") + "if you done with it ").split(' ');
    }
}
module.exports.removeFromCart = removeFromCart;