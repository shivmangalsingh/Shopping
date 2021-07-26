const { itemList } = require('./data.js');
let { userItemList } = require('./addToCart.js');


function viewCart() {
    if (userItemList.length == 0) console.log("Your Cart is empty!");
    else {
        for (let i = 0; i < userItemList.length; i++) {

            console.log(`ItemName- ${itemList[userItemList[i]].name}  pricePerItem-${itemList[userItemList[i]].price} productId-${userItemList[i]}`);

        }
    }

}
module.exports.userItemList = userItemList;
module.exports.viewCart = viewCart;