const express = require('express');
const router = express.Router();


const multer = require('multer');

const uniqid = require('uniqid');
const randomWords = require('random-words');

const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
     },
    filename: function (req, file, cb) {
        let finalName = uniqid(); + randomWords({ exactly:5, join: '-' }); + Date.now() + path.extname(file.originalname);
        cb(null, finalName);
    }
});

const upload = multer({ storage: storage })


const productsController = require('../controllers/products');


// Middleware
const mdProducts = require('../middlewares/pruebaProductos');
const mdAutenticacion = require('../middlewares/autenticacion');


// http://localhost:3000/products
router.get('/', mdProducts, productsController.allProducts);


//localhost:3000/products/create (lo que estaba antes)
router.get('/create', mdProducts, productsController.createProduct);
//localhost:3000/products/create (lo que estaba antes)
router.post('/create', upload.single('images'), mdProducts, productsController.storeInDB);

// http://localhost:3000/products/auth/:name
router.get('/auth/:name', mdAutenticacion, productsController.auth); 


//ruta de la base de datos mongo
router.get('/detail/:id', mdProducts, productsController.detail);

//RUTA PARA BORRAR

// http://localhost:3000/products/delete/:id
router.post('/delete/:id', mdProducts, productsController.delete);

//formulario para editar el producto GET http://localhost:3000/products/delete/:id
router.get('/edit/:id', mdProducts, productsController.formToEdit);

//formulario para mandar el producto editado POST http://localhost:3000/products/delete/:id
router.post('/update/:id', upload.single('images'), mdProducts, productsController.update);


// http://localhost:3000/products/:id
router.get('/:id', mdProducts, productsController.oneProduct);

module.exports = router;