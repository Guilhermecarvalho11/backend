const { Router } = require("express");

const SessionsController = require("../controllers/SessionsControllers");
const sessionsController = new SessionsController();

const sessionRoutes = Router();
sessionRoutes.post("/", sessionsController.create);

module.exports = sessionRoutes;
