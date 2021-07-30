const { Pool } = require('pg');
const prompt = require("prompt-sync")();
const chalk = require("chalk");
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'dcm123',
    port: 5432,
})
let user;

function Login() {
    return new Promise((resolve, reject) => {
        user = prompt("Enter " + chalk.underline("Username") + " & " + chalk.underline("Passward") + " for" + chalk.green(" login!")).split(' ');
        if (user[0] == null || user[1] == null) {
            console.log("Wrong Input Try Again!");
            reject("tryAgain");
        }
        pool.query("SELECT name,password FROM Account where name =$1 and password = $2", [user[0], user[1]], (err, res) => {
            if (err) {
                console.log(chalk.red("Service Unavailable! Try again."));
                reject(err);
            } else {
                if (res.rowCount == 0) {
                    console.log(chalk.red("Sorry! you did not have account.Go for Sign-UP"));
                    reject("tryAgain");

                } else { resolve(chalk.green("You have successfuly login to your Account!")); }
            }
        });
    });
}

function SignUp() {
    return new Promise((resolve, reject) => {
        user = prompt("Enter " + chalk.underline("Username") + " & " + chalk.underline("Passward") + " for" + chalk.green(" signup!")).split(' ');
        if (user[0] == null || user[1] == null) {
            console.log(chalk.red("Please! enter both field, Try Again!"));
            reject("tryAgain");
        }
        pool.query("INSERT INTO Account(name,password) values($1,$2)", [user[0], user[1]], (err, res) => {
            if (err) {
                console.log(chalk.red("Sorry! something is wrong. Try Again!"));
                reject(err);
            } else resolve(chalk.green("Your account has been created!"));
        });

    });
}

function myCart() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT item,purchased FROM Account where name =$1 and password =$2', [user[0], user[1]], (err, res) => {
            if (err) reject(err);
            else {
                console.log("Data fetched successfully!");
                if (res.rowCount)
                    resolve(res.rows[0]);
                else resolve("empty");


            }
        });

    });
}

function update(item) {
    pool.query('UPDATE Account SET item = $1 where name =$2 and password =$3', [item, user[0], user[1]], (err, res) => {
        if (err) return err;
        else return res;
    });
}

function purchased(userItemList1) {
    pool.query('UPDATE Account SET purchased =purchased || $1 where name = $2 and password = $3', [userItemList1, user[0], user[1]], (err, res) => {
        if (err) console.log("Error while adding to history!");
    });
}
module.exports.Login = Login;
module.exports.SignUp = SignUp;
module.exports.myCart = myCart;
module.exports.update = update;
module.exports.purchased = purchased;