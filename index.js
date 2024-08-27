const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotEnv = require("dotenv");
dotEnv.config();
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access")
const Handlebars = require("handlebars")
const URL = process.env.URL;
const app = express();
const flash = require("connect-flash")
const path = require("path")
const session = require("express-session");
const mbSession = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const PORT = process.env.PORT;
const Menu = require("./models/menu");
const exphbs = require("express-handlebars");

async function start() {
    try {
        await mongoose.connect(URL);
        app.listen(PORT, () => {
            console.log(`Server ${PORT} portda ishladi , tekshirildi`);
        });
    } catch (error) {
        console.log(error)
    }
}
start();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        incr: function (index) { return index + 1 },
        katta: function (index) { return index >= 4 },
        sana:function(dateString) {
            const date = new Date(dateString);
            const monthNames = [
                "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
                "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
            ];
            const day = date.getDate();
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            return `${month} ${day} ${year}`;
        },
        kopaytirish:function(a,b){
            return a * b;
        },
        narx:function formatPrice(price) {
            return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
    }
});
const store = new mbSession({
    collection: 'sessions',
    uri: URL
});
app.use(session({
    secret: 'maxfiy kalit',
    resave: false,
    saveUninitialized: false,
    store
}));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "page");
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(flash())
app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/admin/hero', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/info', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/shop', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/chair', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/register', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/why', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/services', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/help', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/slider', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/blog', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/comfort', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/bigblog', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/about', express.static(path.join(__dirname, 'public', 'admin')))
app.use('/admin/menu', express.static(path.join(__dirname,"public","admin")));

app.use("/admin", require("./routes/Admin"));
app.use("/login", require("./routes/login"));
app.use("/shop", require("./routes/Shop"));
app.use("/about", require("./routes/About"));
app.use("/services", require("./routes/Services"));
app.use("/blog", require("./routes/Blog"));
app.use("/contact", require("./routes/Contact"));
app.use("/cart", require("./routes/Cart"));
app.use("/checkout", require("./routes/Checkout"));
app.use("/thankyou", require("./routes/ThankYou"));
app.use("/", require("./routes/Home"));



// app.use(async (req, res) => {
//     const menu = await Menu.find();
//     res.status(404).render("notfound", { title: "Sahifa topilmadi", menu });
// });

