// aqui é onde são definidas as rotas dos usuários
// a rota só tem responsobilidade em receber e enviar as informações

const {Router} = require("express");

const NotesControllers = require('../controllers/NotesControllers');

const notesRoutes = Router();

function myMiddlewere(req, res, next){
    console.log('você passou pelo middlewere')

    next()
}

const notesControllers = new NotesControllers();

notesRoutes.post('/:users_id',  myMiddlewere, notesControllers.create);
notesRoutes.get('/:id',  myMiddlewere, notesControllers.show);


module.exports = notesRoutes;