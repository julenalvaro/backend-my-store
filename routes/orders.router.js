const express = require("express");
const OrdersService = require("../services/orders.service");

const { createOrderSchema, updateOrderSchema, getOrderSchema } = require("../schemas/orders.scheme");
const validationHandler = require("../middlewares/validator.handler");

const router = express.Router();
const service = new OrdersService();

router.get("/", async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error)
  }
});

router.get("/:id",
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error)
  }
});

router.post("/",
  validationHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
  try {
    const { body } = req;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error)
  }
});

router.patch("/:id",
  validationHandler(getOrderSchema, 'params'),
  validationHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const order = await service.update(id, body);
    res.json(order);
  } catch (error) {
    next(error)
  }
});

router.delete("/:id",
  validationHandler(getOrderSchema, 'params'),
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
