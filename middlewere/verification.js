module.exports = function (req, res, next) {
    if (!req.session.tizimgakirildi) {
        res.redirect("/login")
    }

    next()
}