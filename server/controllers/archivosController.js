const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'archivos')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage })

exports.upload = upload.single('cv')
exports.uploadFiles = (req,res) => {
    res.send({data:'Archivos guardados correctamente'});
}


/*app.post('/api/usuarios', upload.fields([{ name: 'cv' }, { name: 'foto' }]), 
    (req, res) => {
        const cvFile = req.files['cv'][0];
        const fotoFile = req.files['foto'][0];

        res.send('Archivos guardados correctamente');
}); */

