const { Schema, model } = require("mongoose");
const shop = new Schema({
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
module.exports = model("Shop", shop);
