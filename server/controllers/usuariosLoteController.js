/* const Papa = require("papaparse");
const csv = require("csv-parser");
const { Readable } = require("stream"); */
const axios = require('axios');

function leerArchivoCSV(data) {
    return new Promise((resolve, reject) => {
        const resultados = [];
        const rows = data.toString().split('\n');
        const headers = rows[0].split(';');

        for (let i = 1; i < rows.length; i++) {
            const values = rows[i].split(';');
            if (values.length === headers.length) {
                const row = {};
                for (let j = 0; j < headers.length; j++) {
                    const key = headers[j].trim();
                    const value = values[j].trim().replace(/\r/g, ''); 
                    row[key] = value;
                }
                resultados.push(row);
            }
        }
        resolve(resultados);
    });
}

const usuariosLoteController = {
    leerExcel: async (req, res) => {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: "No se encontró el archivo" });
            }
            const archivo = req.files[0]; 
            const datosDelArchivo = await leerArchivoCSV(archivo.buffer);

            const urlAPI = "http://localhost:4000/api/usuarios";
            const respuesta = await axios.post(urlAPI, datosDelArchivo);
            console.log("respuesta: ", respuesta.data);
            res.json({ success: true, message: "Datos enviados correctamente" });
        
        } catch (error) {
            console.error("Error al leer o enviar el archivo:", error);
            res.status(500).json({ error: "Error al procesar el archivo" });
        }
    },
}



module.exports = usuariosLoteController;


/* document.getElementById("inputArchivo").addEventListener("change", async (event) => {
    try {
        const archivoSeleccionado = event.target.files[0];
        const datosDelArchivo = await leerArchivoCSV(archivoSeleccionado);
        console.log(datosDelArchivo); 
        // Solicitud HTTP para enviar los datos al servidor
        const urlAPI = "http://localhost:4000/api/usuarios"; 
        const respuesta = await axios.post(urlAPI, datosDelArchivo);
        console.log(respuesta)
        console.log("Datos enviados correctamente:", respuesta.data);
    } catch (error) {
        console.error("Error al leer o enviar el archivo:", error);
    }
}); */
