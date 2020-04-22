const multer = require("multer");
const randomString = require("random-string");


const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "./public/photo");
    },
    filename:(req, file, cb) => {
        cb(null, randomString({length:10})+""+file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ){
        cb(null, true)
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage,
    fileFilter
})


module.exports = upload;