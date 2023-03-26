const express = require("express");
const CustomersService = require("../services/customers.service");
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require("../schemas/customers.scheme");
const validatorHandler = require("../middlewares/validator.handler");

const router = express.Router();
const service = new CustomersService();

router.get("/", async (req, res, next) =>{
  try {
    const clientes = await service.find();
    res.json(clientes);
  } catch (error) {
    next(error)
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const cliente = await service.findOne(id);
    res.json(cliente);
  } catch (error) {
    next(error)
  }
});

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
  try {
    const { body } = req;
    const newCustomer = await service.create(body);
    res.status(201).json(newCustomer);
  } catch (error) {
    next(error)
  }
});

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const cliente = await service.update(id, body);
    res.json(cliente);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
