const knex = require("../database/knex");
const AppError = require("../ultils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;
    console.log("email: ", email, "password: ", password);

    const user = await knex("users").where({ email }).first(); //buscando emails da pasta users no BD

    if (!user) {
      throw new AppError("Email ou senha inválida", 401);
    }

    const passwordMatched = await compare(password, user.password); // comparando senha cadastrada com a senha informada no BD

    if (!passwordMatched) {
      throw new AppError("Email ou senha inválida", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.json({ user, token });
  }
}

module.exports = SessionsController;
