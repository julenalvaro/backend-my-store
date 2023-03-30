const boom = require("@hapi/boom");
const UsersService = require('./users.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersService = new UsersService();
const { config } = require ("../config/config");

//nodemailer
const nodemailer = require("nodemailer");

class AuthService {

  async login (email, password) {
    const user = await usersService.findUserByEmail(email)
    if(!user){
      throw(boom.unauthorized());
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw(boom.unauthorized());
    }
    delete user.dataValues.password;
    return user;
  }

  async passwordRecovery(email) {
    const user = await usersService.findUserByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.id
    };
    const token = jwt.sign(payload, config.secret, { expiresIn: '15min' });
    await usersService.update(user.id, { recoveryToken: token });
    const link = `http://my-store.com/change-password?token=${token}`;
    const recoveryMail = {
      from: '"my-store-password-recovery" <mail@ethereal.email>', // sender address
      to: user.email, // list of receivers
      subject: "Tu nueva contraseña", // Subject line
      html: `<p>Hola ${user.nombre}, el link de recuperación de contraseña es el siguiente: ${link}</p>
      <p>Un saludo,</p>
      <p>El equipo de my-store</p>`,
    }

    try{
      return this.sendEmail(recoveryMail);
    }catch(error){
      throw boom.badRequest("Error al enviar el email");
    }
  }

  signToken(req) {
    const payload = {
      sub: req.user.id,
      role: req.user.role,
    };
    const expiresIn = '24h';
    return jwt.sign(payload, config.secret, { expiresIn: expiresIn });
  }

  async sendEmail(mail){
    const transporter = nodemailer.createTransport({
      host: config.nodemailerHost,
      secure: true,
      port: 465,
      auth: {
        user: config.nodemailerUser,
        pass: config.nodemailerPass,
      }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail(mail);
    return("Message sent: %s", info.messageId);
  }

  async changePassword(token, newpassword) {
    try{
      //verificamos el token obteniendo el payload que es el mail del usuario
      const payload = jwt.verify(token, config.secret);
      //buscamos el usuario por el id
      const user = await usersService.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newpassword, 10);
      //actualizo la contraseña
      await usersService.update(user.id, { password: hash, recoveryToken: null });

      return { message: "Password was correctly modified" };

    }catch(error){
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
