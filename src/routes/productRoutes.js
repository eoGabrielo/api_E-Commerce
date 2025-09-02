const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const TaskController = require("../controllers/productController");

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Rotas para gerenciar produtos (CRUD completo)
 */


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Criar novo produto
 *     description: Adiciona um produto (requer autenticação)
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Iphone 16"
 *               descricao:
 *                 type: string
 *                 example: "Celular tequinologi"
 *               preco:
 *                 type: number
 *                 example: 1700
 *               estoque:
 *                 type: number
 *                 example: 8
 *     responses:
 *       201:
 *         description: Produto criado
 */
router.post("/products", verifyToken, TaskController.taskCreatedProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar todos os produtos
 *     description: Retorna todos os produtos cadastrados.
 *     tags:
 *       - Produtos
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/products', TaskController.taskGetProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */

router.get('/products/:id', verifyToken, TaskController.taskGetProductId);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualizar produto
 *     description: Atualiza os dados de um produto pelo ID (requer autenticação)
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 */
router.put("/products/:id", verifyToken, TaskController.taskUpdateProductAll);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deletar produto
 *     description: Remove um produto pelo ID (requer autenticação)
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/products/:id", verifyToken, TaskController.taskDeleteProduct);

module.exports = router;
