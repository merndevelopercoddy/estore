const multer = require("multer");
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "images/blog");
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname)
    }
});



const upload = multer({
    storage,
    limits: {
        fieldNameSize: 10 * 1024 * 1024
    },

})


const uploadFile = upload.single('image')
module.exports = uploadFile;