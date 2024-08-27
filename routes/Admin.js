const { Router } = require("express");
const router = Router();
const path = require("path");
const fs = require('fs').promises;
const multer = require("multer");
const bcrypt = require("bcryptjs");
const Hero = require("../models/hero")
const User = require("../models/user");
const Info = require("../models/info");
const Shop = require("../models/shop");
const Chair = require("../models/chair");
const Why = require("../models/why");
const Services = require("../models/services");
const Help = require("../models/help");
const Slider = require("../models/slider");
const Blog = require("../models/blog");
const Product = require("../models/product");
const Comfort = require("../models/comfort");
const BigBlog = require("../models/bigblog");
const About = require("../models/about");
const Menu = require("../models/menu");
const faylHero = require("../middlewere/faylHero");
const faylShop = require("../middlewere/faylShop");
const faylChair = require("../middlewere/faylChair");
const verification = require("../middlewere/verification");
const faylWhy = require("../middlewere/faylWhy");
const faylHelp = require("../middlewere/faylHelp");
const faylSlider = require("../middlewere/faylSlider");
const faylBlog = require("../middlewere/faylBlog");
const faylProduct = require("../middlewere/faylProduct");
const faylBigblog = require("../middlewere/faylBigblog");
const faylAbout = require("../middlewere/faylAbout");
const { title } = require("process");
const { error } = require("console");
router.get("/", verification, (req, res) => {
  res.render("admin", { title: "Admin", layout: "admin" });
});

//start hero
router.get("/hero", verification, async (req, res) => {
  const hero = await Hero.find();
  console.log(hero);
  res.render("adminadd/Hero/adminHero", { layout: "admin", hero });
});

router.post("/hero/add", verification, faylHero, async (req, res) => {
  const hero = new Hero({
    comment: req.body.comment,
    buttonname: req.body.buttonname,
    buttonaddress: req.body.buttonaddress,
    buttonname2: req.body.buttonname2,
    buttonaddress2: req.body.buttonaddress2,
    image: req.file.filename,
  });

  await hero.save();
  res.redirect("/admin/hero");
});
router.get("/hero/:id", verification, async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    res.render("adminadd/Hero/adminHeaderEdit", { layout: "admin", hero });
  } catch (error) {
    console.log(error);
  }
});

