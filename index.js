const prompt = require("prompt-sync")();
const chalk = require("chalk");
const { Pool } = require('pg');
const checkOut1 = require('./checkOut.js');
const removeFromCart1 = require('./removeFromCart.js');
const addToCart1 = require('./addToCart.js');
const itemView1 = require('./itemView.js');
const { viewCart } = require('./viewCart.js');
const { Login, SignUp, myCart, purchased, update } = require('./db.js');
let option;
let userItemList = [];
let history = [];

function loop(userItemList) {
    console.log("Please! choose your option:-");
    option = prompt(`BrowseItems(0) AddToMyCart(1) ViewMyCart(2) RemoveItemFromCart(3) ProceedToCheckout(4) PurchasedHistory(5) Logout(6) `);
    if (option == 0) {
        console.log('Here are the list of items available for you!');
        itemView1.view();
        return 0;
    } else if (option == 1) {
        addToCart1.addToCart(userItemList);
    } else if (option == 2) {
        viewCart(userItemList);
        return 0;
    } else if (option == 3) {
        removeFromCart1.removeFromCart(userItemList);
        return 0;
    } else if (option == 4) {
        let val = checkOut1.checkOut(userItemList);
        if (val != 0) {
            let date = new Date();
            let userItemList1 = userItemList.slice();
            purchased(userItemList1);
            console.log(chalk.green(`Thank you! for shopping with us.Your payment of ${val} Rs. done at ${date}`));
            userItemList = [];
            update(userItemList);
            return 0;
        } else {
            console.log("Lets! try one more time!");
            update(userItemList);
            itemView1.view();
            return 0;
        }
    } else if (option == 5) {
        if (history.length >= 1) { itemView1.view(history); } else { console.log("You have't yet purchased anything!"); }
        return 0;
    } else if (option == 6) {
        if (userItemList.length) {
            console.log('Please Wait!Let me upload your data!');
        } else {
            console.log("Please wait! Let me logout you!");
        }
        return 1;

    } else { console.log("Wrong Position Try agin!"); return 0; }
}

(async function start() {
    let tryAgain = 1;
    let type = prompt("Choose " + chalk.green("login(0) ") + "or" + chalk.green(" signup(1)") + " or " + chalk.red("exit(2)"));
    while (tryAgain) {
        userItemList = [];
        history = [];
        tryAgain = 0;
        if (type == 0) {
            try {
                let data = await Login();
                console.log(data);
                let oldData = await myCart();
                if (oldData != "empty") {
                    if (oldData.item != null) {
                        let temp = oldData.item;
                        userItemList = temp.map((c) => { return c.toString() });
                    }
                    if (oldData.purchased != null) {
                        let temp = oldData.purchased;
                        history = temp.map((c) => { return c.toString() });
                    }
                }
                timeId = setInterval(() => {
                    let values = loop(userItemList, history);
                    if (values) {
                        tryAgain = 1;
                        clearInterval(timeId);

                    }
                }, 1500);

            } catch (e) {
                if (e == "tryAgain") tryAgain = 1;
                else console.log(e);
            }
        } else if (type == 1) {
            try {
                let data = await SignUp();
                console.log(data);
                time = setInterval(() => {
                    let values = loop(userItemList, history);
                    if (values) {
                        tryAgain = 1;
                        clearInterval(time);

                    }
                }, 1000);
            } catch (e) {
                if (e == "tryAgain") tryAgain = 1;
                else
                    console.log(e);
            }
        } else if (type == 2) break;
        if (tryAgain) { let type = prompt("Choose " + chalk.green("login(0) ") + "or" + chalk.green(" signup(1)") + " or " + chalk.red("exit(2)")); }
    }
})();