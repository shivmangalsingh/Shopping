const { itemList } = require('./data.js');
const chalk = require("chalk");
//let { userItemList } = require('./addToCart.js');


function viewCart(userItemList) {
    if (userItemList.length == 0) {
        console.log(chalk.red("Your Cart is empty!"));

    } else {

        console.log("List of item in your Cart ----->!");
        for (let i = 0; i < userItemList.length; i++) {

            console.log(`ItemName- ${itemList[userItemList[i]].name}  pricePerItem-${itemList[userItemList[i]].price} productId-${userItemList[i]}`);

        }
    }

}
module.exports.viewCart = viewCart;