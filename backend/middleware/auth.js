// codigo de autentificaçao no middlewate

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer") ? authHeader.slice(7): null;

    if(!token) return res.status(401).json({error: "Token ausente"});
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = {id: playload.sub,emial: payload.email, name:payload.name};
        next();
    } catch(err) {
        return res.status(401).json({error: "Token inválido ou expirado"});
    }
}