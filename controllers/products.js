
/*comienzo mostrar todos los productos const fetch = require('node-fetch'); const fs = require('fs');*/

const Product = require('../database/models/Product')
const controller = {
	allProducts: (req, res) => {
		Product.find({}, (error, documents) => {
            if (error) {
                return res.status(500).json(error);
            }
            return res.render('products', { products: documents });
        })
},
	//final
	createProduct: (req, res) => {
		return res.render('createProduct');
	},
	auth: (req, res) => {
	return res.send('Hola visitante autenticado');
	},

	oneProduct: (req, res) => {
		let idProduct = req.params.id;
		let productoBuscado = productsList[idProduct];
		return res.render('detalleProducto', { infoDelProducto: productoBuscado });
	},
	
	storeInDB: (req, res) => {
	if (req.body.name !== '' && req.body.description !== '' && req.body.brand !== '' && req.body.price !== '' && req.file.filename !== undefined) {
	  
		Product.create({
		name: req.body.name,
		description: req.body.description,
		brand: req.body.brand,
		price: req.body.price,
		images: req.file.filename
	  }, (error, product) => {
		  if (error) {
			return res.status(500).json(error);
		  }     	
	
		  return res.redirect('/products');	  
		})
	} else {

		return res.render('createProduct', {
			error: 'el formulario tiene campos vacios, por favor escriba los campos solicitados'
			});
	}
 },
      detail: (req, res) => {
	    Product.findById({ _id: req.params.id }, (error, product) => {
		
			if(error) {
			return res.status(500).json(error);
		}
		return res.render('detalleProducto', { product : product, admin:'Grupo5' });
	});
 },
 	 delete: (req, res) => {
		Product.findOneAndRemove({ _id: req.params.id }, (error, product) => {
			if (error) {
			return res.status(500).json(error);
		}
			return res.redirect('/products');
		});
	},
	formToEdit: (req, res) => {
		Product.findById({ _id: req.params.id }, (error, product) => {
		
			if(error) {
			return res.status(500).json(error);
		    }
		return res.render('form-to-edit-product', { product : product });
	    }); 
	
    },

	update: (req, res) => {
		if (req.body.name !== '' && req.body.description !== '' && req.body.brand !== '' && req.body.price !== '' && req.file !== undefined) {
		  
			Product.findByIdAndUpdate({ _id:req.params.id }, {
			name: req.body.name,
			description: req.body.description,
			brand: req.body.brand,
			price: req.body.price,
			images: req.file.filename
		  }, (error, product) => {
			  if (error) {
				return res.render('form-to-edit-product', {
					error:"se te olvido completar la informacion obligatoria"
				});
			  }     	
		
			  return res.redirect('/products');	  
			})
		} else {
	
			return res.render('createProduct', {
				error: 'el formulario tiene campos vacios, por favor escriba los campos solicitados'
				});
		}
	}
}	
 module.exports = controller;