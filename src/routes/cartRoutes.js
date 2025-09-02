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
 *     summary: Adicionar produto ao carrinho do usuário
 *     tags: [Carrinho]
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
 *                 description: ID do produto a ser adicionado
 *               quantity:
 *                 type: integer
 *                 description: Quantidade do produto
 *     responses:
 *       200:
 *         description: Produto adicionado ao carrinho
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/cart", verifyToken, TaskController.taskAddProductCart);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Listar itens do carrinho do usuário logado
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna itens do carrinho
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/cart", verifyToken, TaskController.taskListItemsCart);

/**
 * @swagger
 * /cart/{productId}:
 *   delete:
 *     summary: Remover produto específico do carrinho
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID do produto que será removido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto removido do carrinho
 *       404:
 *         description: Produto não encontrado no carrinho
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/cart/:productId", verifyToken, TaskController.taskDeleteProductCart);

module.exports = router;
