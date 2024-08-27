const { Router } = require("express");
const router = Router();
const Hero = require("../models/hero")
const Menu = require("../models/menu")

router.get("/", async (req, res) => {
    try {
        const menu = await Menu.find();
        const hero = await Hero.find();
        res.render("contact", { title: "Contact", activeContact: true, hero, menu});
    } catch (error) {

    }
});

module.exports = router;