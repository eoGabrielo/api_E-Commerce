const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth")

const TaskController = require("../controllers/productController")

//Cria produto
router.post("/products", verifyToken, TaskController.taskCreatedProduct);

//Listar produtos
router.get('/products', TaskController.taskGetProducts)

//Lista produto unico pelo ID
router.get('/products/:id', verifyToken, TaskController.taskGetProductId);

//Atualiza produto de forma Completa
router.put("/products/:id", verifyToken, TaskController.taskUpdateProductAll)

//Deleta produto pelo ID
router.delete("/products/:id", verifyToken, TaskController.taskDeleteProduct)

module.exports = router;