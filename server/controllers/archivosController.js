const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'archivosCv');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadCv = multer({ storage: storage }).single('cv');
exports.uploadCv = uploadCv;

exports.uploadFiles = (req, res) => {
    uploadCv(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al cargar el archivo' });
        }
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ error: 'No se seleccionó ningún archivo' });
            }
            const apiUrl = 'http://200.58.96.142:4000/api/archivos';
            const formData = new FormData();
            formData.append('cv', file.buffer, file.originalname);

            const response = await axios.post(apiUrl, formData, {
                headers: formData.getHeaders()
            });
            console.log(response.data);
            res.status(200).json({ message: 'Archivo cargado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al enviar el archivo a la API' });
        }
    })
};

/* hasta no cargar la api no usar */
/* exports.returnCvs = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4000/api/archivos');
        console.log(response)
        res.send("hola")
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los datos de la API' });
    }
};
 */