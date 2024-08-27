const { Schema, model } = require("mongoose");
const slider = new Schema({
    comment: {
        type: String,
        require: true
    },    
    image: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    job: {
        type: String,
        require: true
    },
})
module.exports = model("Slider", slider);
