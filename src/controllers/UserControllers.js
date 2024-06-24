    /**
     * index - GET para listar vários registros
     * show - GET para exibir um registro especifico
     * create - POST para criar um registro
     * update - PUT para atualizar um registro
     * delete - DELETE para remover um registro
     */

const AppError = require('../ultils/AppError');

// O controller é responsavel em lidar com o processamento das informações
class UserControllers { 

    create(req, res) {
        const {name, email, password, team} = req.body;

        if(!name){
            throw new AppError('Nome é obrigatorio')
        }
        res.status(201).json({name, email, password, team})
    }

}

module.exports = UserControllers