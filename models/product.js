const { Schema, model } = require("mongoose");
const product = new Schema({
    image: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },    
    price: {
        type: String,
        require: true
    },
})
module.exports = model("Product", product);
