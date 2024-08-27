const { Router } = require("express");
const router = Router();
const Menu = require("../models/menu");
router.get("/", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.render("thank-you", { title: "Thank you" });
  } catch (error) {
    console.log(error);
    
  }
});

module.exports = router;
