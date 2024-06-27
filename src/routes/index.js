const {Router} = require('express');

const usersRoutes = require('./users.routes.js');
const notesRoutes = require('./notes.routes.js');
const teamRoutes = require('./team.routes.js');
 
const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/notes', notesRoutes);
routes.use('/team', teamRoutes);

module.exports = routes;