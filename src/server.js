require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./ultils/AppError.js");
const uploadConfig = require("./config/upload");
const express = require("express");

const routes = require("./routes");

migrationsRun();

const app = express();
app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes); // aqui é onde as rotas estão sendo setadas

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    // erro do lado do cliente
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.log("O ERRO É:", error);

  return res.status(500).json({
    // erro do lado do servidor
    status: "error",
    message: "Internal server Error",
  });
});

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
