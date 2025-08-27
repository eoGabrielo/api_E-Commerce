const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const verifyToken = require("../middlewares/auth")

//Rota produto protegido
router.post("/products", verifyToken, async (req, res) =>{
    try{
        const product =  new Product(req.body);
        await product.save();
        res.status(201).json(product);
    }catch(err){
        res.status(500).json({message: "Erro ao criar produto", error: err.message});
    }
});

//Listar produtos
router.get('/products', async (req, res) => {
    try{
        const product = await Product.find();
        res.json(product);
    }catch(err){
        res.status(500).json({message: "Erro ao buscar produtos.", error: err.message})
    }
})

//Listar produtos por ID
router.get('/products/:id', verifyToken, async (req, res) => {
    try{
        const productId = req.params.id; //Pega ID da URL

        const product = await Product.findById(productId);

        res.json(product);
    }catch(err){
        res.status(500).json({message: "Erro ao buscar produtos.", error: err.message})
    }
});

//Atualiza produto de forma Completa com PUT
router.put("/products", verifyToken, async(req, res) => {
    try{
        const {nome, descricao, preco, estoque} = req.body
        
    }catch(err){
        res.status(500).json({message: "Erro ao atualizar o produto.", error: err.message});
    }
})

module.exports = router;