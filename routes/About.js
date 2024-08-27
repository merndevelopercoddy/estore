const { Router } = require("express");
const router = Router();
const Hero = require("../models/hero")
const Why = require("../models/why")
const Services = require("../models/services")
const About = require("../models/about")
const Slider = require("../models/slider")
const Menu = require("../models/menu")

router.get("/", async (req, res) => {
    try {
        const hero = await Hero.find();
        const why = await Why.find();
        const services = await Services.find();
        const about = await About.find();
        const slider = await Slider.find();
        const menu = await Menu.find();
        res.render("about", { title: "About", activeAbout: true, hero, why, services, about, slider, menu});
    } catch (error) {

    }
});

module.exports = router;