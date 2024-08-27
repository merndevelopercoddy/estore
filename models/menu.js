const { model, Schema } = require("mongoose");
const menu = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  sahifa: {
    type: String,
    required: true
  }
});

module.exports = model("Menu", menu);