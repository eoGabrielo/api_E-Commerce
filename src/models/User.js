const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); //Criptografar senha

//Schema do cadastro do usuario
const userSchema = new mongoose.Schema({
    nome: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    senha: {
        type: String, 
        required: true,
    },
});

//Middleware: Criptografa a senha antes de salvar
userSchema.pre("save", async function(next){
    if(!this.isModified("senha")) return next();//Somente criptografa se a senha mudar
    const salt = await bcrypt.genSalt(10); //Gera salt
    this.senha = await bcrypt.hash(this.senha, salt) // CRIPTOGRAFAR A SENHA
    next()
});

module.exports = mongoose.model("User", userSchema); //Exportar schema Model