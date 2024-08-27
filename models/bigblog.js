const { Schema, model } = require("mongoose");
const bigblog = new Schema({
    blogname: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = model("Bigblog", bigblog);
