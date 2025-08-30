const User = require("../models/User");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

module.exports = class TaskController {

    static async taskLogin(req, res) {
        try {
            const { email, senha } = req.body

            const user = await User.findOne({ email });//Verifica se o usuario existe pelo email

            if (!user) return res.status(400).json({ message: "Usuário não encontrado" })

            // Verifica a senha
            const isMatch = await bcrypt.compare(senha, user.senha);
            if (!isMatch) return res.status(400).json({ message: "Senha incorreta" });

            // Gera JWT (Token)
            const token = jwt.sign(
                { id: user._id, nome: user.nome, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" } // expira em 1 hora
            );

            res.json({ message: "Login realizado com sucesso!", token });
        } catch (err) {
            res.status(500).json({ message: "Erro ao fazer login", error: err.message });
        }
    }

    static async taskRegister(req, res) {
        try {
            const { nome, email, senha } = req.body

            //Verifica se o email existe
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email já cadastrado" + err })
            }

            //Cria usuario
            const user = new User({ nome, email, senha })
            await user.save();//Salvar mongo

            res.status(200).json({ message: "Usuario cadastrado com sucesso" })
        } catch (err) {
            res.status(500).json({ message: "Erro ao registrar usuário", error: err.message });
        }

    }









}