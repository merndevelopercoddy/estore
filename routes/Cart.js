const { Router } = require("express");
const router = Router();
const Menu = require("../models/menu")
const Cart = require("../models/cart");
const Product = require("../models/product");
const mongoose = require("mongoose");
router.get("/", async (req, res) => {
    try {
        
        const menu = await Menu.find();
        const product = await Product.find();
        const cart = await Cart.find().populate('items.product');
        console.log(cart)
        res.render("cart", { title: "Cart", menu, cart, product });

    } catch (error) {
        console.log(error);

    }
});
router.post('/add', async (req, res) => {
    try {
        const { productId } = req.body;
        let cart = await Cart.findOne(); // Modify this line based on how you retrieve the cart (e.g., by user)

        if (!cart) {
            // If no cart exists, create a new one
            cart = new Cart();
        }

        // Find the item in the cart that matches the productId
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // If the item exists, increment its quantity
            cart.items[itemIndex].quantity += 1;
        } else {
            // If the item does not exist, add a new item
            cart.items.push({ product: new mongoose.Types.ObjectId(productId), quantity: 1 });
        }

        // Calculate the total price
        let total = 0;
        for (let i = 0; i < cart.items.length; i++) {
            const item = cart.items[i];
            const product = await mongoose.model('Product').findById(item.product);
            if (product) {
                total += product.price * item.quantity;
            }
        }
        cart.totalPrice = total;

        // Save the cart
        await cart.save();

        res.redirect("/cart");
    } catch (err) {
        console.error(err);
    }
});


router.post('/update', async (req, res) => {
    const { productId, action } = req.body;

    try {
        let cart = await Cart.findOne();

        const productIndex = cart.items.findIndex(p => p.product.toString() === productId);

        if (productIndex > -1) {
            if (action === 'increment') {
                cart.items[productIndex].quantity += 1;
            } else if (action === 'decrement' && cart.items[productIndex].quantity > 1) {
                cart.items[productIndex].quantity -= 1;
            }

            // Recalculate total
            let newTotal = 0;
            for (let item of cart.items) {
                const product = await Product.findById(item.product);
                newTotal += product.price * item.quantity;
            }
            cart.totalPrice = newTotal;

            await cart.save();
        }
        res.redirect("/cart");
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;