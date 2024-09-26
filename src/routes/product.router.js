import express from 'express';
import ProductModel from '../models/product.models.js';
const router = express.Router();

//creación de un producto
router.post('/', async (req, res )=> {
    try{
        const newProduct = new ProductModel(req.body);
        console.log('Info del body: ', req.body);

        await newProduct.save();

        res.render('product', {product: newProduct.toObject()});   
        //Mongoose provides a method called toObject that transforms the document into a plain JavaScript object, 
        // copying all its own properties (including inherited ones) to the new object.
    } catch(error){
        return res.render('error', {error: 'Error al insertar producto'});
    }
});


//obtener un producto por id
//localhost:8080/product/:id
router.get('/:id', async (req, res) => {
    try{
        //metodoFindById
        const unProducto = await ProductModel.findById(req.params.id);

        if(!unProducto){
            return res.render('error', {error: 'Producto no encontrado'});
        }
        res.render('product', {product: unProducto.toObject()});

    } catch(error){
        return res.render('error', {error: 'Error al buscar un producto'});
    }
});


export default router;