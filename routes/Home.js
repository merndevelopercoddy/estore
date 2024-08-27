const { Router } = require("express");
const router = Router();
const Hero = require("../models/hero")
const Info = require("../models/info");
const Shop = require("../models/shop");
const Chair = require("../models/chair");
const Why = require("../models/why");
const Services = require("../models/services");
const Help = require("../models/help");
const Slider = require("../models/slider");
const Blog = require("../models/blog");
const Menu = require("../models/menu");
router.get("/", async (req, res) => {
    try {
        const hero = await Hero.find();
        const info = await Info.find();
        const shop = await Shop.find();
        const chair = await Chair.find();
        const why = await Why.find();
        const services = await Services.find();
        const help = await Help.find();
        const slider = await Slider.find();
        const blog = await Blog.find();
        const menu = await Menu.find();
        res.render("index", { title: "Home", activeHome: true, hero, info, shop, chair, why, services, help, slider, blog, menu });
    } catch (error) {

    }
});

router.get('/:url', async (req, res) => {
    const { url } = req.params;
    try {
        const result = await Menu.find()
        const menu = await Menu.findOne({ url });
        if (!menu) {
            return res.status(404).render('notfound');
        }
        res.render(menu.sahifa, { title: menu.name, menu: result }); // Assuming `sahifa` is the template name
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;