const { Schema, model } = require("mongoose");
const info = new Schema({
    title: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },    
    buttonname: {
        type: String,
        require: true
    },
    buttonaddress: {
        type: String,
        require: true
    },
})
module.exports = model("Info", info);
