const knex = require("../database/knex");
const AppError = require("../ultils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarControllers {
  async update(req, res) {
    const user_id = req.user.id;
    const avatarFileName = req.file.filename;
    const diskStorage = new DiskStorage();
    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError(
        "Somente usuários autenticados podem mudar avatar",
        401
      );
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar); //DELETANDO A FOTO ANTIGA
    }

    const fileName = await diskStorage.saveFile(avatarFileName);
    user.avatar = fileName; //salvando a nova foto do usuario

    await knex("users").update(user).where({ id: user_id }); // especificando o id do usuario

    return res.json(user);
  }
}

module.exports = UserAvatarControllers;
