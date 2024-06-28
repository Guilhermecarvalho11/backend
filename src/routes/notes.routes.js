// aqui é onde são definidas as rotas dos usuários
// a rota só tem responsobilidade em receber e enviar as informações

const {Router} = require("express");

const NotesControllers = require('../controllers/NotesControllers');

const notesRoutes = Router();

const notesControllers = new NotesControllers();

notesRoutes.post('/:users_id', notesControllers.create);
notesRoutes.get('/:id', notesControllers.show);
notesRoutes.delete('/:id', notesControllers.delete);


module.exports = notesRoutes;