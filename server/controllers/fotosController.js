const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'archivosFoto')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadFoto = multer({ storage: storage }).single("foto");
exports.uploadFoto = uploadFoto;

exports.uploadFiles = (req, res) => {
    res.send({ data: 'Foto guardada correctamente' });  
};
