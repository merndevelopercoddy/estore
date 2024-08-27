const { Router } = require("express");
const router = Router();
const Hero = require("../models/hero")
const BigBlog = require("../models/bigblog")
const Slider = require("../models/slider")
const Menu = require("../models/menu")
router.get("/", async (req, res) => {
    try {
        const hero = await Hero.find();
        const bigblog = await BigBlog.find();
        const slider = await Slider.find();
        const menu = await Menu.find();
        res.render("blog", { title: "Blog", activeBlog: true, hero, bigblog, slider, menu});
    } catch (error) {

    }
});

module.exports = router;