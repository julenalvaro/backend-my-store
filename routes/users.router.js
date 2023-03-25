const express = require("express");
const UsersService = require("../services/users.service");
const { createUserSchema, updateUserSchema, getUserSchema } = require("../schemas/users.scheme");
const validatorHandler = require("../middlewares/validator.handler");

const router = express.Router();
const service = new UsersService();

router.get("/", async (req, res, next) =>{
  try {
    const usuarios = await service.find();
    res.json(usuarios);
  } catch (error) {
    next(error)
  }
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await service.findOne(id);
    res.json(usuario);
  } catch (error) {
    next(error)
  }
});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error)
  }
});

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const usuario = await service.update(id, body);
    res.json(usuario);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
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
