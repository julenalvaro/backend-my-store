const express = require("express");
const CategoriesService = require("../services/categories.service");
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require("../schemas/categories.scheme");
const validationHandler = require("../middlewares/validator.handler");
const { valid } = require("joi");
const passport = require("passport");
const { checkRoles } = require("../middlewares/auth.handler");

const router = express.Router();
const service = new CategoriesService();

router.get("/", async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.post('/',
//el manejo de sesion es con cookies, nosotros estamos usando tokens
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin']),
  validationHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
  try {
    const { body } = req;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getCategorySchema, 'params'),
  validationHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const category = await service.update(id, body);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