router.post("/hero/edit", verification, faylHero, async (req, res) => {
  try {
    const eskiRasm = path.join(__dirname, '../images/hero', req.body.eskirasm);
    fs.unlink(eskiRasm, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (req.file) {
      req.body.image = req.file.filename;
    }

    await Hero.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/hero");
  } catch (error) {
    console.log(error);
  }
});

router.post("/hero/delete", verification, async (req, res) => {
  try {
    await Hero.findByIdAndDelete(req.body.id);
    res.redirect("/admin/hero");
  } catch (error) {
    console.log(error);
  }
});
// hero end


// User start
router.get("/register", async (req, res) => {
  const error = req.flash("error")
  const success = req.flash("success");
  try {
    const foy = await User.find();
    const user = foy.sort((a, b) => a.login.localeCompare(b.login));
    res.render('adminadd/adminRegister', { layout: "admin", success, error, user });

  } catch (error) {
    console.log(error)
  }
});
router.post("/register/add", async (req, res) => {
  try {
    const { login, parol } = req.body;
    const alreadyUser = await User.findOne({ login })
    if (alreadyUser) {
      req.flash("error", "Bunday foydalanuvchi mavjud");
      res.redirect("/admin/register");
    } else {
      const hashPassword = await bcrypt.hash(parol, 10)
      const user = new User({
        login: login,
        parol: hashPassword
      });
      await user.save()
      req.flash("success", "Foydalanuvchi qo'shildi");
      res.redirect("/admin/register");
    }
  } catch (error) {
    console.log(error)
  }
});

router.get("/register/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("adminadd/adminRegisterEdit", { layout: "admin", user });
  } catch (error) {
    console.log(error)
  }
});
router.post("/register/edit", async (req, res) => {
  try {
    const { parol, id } = req.body;
    if (parol == '') {
      req.flash("error", "Parolda o'zgarish bo'lmadi");
      res.redirect("/admin/register");
    }
    else {
      const hashPassword = await bcrypt.hash(parol, 10)
      req.body.parol = hashPassword;
      await User.findByIdAndUpdate(id, req.body)
      req.flash("success", "Parol o'zgartirildi");
      res.redirect("/admin/register");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/register/delete", verification, async (req, res) => {
  try {
    if (req.session.user._id == req.body.id) {
      req.flash("error", "O'chirib bo'lmaydi");
      res.redirect("/admin/register");
    }
    else {
      await User.findByIdAndDelete(req.body.id);
      req.flash("success", "Foydalanuvchi o'chirildi");
      res.redirect("/admin/register");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", async (req, res) => {
  try {
    await req.session.destroy(() => {
      res.redirect("/login");
    });
  } catch (error) {
    console.log(error);
  }
})
// User end

// info start
router.get("/info", verification, async (req, res) => {
  const info = await Info.find();
  console.log(info);
  res.render("adminadd/Info/adminInfo", { layout: "admin", info });
});

router.post("/info/add", verification, async (req, res) => {
  const info = new Info({
    title: req.body.title,
    comment: req.body.comment,
    buttonname: req.body.buttonname,
    buttonaddress: req.body.buttonaddress,
  });

  await info.save();
  res.redirect("/admin/info");
});
router.get("/info/:id", verification, async (req, res) => {
  try {
    const info = await Info.findById(req.params.id);
    res.render("adminadd/Info/adminInfoEdit", { layout: "admin", info });
  } catch (error) {
    console.log(error);
  }
});

router.post("/info/edit", verification, async (req, res) => {
  try {

    await Info.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/info");
  } catch (error) {
    console.log(error);
  }
});

router.post("/info/delete", verification, async (req, res) => {
  try {
    await Info.findByIdAndDelete(req.body.id);
    res.redirect("/admin/info");
  } catch (error) {
    console.log(error);
  }
});
// info end
router.get("/shop", verification, async (req, res) => {
  const shop = await Shop.find();
  console.log(shop)
  res.render("adminadd/Shop/adminShop", { layout: "admin", shop });
});

router.post("/shop/add", verification, faylShop, async (req, res) => {
  const shop = new Shop({
    image: req.file.filename,
    name: req.body.name,
    price: req.body.price,
  });

  await shop.save();
  res.redirect("/admin/shop");
});
router.get("/shop/:id", verification, async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.render("adminadd/Shop/adminShopEdit", { layout: "admin", shop });
  } catch (error) {
    console.log(error);
  }
});

router.post("/shop/edit", verification, faylShop, async (req, res) => {
  try {
    const eskiRasm = path.join(__dirname, '../images/shop', req.body.eskirasm);
    fs.unlink(eskiRasm, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (req.file) {
      req.body.image = req.file.filename;
    }

    await Shop.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/shop");
  } catch (error) {
    console.log(error);
  }
});


router.post("/shop/delete", verification, async (req, res) => {
  try {
    await Shop.findByIdAndDelete(req.body.id);
    res.redirect("/admin/shop");
  } catch (error) {
    console.log(error);
  }
});

//shop start

//chair start
router.get("/chair", verification, async (req, res) => {
  const chair = await Chair.find();
  console.log(chair);
  res.render("adminadd/Chair/adminChair", { layout: "admin", chair });
});

router.post("/chair/add", verification, faylChair, async (req, res) => {
  const chair = new Chair({
    title: req.body.title,
    comment: req.body.comment,
    buttonname: req.body.buttonname,
    buttonaddress: req.body.buttonaddress,
    image: req.file.filename,
  });

  await chair.save();
  res.redirect("/admin/chair");
});
router.get("/chair/:id", verification, async (req, res) => {
  try {
    const chair = await Chair.findById(req.params.id);
    res.render("adminadd/Chair/adminChairEdit", { layout: "admin", chair });
  } catch (error) {
    console.log(error);
  }
});

router.post("/chair/edit", verification, faylChair, async (req, res) => {
  try {
    const eskiRasm = path.join(__dirname, '../images/chair', req.body.eskirasm);
    fs.unlink(eskiRasm, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (req.file) {
      req.body.image = req.file.filename;
    }

    await Chair.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/chair");
  } catch (error) {
    console.log(error);
  }
});

router.post("/chair/delete", verification, async (req, res) => {
  try {
    await Chair.findByIdAndDelete(req.body.id);
    res.redirect("/admin/chair");
  } catch (error) {
    console.log(error);
  }
});
//chair end

//why stert
router.get("/why", verification, async (req, res) => {
  const why = await Why.find();
  console.log(why)
  res.render("adminadd/Why/adminWhy", { layout: "admin", why });
});

router.post("/why/add", verification, faylWhy, async (req, res) => {
  const why = new Why({
    title: req.body.title,
    comment: req.body.comment,
    image: req.file.filename,
  });

  await why.save();
  res.redirect("/admin/why");
});
router.get("/why/:id", verification, async (req, res) => {
  try {
    const why = await Why.findById(req.params.id);
    res.render("adminadd/Why/adminWhyEdit", { layout: "admin", why });
  } catch (error) {
    console.log(error);
  }
});

router.post("/why/edit", verification, faylWhy, async (req, res) => {
  try {
    const eskiRasm = path.join(__dirname, '../images/why', req.body.eskirasm);
    fs.unlink(eskiRasm, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (req.file) {
      req.body.image = req.file.filename;
    }

    await Why.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/why");
  } catch (error) {
    console.log(error);
  }
});


router.post("/why/delete", verification, async (req, res) => {
  try {
    await Why.findByIdAndDelete(req.body.id);
    res.redirect("/admin/why");
  } catch (error) {
    console.log(error);
  }
});

//why end

//Services start
// router.get("/services",verification, async (req, res) => {
//   try {
//     const services = await Services.find();
//     const file = path.join(__dirname, "../", "public", "assets", "remixicon", "remixicon.glyph.json");
//     const icon = fs.readFile(file, (error, data) => {
//       if (error) {
//         console.error(error);
//         return;
//       }
//       try {
//         const ikonkalar = JSON.parse(data);
//         const ikonka_nomi = Object.keys(ikonkalar)
//         res.render("adminadd/icon/adminServices", { layout: "admin", ikonka_nomi, services })
//       } catch (error) {
//         console.log(error);
//       }
//     })

//   } catch (error) {
//     console.log(error);
//   }
// })
router.get("/services" , verification , async(req , res)=>{
  try {
    const services = await Services.find();
    const file = path.join(__dirname, "../", "public", "assets", "remixicon", "remixicon.glyph.json");
    const icon = await fs.readFile(file, "utf-8")
    const ikonkalar = JSON.parse(icon);
    const ikonka_nomi = Object.keys(ikonkalar)
    res.render("adminadd/Services/adminServices", { layout: "admin", services , ikonka_nomi });
  } catch (error) {
    console.log(error);
  }
});

router.post("/services/add", verification, async (req, res) => {
  const services = new Services({
    title: req.body.title,
    comment: req.body.comment,
    icon: req.body.icon,
    color: req.body.color,
  });

  await services.save();
  res.redirect("/admin/services");
});
router.get("/services/:id", verification, async (req, res) => {
  try {
    const services = await Services.findById(req.params.id);
    const file = path.join(__dirname, "../", "public", "assets", "remixicon", "remixicon.glyph.json");
    const icon = await fs.readFile(file, "utf-8")
    const ikonkalar = JSON.parse(icon);
    const ikonka_nomi = Object.keys(ikonkalar)
    res.render("adminadd/Services/adminServicesEdit", { layout: "admin", services, ikonka_nomi });
  } catch (error) {
    console.log(error);
  }
});

router.post("/services/edit", verification, async (req, res) => {
  try {

    await Services.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/services");
  } catch (error) {
    console.log(error);
  }
});

router.post("/services/delete", verification, async (req, res) => {
  try {
    await Services.findByIdAndDelete(req.body.id);
    res.redirect("/admin/services");
  } catch (error) {
    console.log(error);
  }
});
//Services end

//Help start

router.get("/help", verification, async (req, res) => {
  const help = await Help.find();
  console.log(help);
  res.render("adminadd/Help/adminHelp", { layout: "admin", help });
});

router.post("/help/add", verification, faylHelp, async (req, res) => {
  const help = new Help({
    title: req.body.title,
    comment: req.body.comment,
    buttonname: req.body.buttonname,
    buttonaddress: req.body.buttonaddress,
    image: req.file.filename,
  });

  await help.save();
  res.redirect("/admin/help");
});
router.get("/help/:id", verification, async (req, res) => {
  try {
    const help = await Help.findById(req.params.id);
    res.render("adminadd/Help/adminHelpEdit", { layout: "admin", help });
  } catch (error) {
    console.log(error);
  }
});

router.post("/help/edit", verification, faylHelp, async (req, res) => {
  try {
    const eskiRasm = path.join(__dirname, '../images/help', req.body.eskirasm);
    fs.unlink(eskiRasm, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (req.file) {
      req.body.image = req.file.filename;
    }

    await Help.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/help");
  } catch (error) {
    console.log(error);
  }
});

router.post("/help/delete", verification, async (req, res) => {
  try {
    await Help.findByIdAndDelete(req.body.id);
    res.redirect("/admin/help");
  } catch (error) {
    console.log(error);
  }
});

//Help end

//Slider start

router.get("/slider", verification, async (req, res) => {
  const slider = await Slider.find();
  console.log(slider)
  res.render("adminadd/Slider/adminSlider", { layout: "admin", slider });
});

router.post("/slider/add", verification, faylSlider, async (req, res) => {
  const slider = new Slider({
    comment: req.body.comment,
    image: req.file.filename,
    name: req.body.name,
    job: req.body.job,
  });

  await slider.save();
  res.redirect("/admin/slider");
});
router.get("/slider/:id", verification, async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    res.render("adminadd/Slider/adminSliderEdit", { layout: "admin", slider });
  } catch (error) {
    console.log(error);
  }
});

router.post("/slider/edit", verification, faylSlider, async (req, res) => {
  try {
    const eskiRasm = path.join(__dirname, '../images/slider', req.body.eskirasm);
    fs.unlink(eskiRasm, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (req.file) {
      req.body.image = req.file.filename;
    }

    await Slider.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/slider");
  } catch (error) {
    console.log(error);
  }
});


router.post("/slider/delete", verification, async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.body.id);
    res.redirect("/admin/slider");
  } catch (error) {
    console.log(error);
  }
});

//Slider end

//Blog start

router.get("/blog", verification, async (req, res) => {
  const blog = await Blog.find();
  console.log(blog)
  res.render("adminadd/Blog/adminBlog", { layout: "admin", blog });
});

router.post("/blog/add", verification, faylBlog, async (req, res) => {
  const blog = new Blog({
    blogname: req.body.blogname,
    image: req.file.filename,
    name: req.body.name,
    date: req.body.date,
  });

  await blog.save();
  res.redirect("/admin/blog");
});
router.get("/blog/:id", verification, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render("adminadd/Blog/adminBlogEdit", { layout: "admin", blog });
  } catch (error) {
    console.log(error);
  }
});

