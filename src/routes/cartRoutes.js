const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

const TaskController = require("../controllers/cartController");

// Adicionar produto ao carrinho
router.post("/cart", verifyToken, TaskController.taskAddProductCart);

//Lista itens do carrinho
router.get("/cart", verifyToken, TaskController.taskListItemsCart);

//Remover produto do carrinho
router.delete("/cart/:productId", verifyToken, TaskController.taskDeleteProductCart);

module.exports = router;