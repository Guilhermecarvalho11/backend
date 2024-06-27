// aqui é onde são definidas as rotas dos usuários
// a rota só tem responsobilidade em receber e enviar as informações

const {Router} = require("express");

const TeamControllers = require('../controllers/TeamControllers');

const teamRoutes = Router();

const teamControllers = new TeamControllers();

teamRoutes.post('/:users_id', teamControllers.create);

module.exports = teamRoutes;