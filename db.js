const { Pool } = require('pg');
const prompt = require("prompt-sync")();
let { userItemList } = require('./addToCart.js');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'dcm123',
    port: 5432,
})
let user;

function Login() {
    user = prompt("Enter Username & Passward for login!").split(' ');
    if (user[0] != null && user[1] != null) {
        pool.query("SELECT name,password FROM Account where name =$1 and password = $2", [user[0], user[1]], (err, res) => {
            if (err != null) {
                console.log("Service Unavailable! Try again.");
            } else if (res.rowCount == 0) {
                console.log("You did not have account! Go for Signup");
                return false;
            } else {
                console.log(`You have successfuly login to your Account -> ${res.rows.name} !`);
                return true;
            }

        });
    } else console.log("Sorry! something is wrong. Try Again!");
}

function SignUp() {

    user = prompt("Enter Username & Passward for signup! ").split(' ');
    if (user[0] != null && user[1] != null) {
        let a = user[0];
        let b = user[1];
        pool.query("INSERT INTO Account(name,password) values($1,$2)", [a, b], (err, res) => {
            if (err) {
                console.log("Sorry! something is wrong. Try Again!");
                return 0;
            } else { console.log("Your account has been created!"); }
        });
    } else { console.log("Please enter both field!"); }

}

function myCart() {
    pool.query('SELECT item FROM Account where name =$1 and password =$2', [user[0], user[1]], (err, res) => {
        if (err) console.log(err);
        else {
            if (res.rowCount)
                userItemList = res.rows.slice();

        }
    });

}

function update() {
    pool.query('UPDATE Account SET item = $1 where name =$2 and password =$3', [userItemList, user[0], user[1]], (err, res) => {
        if (err) console.log("Error while updating the data");
        else return true;
    });
}

function purchased() {
    pool.query('UPDATE Account SET item =item || $1 where name = $2 and password = $3', [userItemList, user[0], user[1]], (err, res) => {
        if (err) console.log("Error while adding to history!");
    });
}
module.exports.Login = Login;
module.exports.SignUp = SignUp;
module.exports.myCart = myCart;
module.exports.update = update;
module.exports.purchased = purchased;