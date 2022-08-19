const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// } 

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    itemId: Number,
    content: String,
    status: Boolean,
});

var ItemModel = mongoose.model('ItemModel',ItemSchema);

module.exports = ItemModel;