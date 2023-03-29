const express = require("express");
const OrdersService = require("../services/orders.service");
const CustomersService = require("../services/customers.service");
const { createOrderSchema, getOrderSchema, addItemSchema } = require("../schemas/orders.scheme");
const validationHandler = require("../middlewares/validator.handler");
const passport = require("passport");

const router = express.Router();
const service = new OrdersService();
const customersService = new CustomersService();

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
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
  try {
    const { user } = req;
    const userId = user.sub;
    const customer = await customersService.findByUser(userId);
    const newOrder = await service.create({ "customerId": customer.id });
    res.status(201).json(newOrder);
  } catch (error) {
    next(error)
  }
});

router.post("/add-item",
  passport.authenticate('jwt', { session: false }),
  validationHandler(addItemSchema, 'body'),
  async (req, res, next) => {
  try {
    const { body } = req;
    const newItem = await service.addItem(body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error)
  }
});

router.delete("/:id",
  passport.authenticate('jwt', { session: false }),
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
