const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const TaskController = require("../controllers/cartController");

/**
 * @swagger
 * tags:
 *   name: Carrinho
 *   description: Rotas para gerenciar o carrinho de compras
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Adicionar produto ao carrinho
 *     description: Adiciona um produto ao carrinho do usuário logado
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto adicionado ao carrinho
 */
router.post("/cart", verifyToken, TaskController.taskAddProductCart);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Listar itens do carrinho
 *     description: Retorna todos os itens do carrinho do usuário logado
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrinho listado
 */
router.get("/cart", verifyToken, TaskController.taskListItemsCart);

/**
 * @swagger
 * /cart/{productId}:
 *   delete:
 *     summary: Remover produto do carrinho
 *     description: Remove um produto do carrinho pelo ID (usuário logado)
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto removido do carrinho
 */
router.delete("/cart/:productId", verifyToken, TaskController.taskDeleteProductCart);

module.exports = router;
