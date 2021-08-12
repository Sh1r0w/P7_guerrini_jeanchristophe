const multer = require('multer');

//ajout des images avec changement de nom
const MIME_TYPE = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPE[file.mimetype];
        callback(null, Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('images');