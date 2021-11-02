const fs = require('fs');

const prueba = (req, res, next) => {
	let ruta = 'Pasaste por ' + req.originalUrl;
	let fecha = new Date;
	fs.appendFileSync('./logeo_de_rutas.txt', ruta + ' - ' + fecha + '\n');
	next();
}

module.exports = prueba;