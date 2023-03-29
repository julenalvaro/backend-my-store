const express = require("express");
const passport = require("passport");
const { config } = require ("../config/config");
const { signToken } = require ('../token-sign')

const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
  try {
    const payload = {
      sub: req.user.id,
      role: req.user.role,
    };
    expiresIn = '24h';
    const token = signToken(payload, config.secret, expiresIn);

    res.json({
      'user': req.user,
      'token': token,
    })
  } catch (error) {
    next(error);
  }
});

module.exports = router;
