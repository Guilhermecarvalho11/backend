// aqui é onde são definidas as rotas dos usuários
// a rota só tem responsobilidade em receber e enviar as informações

const {Router} = require("express");

const UserControllers = require('../controllers/UserControllers');

const usersRoutes = Router();


const userControllers = new UserControllers();

usersRoutes.post('/', userControllers.create);
usersRoutes.put('/:id', userControllers.update);

module.exports = usersRoutes;