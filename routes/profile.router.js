const express = require("express");
const OrdersService = require("../services/orders.service");
const { } = require("../schemas/users.scheme");
const passport = require("passport");

const router = express.Router();
const service = new OrdersService();

router.get("/my-orders",
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) =>{
    try {
      const id = req.user.sub;
      const orders = await service.findByUser(id);
      res.json(orders);
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;
