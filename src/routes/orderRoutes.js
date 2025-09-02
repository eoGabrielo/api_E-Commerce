const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const TaskController = require("../controllers/orderController");

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Rotas para criar, listar e atualizar pedidos
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Criar pedido a partir do carrinho do usuário
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Carrinho vazio ou não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/orders", verifyToken, TaskController.taskCreatedOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Listar todos os pedidos do usuário logado
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna lista de pedidos
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/orders", verifyToken, TaskController.taskListAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obter detalhes de um pedido específico
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna os detalhes do pedido
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/orders/:id", verifyToken, TaskController.taskListOrderId);

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Atualizar status de um pedido (somente admin)
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Novo status do pedido
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.patch("/orders/:id/status", verifyToken, TaskController.taskUpdateStatusOrder);

module.exports = router;
