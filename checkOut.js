const prompt = require("prompt-sync")();
let { userItemList, viewCart } = require('./viewCart.js');
const { itemList } = require('./data.js');


function checkOut() {
    if (userItemList.length == 0) {
        console.log("You did not have any item in your Cart! First add then comeback.");
        return 0;
    }
    console.log("You have choosen this list of item:-");
    viewCart();
    let totalPrice = 0;
    for (let i = 0; i < userItemList.length; i++) {

        totalPrice += itemList[userItemList[i]].price;
    }
    console.log(`Total Price You have to pay is: ${totalPrice}`);
    console.log(`Please!Choose index: Buy(0) or Cancel(1) `);
    let id = prompt();
    if (id == "Buy" || id == 0) {
        return totalPrice;
    } else return 0;
}
module.exports.checkOut = checkOut;