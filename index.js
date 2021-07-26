const prompt = require("prompt-sync")();
const { Pool } = require('pg');
const checkOut1 = require('./checkOut.js');
const removeFromCart1 = require('./removeFromCart.js');
const addToCart1 = require('./addToCart.js');
const itemView1 = require('./itemView.js');
let { userItemList } = require('./viewCart.js');
const viewCart1 = require('./viewCart.js');
const { Login, SignUp, myCart, purchased } = require('./db.js');

let option;
while (1) {
    let type = prompt("Choose login(0) or signup(1) ");
    if (type == 0 || type == "login") {
        if (Login() == false) continue;
        else myCart();
    } else if (type == 1 || type == "signup") {
        SignUp();
    } else continue;
    while (1) {
        console.log("Please! choose your option:-")
        option = prompt(`BrowseItems(0) AddToMyCart(1) ViewMyCart(2) RemoveItemFromCart(3) ProceedToCheckout(4) Logout(5)`);
        if (option == 0) {
            console.log('Here are the list of items available for you!');
            itemView1.view();
            continue;
        } else if (option == 1) {
            addToCart1.addToCart();
            continue;
        } else if (option == 2) {
            viewCart1.viewCart();
            continue;
        } else if (option == 3) {
            removeFromCart1.removeFromCart();
            continue;
        } else if (option == 4) {

            let val = checkOut1.checkOut();
            if (val != 0) {
                let date = new Date();
                purchased();
                console.log(`Thank you! for shopping with us.Your payment of ${val}rs done at ${date}`);
                console.log(`Still you could buy more items!`);
                userItemList = [];
                continue;
            } else {
                console.log("You could  browse our items.");
                itemView1.view();
                continue;

            }

        } else if (option == 5) {
            console.log(`Thank you!  for visiting our site.`);
            break;
        } else console.log("Wrong Position Try agin!");
    }
}