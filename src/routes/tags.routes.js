const { Router } = require("express");

const TagsControllers = require("../controllers/TagsControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRoutes = Router();

const tagsControllers = new TagsControllers();

tagsRoutes.get("/:users_id", ensureAuthenticated, tagsControllers.index);

module.exports = tagsRoutes;
