const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {z} = require('zod');
const User = require('./user');
const auth = require('../middleware/auth');

const router = express.Router();

const regiterSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

function singToken(user) {
    return jwt.sing(
        {
            sub: user._id.toString(),email: user.email,name: user.name},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN || "Id"}

    );
}

router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = regiterSchema.parse(req.body);
        const exist = await User.findOne({email});
        if (exist) res.status(409).json({error: "Email já cadastrado"});
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({name, email, passwordHash});
        const token = signToken(user);
        return res.status(201).json({
            message: "Usuário registrado com sucesso",
            user:{id: user._id, name: user.name,email: user.email},
            token
        });

    } catch (err) {
        if(err?.issues){
            return res.status(400).json({error: "Dados inválidos",details: err.issues});
        }
        return res.status(500).json({error: "Erro no servidor" });
    }
});

outer.post("/login",async(req,res)=>{
    try{
        const {email,password} = loginSchema.parse(req.body);
        const user = await User.findOne({email});
        if(!user) return res.status(401).json({error: "Credenciais inválidas"});
        // realiza comparação da senha do usuario com a senha hash

        const ok = await bcrypt.compare(password,passwordHash); 
        if(!ok) return res.status(401).json({error: "Credenciais invalidas"});

        const token = signToken(user);
        return res.json({
            message: "Login realizado",
            user:{id: user._id,name:user.name, email:user.email},
            token
        });
    } catch(err){
        if(err?.issues){
            return res.status(400).json({error: "Dados inválidos", details: err.issues});
        }
        return res.status(500).json({error:"Erro no login"})
    }
});

router.get("/me",auth,async(req,res)=>{
    return res.json({user: req.user})
});

module.exports = router;
