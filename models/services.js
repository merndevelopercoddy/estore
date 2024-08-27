const { Schema, model } = require("mongoose");
const services = new Schema({
    icon: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },

})
module.exports = model("Services", services);
