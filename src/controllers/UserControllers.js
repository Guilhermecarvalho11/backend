    /**
     * index - GET para listar vários registros
     * show - GET para exibir um registro especifico
     * create - POST para criar um registro
     * update - PUT para atualizar um registro
     * delete - DELETE para remover um registro
     */

const AppError = require('../ultils/AppError');
const sqliteConection = require('../database/sqlite');
const { response } = require('express');

// O controller é responsavel em lidar com o processamento das informações
class UserControllers { 

    async create(req, res) {
     const {name, email, password, team} = req.body;

     const database = await sqliteConection();
     const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

      if(checkUserExists){
        throw new AppError("este email ja esta cadastrado")
      }
      
      return response.status(201).json();

    }

}

module.exports = UserControllers;