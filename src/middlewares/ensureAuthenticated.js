//aqui é onde middleware vai verificar o token passado na requisição, verificar o ID
// para saber qual usuario está querendo fazer a requisição
const { verify } = require("jsonwebtoken");
const AppError = require("../ultils/AppError");
const authConfig = require("../config/auth");

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization; // onde o token do usuario está
  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" "); // divide a string onde tem espaços e armazena a segunda string

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret); //

    req.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new AppError("JWT Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;