router.post("/blog/edit", verification, faylBlog, async (req, res) => {
  try {
    const eskiRasm = path.join(__dirname, '../images/blog', req.body.eskirasm);
    fs.unlink(eskiRasm, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (req.file) {
      req.body.image = req.file.filename;
    }

    await Blog.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/blog");
  } catch (error) {
    console.log(error);
  }
});


router.post("/blog/delete", verification, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.body.id);
    res.redirect("/admin/blog");
  } catch (error) {
    console.log(error);
  }
});

//Blog end

//Product start
router.get("/product", verification, async (req, res) => {
  const product = await Product.find();
  console.log(product)
  res.render("adminadd/Product/adminProduct", { layout: "admin", product });
});

router.post("/product/add", verification, faylProduct, async (req, res) => {
  const product = new Product({
    image: req.file.filename,
    name: req.body.name,
    price: req.body.price,
  });

  await product.save();
  res.redirect("/admin/product");
});
router.get("/product/:id", verification, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("adminadd/Product/adminProductEdit", { layout: "admin", product });
  } catch (error) {
    console.log(error);
  }
});

router.post("/product/edit", verification, faylProduct, async (req, res) => {
  try {
    const eskiRasm = path.join(__dirname, '../images/product', req.body.eskirasm);
    fs.unlink(eskiRasm, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (req.file) {
      req.body.image = req.file.filename;
    }

    await Product.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/product");
  } catch (error) {
    console.log(error);
  }
});
router.post("/product/delete", verification, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.redirect("/admin/product");
  } catch (error) {
    console.log(error);
  }
});

