const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

const TaskController = require("../controllers/orderController");


//Cria pedido com base na existencia do carrinho
router.post("/orders", verifyToken, TaskController.taskCreatedOrder);

//Listar todos pedidos do usuario
router.get("/orders", verifyToken, TaskController.taskListAllOrders);

//Lista pedido especifico
router.get("/orders/:id", verifyToken, TaskController.taskListOrderId);

//Atualizar status do pedido (admin)
router.patch("/orders/:id/status", verifyToken, TaskController.taskUpdateStatusOrder)

module.exports = router;