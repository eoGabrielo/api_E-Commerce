const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Rotas para registrar e autenticar usuários
 */


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar novo usuário
 *     description: Cria um usuário com email e senha criptografada.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Gabrielo"
 *               email:
 *                 type: string
 *                 example: "teste@teste.com"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Email já cadastrado
 */

router.post("/register", TaskController.taskRegister);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de usuário
 *     description: Valida email e senha e retorna um token JWT.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "teste@teste.com"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Usuário não encontrado ou senha incorreta
 */
router.post("/login", TaskController.taskLogin);

module.exports = router;
