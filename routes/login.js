const { Router } = require("express");
const router = Router();
const User = require("../models/user")
const Menu = require("../models/menu")

router.get("/", async(req, res) => {
    try {
        const menu = await Menu.find();
        const error = req.flash("error")
        const success = req.flash("success");
        res.render("login", { title: "Login", error, success, menu});
    } catch (error) {
        console.log(error);
    }

});


router.post("/", async (req, res) => {
    try {
        const { login, parol } = req.body;
        const bazaUser = await User.findOne({ login })
        if (bazaUser) {
            if (await bazaUser.tekshirish(parol)) {
                req.session.user = bazaUser;
                req.session.tizimgakirildi = true
                req.session.save((err) => {
                    if (err) throw err;
                    res.redirect("/admin")
                });

            }
            else {
                req.flash("error", "parol xato");
                res.redirect("/login")
            }
        }
        else {
            req.flash("success", "Foydalanuvchi topilmadi")
            res.redirect("/login")
        }
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;