const { Schema, model } = require("mongoose");
const why = new Schema({
    title: {
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
module.exports = model("Why", why);
