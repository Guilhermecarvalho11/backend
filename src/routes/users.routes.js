// aqui é onde são definidas as rotas dos usuários

const {Router} = require("express");

const UserControllers = require('../controllers/UserControllers');

const usersRoutes = Router();

function myMiddlewere(req, res, next){
    console.log('você passou pelo middlewere')

    next()
}

const userControllers = new UserControllers();

usersRoutes.post('/', myMiddlewere, userControllers.create);

module.exports = usersRoutes;