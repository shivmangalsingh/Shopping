const { itemList } = require('./data.js');
const chalk = require("chalk");

function view(data = []) {
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) console.log(itemList[data[i]]);
    } else {
        itemList.forEach(item => {
            console.log(item);
        });
    }
}
module.exports.view = view;