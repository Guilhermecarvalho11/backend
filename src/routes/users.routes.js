// aqui é onde são definidas as rotas dos usuários
// a rota só tem responsobilidade em receber e enviar as informações

const { Router } = require("express");

const UserControllers = require("../controllers/UserControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const uploadConfig = require("../config/upload");
const multer = require("multer");

const usersRoutes = Router();

const userControllers = new UserControllers();
const upload = multer(uploadConfig.MULTER);

usersRoutes.post("/", userControllers.create);
usersRoutes.put("/", ensureAuthenticated, userControllers.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  (req, res) => {
    console.log(req.file.filename);
    res.json();
  }
);

module.exports = usersRoutes;
