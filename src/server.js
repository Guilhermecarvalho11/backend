/*
get -> leitura
post -> criação
put -> atualização
delete -> deleção
patch -> atualização parcial
*/

const express = require("express");

const app = express();
app.use(express.json());


app.post("/users", (req, res) => {
    const {name, email, senha } = req.body;
    res.send(`nome: ${name}; email: ${email}; senha: ${senha}`)
})

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
