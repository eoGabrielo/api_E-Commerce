const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Rotas para registro e login de usuários
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos ou usuário já existe
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/register", TaskController.taskRegister);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de usuário e geração de token JWT
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso e token retornado
 *       400:
 *         description: Usuário não encontrado ou senha incorreta
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/login", TaskController.taskLogin);

module.exports = router;
