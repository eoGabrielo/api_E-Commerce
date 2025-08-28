const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const verifyToken = require("../middlewares/auth");


//Cria pedido com base na existencia do carrinho
router.post("/orders", verifyToken, async(req, res) => {
    const userId = req.user.id

    //Buscar carrinho do user
    const cart = await Cart.findOne({user: userId}).populate("items.product");

    if(!cart || cart.items.length === 0){
        res.status(400).json({message: "Carrinho não encontrado ou vazio"})
    };


})


module.exports = router;