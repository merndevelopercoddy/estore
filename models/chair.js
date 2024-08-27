const { Schema, model } = require("mongoose");
const chair = new Schema({
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
    image: {
        type: String,
        require: true
    },
})
module.exports = model("Chair", chair);
