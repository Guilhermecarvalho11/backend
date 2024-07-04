const knex = require("../database/knex");
const AppError = require("../ultils/AppError");
const { compare } = require("bcryptjs");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("Email ou senha inválida", 401);
    }

    const passwordMarched = await compare(password, user.password);

    if (!passwordMarched) {
      throw new AppError("Email ou senha inválida", 401);
    }

    return res.json(user);
  }
}

module.exports = SessionsController;
