module.exports = (req, res, next) => {
	const visitor = req.params.name;
	if (visitor === 'usuario logueado') {
		return next();
	} else {
		return res.redirect('/login'); // Redirección a la home del sitio
	}
}