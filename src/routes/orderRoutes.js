const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const verifyToken = require("../middlewares/auth");


//Cria pedido com base na existencia do carrinho
router.post("/orders", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id

        //Buscar carrinho do user
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            res.status(400).json({ message: "Carrinho não encontrado ou vazio" });
        };

        //Calc total do preco dos produtos
        const totalPrice = cart.items.reduce((acc, item) => {
            return acc + (item.product.price * item.quantity)
        }, 0);

        //Cria pedido com base no carrinho
        const order = new Order({
            user: userId,
            item: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalPrice: totalPrice
        });

        await order.save();

        //Limpar carrinho apos pedido
        cart.items = [];
        await cart.save();

        res.status(201).json({ order });
    } catch (err) {
        res.status(500).json({ message: "Erro ao criar pedido", error: err.message });
    };

});

//Listar todos pedidos do usuario
router.get("/orders", verifyToken, async (req, res) => {
    try {
        const orders = await Order.findById({ user: req.user.id }).populate("items.product");

        res.json(orders);

    } catch (err) {
        res.status(500).json({ message: " Erro ao listar pedidos", error: err.message });
    };
});

//Lista pedido especifico
router.get("/orders/:id", verifyToken, async (req, res) => {
    try {
        const order = await Order.findById({ _id: req.params.id, user: req.user.id }).populate("items.products");

        if (!order) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        };

        res.json(order);

    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar pedido", error: err.message });
    };

});

//Atualizar status do pedido (admin)
router.patch("orders/:id/status", verifyToken, async (req, res) => {
    try {
        const { status } = req.body

        //Verificar se role===admin{

        //}

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true }
        );

        if(!order){
            return res.status(404).json({message: "Pedido não encontrado"});
        }

        res.json(order);

    } catch (err) {
        res.status(500).json({ message: "Erro ao atualizar status do pedido", error: err.message });
    }
})

module.exports = router;