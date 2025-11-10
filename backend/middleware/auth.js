const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token ausente ou malformatado" });
    }
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };

    next();
  } catch (err) {
    console.error("Erro na autenticação JWT:", err.message);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}

module.exports = auth;
