const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const TaskController = require("../controllers/productController");

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Rotas para gerenciar produtos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *               - preco
 *               - estoque
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               estoque:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/products", verifyToken, TaskController.taskCreatedProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/products', TaskController.taskGetProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto retornado com sucesso
 *       401:
 *         description: Token inválido ou ausente
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/products/:id', verifyToken, TaskController.taskGetProductId);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto completamente
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               estoque:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       401:
 *         description: Token inválido ou ausente
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/products/:id", verifyToken, TaskController.taskUpdateProductAll);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       401:
 *         description: Token inválido ou ausente
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/products/:id", verifyToken, TaskController.taskDeleteProduct);

module.exports = router;
