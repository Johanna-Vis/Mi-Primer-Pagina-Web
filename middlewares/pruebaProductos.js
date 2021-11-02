module.exports = (req, res, next) => {
	console.log('Pasaste por la URL ' + req.originalUrl);
	next();
}