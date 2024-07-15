/**
 * index - GET para listar vários registros
 * show - GET para exibir um registro especifico
 * create - POST para criar um registro
 * update - PUT para atualizar um registro
 * delete - DELETE para remover um registro
 */

const { hash, compare } = require("bcryptjs");
const AppError = require("../ultils/AppError");

const UserRepository = require("../repositories/UserRepository");
const sqliteConection = require("../database/sqlite");
const UserCreateServices = require("../services/userCreateService");

// O controller é responsavel em lidar com o processamento das informações
class UserControllers {
  async create(req, res) {
    const { name, email, password } = req.body;
    const userRepository = new UserRepository();
    const userCreateService = new UserCreateServices(userRepository);
    await userCreateService.execute({ name, email, password });

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const database = await sqliteConection();
    const users = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]);

    if (!users) {
      throw new AppError("Usuário não econtrado");
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== users.id) {
      throw new AppError("Este email já existe");
    }

    users.name = name ?? users.name;
    users.email = email ?? users.email;

    if (password && !old_password) {
      throw new AppError("Informe a senha antiga");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, users.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }
      users.password = await hash(password, 8);
    }

    await database.run(
      `
            UPDATE users SET name = ?,
            email = ?,
            password = ?,
            update_at = DATETIME('now')
            WHERE id = ?`,
      [users.name, users.email, users.password, user_id]
    );

    return res.status(200).json();
  }
}

module.exports = UserControllers;