//Product end

//Comfort Start
router.get("/comfort" , verification , async(req , res)=>{
  try {
    const comfort = await Comfort.find();
    const file = path.join(__dirname, "../", "public", "assets", "remixicon", "remixicon.glyph.json");
    const icon = await fs.readFile(file, "utf-8")
    const ikonkalar = JSON.parse(icon);
    const ikonka_nomi = Object.keys(ikonkalar)
    res.render("adminadd/Comfort/adminComfort", { layout: "admin", comfort , ikonka_nomi });
  } catch (error) {
    console.log(error);
  }
});

router.post("/comfort/add", verification, async (req, res) => {
  const comfort = new Comfort({
    title: req.body.title,
    comment: req.body.comment,
    icon: req.body.icon,
    color: req.body.color,
  });

  await comfort.save();
  res.redirect("/admin/comfort");
});
router.get("/comfort/:id", verification, async (req, res) => {
  try {
    const comfort = await Comfort.findById(req.params.id);
    const file = path.join(__dirname, "../", "public", "assets", "remixicon", "remixicon.glyph.json");
    const icon = await fs.readFile(file, "utf-8")
    const ikonkalar = JSON.parse(icon);
    const ikonka_nomi = Object.keys(ikonkalar)
    res.render("adminadd/Comfort/adminComfortEdit", { layout: "admin", comfort, ikonka_nomi });
  } catch (error) {
    console.log(error);
  }
});

