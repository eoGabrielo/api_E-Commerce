const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const verifyToken = require("../middlewares/auth");

// Adicionar produto ao carrinho
router.post("/cart", verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    try {
        //"cart" é o carrinho que tem dentro uma chave "items(array)" que são os produtos.

        let cart = await Cart.findOne({ user: userId }); //Verifica pelo id do usuario se tem algum carrinho criado no banco de dados. (cada id do usuario é um carrinho...)

        if (!cart) {
            //Caso não tenha um carrinho, ele vai criar um no banco de dados
            cart = new Cart({ user: userId, items: [] })
        };

        //Verifica se o produto ja esta no banco de dados
        const existingItem = cart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity; //add quantidade, se o produto ja estiver no carrinho
        } else {
            cart.items.push({ product: productId, quantity }); //add o produto se não estiver no carrinho
        };

        await cart.save();
        res.status(200).json(cart);

    } catch (err) {
        res.status(500).json({ message: "Erro ao adicionar produto ao carrinho", error: err.message });
    }

});

//Lista itens do carrinho
router.get("/cart", verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.user.id}).populate("items.product");//.populate = retornar todos os dados com base no id e na config correta no Schema.
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: "Erro ao listar carrinho", error: err.message });
    }
});

//Remover produto do carrinho
router.delete("/cart/:productId", verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.user.id});

        if (!cart) {
            return res.status(404).json({ message: "Carrinho não encontrado" });
        };

        cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);//Oque for diferente do id do produto que quero remover, ele vai criar um novo array com todos menos ele.
        await cart.save();
    } catch (err) {
        res.status(500).json({ message: "Erro ao remover produto do carrinho", error: err.message });
    }
});

module.exports = router;