const { Schema, model } = require("mongoose");
const hero = new Schema({
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
    buttonname2: {
        type: String,
        require: true
    },
    buttonaddress2: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
})
module.exports = model("Hero", hero);