router.post("/comfort/edit", verification, async (req, res) => {
  try {

    await Comfort.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/comfort");
  } catch (error) {
    console.log(error);
  }
});

router.post("/comfort/delete", verification, async (req, res) => {
  try {
    await Comfort.findByIdAndDelete(req.body.id);
    res.redirect("/admin/comfort");
  } catch (error) {
    console.log(error);
  }
});
//Comfort End

//BigBlog start

router.get("/bigblog", verification, async (req, res) => {
  const bigblog = await BigBlog.find();
  console.log(bigblog)
  res.render("adminadd/BigBlog/adminBigBlog", { layout: "admin", bigblog });
});

router.post("/bigblog/add", verification, faylBigblog, async (req, res) => {
  const bigblog = new BigBlog({
    blogname: req.body.blogname,
    image: req.file.filename,
    name: req.body.name,
    date: req.body.date,
  });

  await bigblog.save();
  res.redirect("/admin/bigblog");
});
router.get("/bigblog/:id", verification, async (req, res) => {
  try {
    const bigblog = await BigBlog.findById(req.params.id);
    res.render("adminadd/BigBlog/adminBigBlogEdit", { layout: "admin", bigblog });
  } catch (error) {
    console.log(error);
  }
});

router.post("/bigblog/edit", verification, faylBigblog, async (req, res) => {
  try {
    const eskiRasm = path.join(__dirname, '../images/bigblog', req.body.eskirasm);
    fs.unlink(eskiRasm, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (req.file) {
      req.body.image = req.file.filename;
    }

    await BigBlog.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/bigblog");
  } catch (error) {
    console.log(error);
  }
});


router.post("/bigblog/delete", verification, async (req, res) => {
  try {
    await BigBlog.findByIdAndDelete(req.body.id);
    res.redirect("/admin/bigblog");
  } catch (error) {
    console.log(error);
  }
});

//Bigblog End

//about start
router.get("/about", verification, async (req, res) => {
  const about = await About.find();
  console.log(about)
  res.render("adminadd/About/adminAbout", { layout: "admin", about });
});

router.post("/about/add", verification, faylAbout, async (req, res) => {
  const about = new About({
    image: req.file.filename,
    nameurl: req.body.nameurl,
    name: req.body.name,
    comment: req.body.comment,
    job: req.body.job,
  });

  await about.save();
  res.redirect("/admin/about");
});
router.get("/about/:id", verification, async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    res.render("adminadd/About/adminAboutEdit", { layout: "admin", about });
  } catch (error) {
    console.log(error);
  }
});

