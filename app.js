const express = require('express');
const app = express();

const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/productsDB';
mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

const path = require('path');
 console.log( path.join('controllers', 'products.js') );
 console.log( path.dirname('controllers/products.js') );
 console.log( path.extname('controllers/products.js') );

app.listen(3000, function() {
	console.log('Servidor andando => puedes ir http://localhost:3000');
});

app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );


app.set('view engine', 'ejs');


app.use( express.static(__dirname + '/public/') );


const middlewareDePrueba = require('./middlewares/prueba');
app.use(middlewareDePrueba);

// Rutas http://localhost:3000/
app.get('/', function(req, res) { 
	return res.send('Bienvenido a nuestra pagina'); });


const productsRoutes = require('./routes/products');
app.use('/products/', productsRoutes);

// 404 Error
const middleware404 = require('./middlewares/404NotFound');
app.use(middleware404);