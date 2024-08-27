const { Schema, model } = require("mongoose");
const about = new Schema({
    job: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    nameurl: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },

})
module.exports = model("About", about);