router.post("/about/edit", verification, faylAbout, async (req, res) => {
  try {
    const eskiRasm = path.join(__dirname, '../images/about', req.body.eskirasm);
    fs.unlink(eskiRasm, (err) => {
      if (err) {
        console.log(err);
      }
    });

    if (req.file) {
      req.body.image = req.file.filename;
    }

    await About.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/about");
  } catch (error) {
    console.log(error);
  }
});
router.post("/about/delete", verification, async (req, res) => {
  try {
    await About.findByIdAndDelete(req.body.id);
    res.redirect("/admin/about");
  } catch (error) {
    console.log(error);
  }
});
//about end

//menu start
router.get('/menu', async (req, res) => {
  try {
    const directoryPath = path.join(__dirname, '../page/');
    console.log(`Directory path: ${directoryPath}`);
    const directoryExists = await fs.access(directoryPath).then(() => true).catch(() => false);
    console.log(directoryExists);
    if (!directoryExists) {
      throw new Error(`Directory does not exist: ${directoryPath}`);
    }
    const files = await fs.readdir(directoryPath);
    const hbsFileNames = files.filter(file => file.endsWith('.hbs')).map(file => path.parse(file).name);
    const menu = await Menu.find();
    console.log(menu);
    res.render("adminadd/menu/adminMenu", { title: "Menyu sahifasi", layout: 'admin', faylname: hbsFileNames, menu })
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while reading the directory.');
  }
});

router.post("/menu/add", async (req, res) => {
  try {
    const menu = new Menu({
      name: req.body.name,
      url: req.body.url,
      sahifa: req.body.sahifa
    });
    await menu.save();
    res.redirect("/admin/menu")
  } catch (error) {
    console.log(error)
  }
});
router.get("/menu/:id", verification, async (req, res) => {
  try {
    const directoryPath = path.join(__dirname, '../page/');
    console.log(`Directory path: ${directoryPath}`);
    const directoryExists = await fs.access(directoryPath).then(() => true).catch(() => false);
    console.log(directoryExists);
    if (!directoryExists) {
      throw new Error(`Directory does not exist: ${directoryPath}`);
    }
    const files = await fs.readdir(directoryPath);
    const hbsFileNames = files.filter(file => file.endsWith('.hbs')).map(file => path.parse(file).name);
    const menu = await Menu.findById(req.params.id);
    res.render("adminadd/menu/adminMenuEdit", { layout: 'admin', menu, faylname: hbsFileNames, });
  } catch (error) {
    res.status(500).send('An error occurred while reading the directory.');
    console.log(error);
  }
});
router.post("/menu/edit", verification, async (req, res) => {
  try {
    await Menu.findByIdAndUpdate(req.body.id, req.body);
    res.redirect("/admin/menu");
  } catch (error) {
    console.log(error);
  }
})
router.post("/menu/delete", verification, async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.body.id);
    res.redirect("/admin/menu");
  } catch (error) {
    console.log(error);
  }
});
//menu end
// cart start
router.get("/cart" , async(req , res)=>{
  try {
    res.render("adminadd/Cart/cartAdmin" , {layout:"admin"});
  } catch (error) {
    console.log(error)
  }
});
// cart end
module.exports = router;