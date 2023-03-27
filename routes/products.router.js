const express = require("express");
const ProductsService = require("../services/products.service");
const { createProductSchema, updateProductSchema, getProductSchema, pageProductSchema } = require("../schemas/product.scheme");
const validatorHandler = require("../middlewares/validator.handler");

const router = express.Router();
const service = new ProductsService();

router.get("/",
  validatorHandler(pageProductSchema, 'query'),
  async (req, res) =>{
    const { query } = req;
    const productos = await service.find(query);
    res.json(productos);
});

router.get('/filtro', async (req, res) => {
  res.send("Hola soy el filtro de productos");
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'), //
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const producto = await service.findOne(id);
      res.json(producto);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'), //
  async (req, res) => {
    const { body } = req;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'), //validamos el id
  validatorHandler(updateProductSchema, 'body'), //validamos el id
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const producto = await service.update(id, body);
      res.json(producto);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'), //validamos el id
  async (req, res) => {
    try{
      const { id } = req.params;
      const rta = await service.delete(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
});

module.exports = router;
