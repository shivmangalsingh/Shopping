const prompt = require("prompt-sync")();
let { userItemList } = require('./viewCart.js');
const { update } = require('./db.js');

function removeFromCart() {
    if (userItemList.length == 0) {
        console.log("Your Cart is empty!");
        return;
    }
    let id = new Array();
    id = prompt("Enter productId  to remove or write 'Done' if you done with it ").split(' ');
    while (id[0] != "Done") {
        for (let i = 0; i < id.length; i++) {
            let rItem = -1;
            rItem = userItemList.indexOf(id[i]);
            if (rItem != -1) userItemList.splice(rItem, 1);
            else console.log(`Item of this productID- ${id[i]} does't exist in your Cart!`);

        }
        if (update()) console.log("We have successfuly removed mention item/quantity from your  cart!");

        id = prompt("Enter productId  to remove or write 'Done' if you done with it ").split(' ');
    }
}
module.exports.removeFromCart = removeFromCart;