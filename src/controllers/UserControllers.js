    /**
     * index - GET para listar vários registros
     * show - GET para exibir um registro especifico
     * create - POST para criar um registro
     * update - PUT para atualizar um registro
     * delete - DELETE para remover um registro
     */

const AppError = require('../ultils/AppError');
const sqliteConection = require('../database/sqlite');
const {hash, compare} = require('bcryptjs');
const { use } = require('express/lib/router');

// O controller é responsavel em lidar com o processamento das informações
class UserControllers { 

    async create(req, res) {
     const {name, email, password, team} = req.body;

     const database = await sqliteConection();
     const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

      if(checkUserExists){
        throw new AppError("este email ja está cadastrado");
      }

      const hashedPassword = await hash(password, 8);

      await database.run("INSERT INTO users (name, email, password, team) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, team]);

      return res.status(201).json();

    }

    async update(req, res){
        const {name, email, password, old_password} = req.body;
        const {id} = req.params;
        console.log('id',id)

        const database = await sqliteConection();
        const users = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!users){
            throw new AppError("Usuário não econtrado")
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== users.id){
            throw new AppError("Este email já existe");
        }

        users.name = name;
        users.email = email;

        if(password && !old_password){
            throw new AppError('Informe a senha antiga')
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, users.password);

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere")
            }

            users.password = await hash(password, 8)
        }

        await database.run(`
            UPDATE users SET name = ?,
            email = ?,
            password = ?,
            update_at = ?
            WHERE id = ?`,
            [users.name, users.email, users.password, new Date(), id]
        )

        return res.status(200).json();
    }
}

module.exports = UserControllers;