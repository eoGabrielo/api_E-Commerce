const mongoose = require("mongoose");

const productSheema = new mongoose.Schema({
    nome: {type: String, require: true},
    descricao: String,
    preco: {type: Number, require: true},
    estoque: {type: Number, default: 0}
}, {timestamps: true }); //Cria automaticamente Data de criação do objeto "createdAt" e ultima atualização "updatedAt".

module.exports = mongoose.model("Product", productSheema);