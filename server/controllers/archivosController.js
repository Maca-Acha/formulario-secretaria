const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'archivos')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadCv = multer({ storage: storage }).single("cv");
exports.uploadCv = uploadCv;

exports.uploadFiles = (req, res) => {
    res.send({ data: 'cv guardado correctamente' });
};
