const express = require("express");
const passport = require("passport");
const { config } = require ("../config/config");
const AuthService = require("../services/auth.service");
const validatorHandler = require("../middlewares/validator.handler");
const { recoverEmailSchema } = require("../schemas/users.scheme");

const authService = new AuthService();

const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
  try {
    const token = authService.signToken(req)
    res.json({
      'user': req.user,
      'token': token,
    })
  } catch (error) {
    next(error);
  }
});

router.post("/recovery",
  validatorHandler(recoverEmailSchema, 'body'),
  async (req, res, next) =>{
    try {
      const { email } = req.body;
      const rta = await authService.passwordRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error)
    }
  }
);

router.post("/change-password",
  //validar el token que va a venir en el header
  async (req, res, next) =>{
    try {
      const { token, newpassword } = req.body;
      const rta = await authService.changePassword(token, newpassword);
      res.json(rta);
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router;
