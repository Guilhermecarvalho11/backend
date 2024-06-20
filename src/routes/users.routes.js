const {Router} = require("express");

const usersRoutes = Router();

usersRoutes.post('/', (req, res) => {
    const {name, email, password} = req.body;
    res.json({name, email, password})
})

app.post("/users", (req, res) => {
    const {name, email, senha } = req.body;
    res.send({name, email, senha })
})

module.exports - usersRoutes;