const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const TaskController = require("../controllers/orderController");

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Rotas para gerenciar pedidos, criar, listar, detalhar e atualizar status
 */


/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Criar pedido a partir do carrinho
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */

router.post("/orders", verifyToken, TaskController.taskCreatedOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Listar pedidos do usuário
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos do usuário
 */
router.get("/orders", verifyToken, TaskController.taskListAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Detalhes de um pedido específico
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido retornado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
router.get("/orders/:id", verifyToken, TaskController.taskListOrderId);

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Atualizar status do pedido (admin)
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pendente, pago, enviado, cancelado]
 *                 example: "pendente"
 *     responses:
 *       200:
 *         description: Status do pedido atualizado
 *       404:
 *         description: Pedido não encontrado
 */
router.patch("/orders/:id/status", verifyToken, TaskController.taskUpdateStatusOrder);

module.exports = router;
