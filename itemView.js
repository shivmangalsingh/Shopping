const { itemList } = require('./data.js');

function view() {
    itemList.forEach(item => {
        console.log(item);
    });
}
module.exports.view = view;