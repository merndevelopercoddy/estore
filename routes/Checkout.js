const { Router } = require("express");
const router = Router();
const Menu = require("../models/menu")
router.get("/", async(req, res) => {
    try {
    const menu = await Menu.find();
    res.render("checkout", { title: "Checkout",activeAbout: true, MENU});
    } catch (error) {
        console.log();
    }
});

module.exports = router;