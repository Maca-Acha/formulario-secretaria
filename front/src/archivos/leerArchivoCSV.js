import Papa from "papaparse"; 
    
export default function leerArchivoCSV(archivo) {
    return new Promise((resolve, reject) => {
        const lector = new FileReader();
        lector.onload = (e) => {
            const contenidoArchivo = e.target.result;
            const datos = Papa.parse(contenidoArchivo, { header: true }).data;
            resolve(datos);
        };
        lector.onerror = (e) => {
            reject(e);
        };
        lector.readAsText(archivo);
    });
}