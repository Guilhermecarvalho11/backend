    /**
     * index - GET para listar vários registros
     * show - GET para exibir um registro especifico
     * create - POST para criar um registro
     * update - PUT para atualizar um registro
     * delete - DELETE para remover um registro
     */

const AppError = require('../ultils/AppError');


class UserControllers {

    create(req, res) {
        const {name, email, password} = req.body;

        if(!name){
            throw new AppError('Nome é obrigatorio')
        }
        res.status(201).json({name, email, password})
    }

}

module.exports = UserControllers