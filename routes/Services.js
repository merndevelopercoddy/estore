const { Router } = require("express");
const router = Router();
const Hero = require("../models/hero")
const Shop = require("../models/shop");
const Info = require("../models/info");
const Comfort = require("../models/comfort");
const Slider = require("../models/slider")
const Menu = require("../models/menu")

router.get("/", async (req, res) => {
    try {
        const shop = await Shop.find();
        const hero = await Hero.find();
        const info = await Info.find();
        const slider = await Slider.find();
        const menu = await Menu.find();
        const comfort = await Comfort.find();
        res.render("services", { title: "Services", activeServices: true, hero, shop, info, comfort, slider,menu});
    } catch (error) {

    }
});

module.exports = router;