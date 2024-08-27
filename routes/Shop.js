const { Router } = require("express");
const router = Router();
const Product = require("../models/product")
const Menu = require("../models/menu")
router.get("/", async (req, res) => {
    try {
        const product = await Product.find();
        const menu = await Menu.find();
        res.render("shop", { title: "Shop", activeShop: true, product , menu });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;