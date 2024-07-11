// aqui é onde são definidas as rotas dos usuários
// a rota só tem responsobilidade em receber e enviar as informações

const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const NotesControllers = require("../controllers/NotesControllers");

const notesRoutes = Router();
notesRoutes.use(ensureAuthenticated);

const notesControllers = new NotesControllers();

notesRoutes.get("/", ensureAuthenticated, notesControllers.index);
notesRoutes.post("/", notesControllers.create);
notesRoutes.get("/:id", notesControllers.show);
notesRoutes.delete("/:id", notesControllers.delete);

module.exports = notesRoutes;
