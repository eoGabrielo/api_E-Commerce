const express = require("express") //Criar servidor
const mongoose = require("mongoose") //ODM P/MongoDB
const dotenv = require("dotenv") // variaveis de ambiente
const cors = require("cors") //liberar acesso externo
const userRoutes = require("./routes/userRoutes"); //Import routas do usuario
const productRoutes = require("./routes/productRoutes"); //Import routas dos produtos
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config(); //carrega variaveis do .env
const app = express() //Usando as func do express na var "app."
app.use(express.json()); //permite receber JSON no body
app.use(cors()); //acesso de outros dominios

app.use(userRoutes, productRoutes, cartRoutes, orderRoutes); // Ter acesso as rotas do sistema.

//Rota teste
app.get('/', (req, res) => {
    res.send("API E-commerce está rodando")
});

//Conectar ao banco de dados

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("- - - - - - - - - - - - - -> Conectado ao MongoDB!");

        const PORT = process.env.PORT || 5000
        app.listen(PORT || 5000, () => {
            console.log("- - - - - - - - - - - - - -> Servidor rodando na porta: " + PORT)
        });

    } catch (err) {
        console.error("Erro ao conectar ao MongoDB: " + err.message)
        process.exit(1);
    }

}

startServer();

