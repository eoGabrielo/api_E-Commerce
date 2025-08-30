const Product = require("../models/Product");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class TaskController {

    static async taskCreatedProduct(req, res){
        //Cria produto
        try{
                const product =  new Product(req.body);
                await product.save();
                res.status(201).json(product);
            }catch(err){
                res.status(500).json({message: "Erro ao criar produto", error: err.message});
            }
    }

    static async taskGetProducts(req, res){
        //Listar produtos
         try{
                const product = await Product.find();
                res.json(product);
            }catch(err){
                res.status(500).json({message: "Erro ao buscar produtos.", error: err.message})
            }
    }

    static async taskGetProductId(req, res){
        //Lista produto unico pelo ID
        try{
                const productId = req.params.id; //Pega ID da URL
        
                const product = await Product.findById(productId);
        
                res.json(product);
            }catch(err){
                res.status(500).json({message: "Erro ao buscar produtos.", error: err.message})
            }
    }

    static async taskUpdateProductAll(req, res){
        //Atualiza produto de forma Completa
        try{
                const {nome, descricao, preco, estoque} = req.body
        
                const id = req.params.id; //Pega ID da URL
        
                //Atualiza o produto
                const updateProduct = await Product.findByIdAndUpdate(id, {nome, descricao, preco, estoque}, 
                {new: true, //retorna o documento já atualizado
                runValidators: true} //Mantem a regra do schema
            );
        
                if(!updateProduct){
                    return res.status(404).json({message: "Produto não encontrado"})
                }
        
                res.json(updateProduct); //Retorna produto atualizado no res
            }catch(err){
                res.status(500).json({message: "Erro ao atualizar o produto.", error: err.message});
            }
    }

    static async taskDeleteProduct(req, res){
        //Deleta produto pelo ID
         try{
                const id = req.params.id; //Pega ID da URL
                
                const deleteProduct = await Product.findByIdAndDelete(id);
        
                //Caso não ache o produto
                if(!deleteProduct){
                    res.status(404).json({message: "Produto não encontrado"})
                };
        
                res.json({message: "Produto deletado com sucesso"});
            }catch(err){
                res.status(500).json({message: "Falha ao excluir o produto.", error: err.message})
            }
    }





}

