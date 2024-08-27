const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs")
const userSchema = new Schema({
    login: {
        type: String,
        require: true,
        unique: true
    },
    parol: {
        type: String,
        require: true
    },
})
userSchema.methods.tekshirish = async function (parol) {
    return await bcrypt.compare(parol, this.parol)
}
module.exports = model("User", userSchema);
