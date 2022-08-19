
var express = require('express');
var bodyParser = require("body-parser");

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var itemModel = require('./item');

mongoose.connect("mongodb://localhost:27017/todoTSH");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));



var app = express();


app.listen(3000, function () {

    console.log("todoTSH server is listening on port 3000");

});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define REST API
app.get("/items", function (req, res) {
    var query = {};
    itemModel.find(query, null, { sort: 'itemId' }, function (err, items) {
        console.log(items.length);
        res.send(items);
    })
})
app.post("/additem", async function (req, res) {
    console.log(req.body);
    let item = req.body;
    try {
        var p = new itemModel({
            itemId: item.itemId,
            content: item.content,
            status: item.status,
        });
        result = await p.save();
        res.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
//return updated document 
app.post("/updateitem", async function (req, res) {
    console.log(req.body);
    let item = req.body;

    itemModel.findOneAndUpdate(
        {
            'itemId': item.itemId
        },
        item,
        {
            upsert: false
        },
        function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send(doc);
        });
})


app.delete("/item/:itemId", async function (req, res) {
    console.log(req.params.itemId);
    let itemId = req.params.itemId;
    try {
        var result = await itemModel.deleteOne({ 'itemId': itemId });
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }


})
