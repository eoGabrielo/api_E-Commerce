
# 🛒 E-commerce API

API de e-commerce construída com **Node.js**, **Express** e **MongoDB**, organizada na arquitetura **MVC** (Model-View-Controller).  
O projeto inclui funcionalidades de **usuários, produtos, carrinho e pedidos**, além de autenticação JWT e proteção de rotas.  
Este projeto foi desenvolvido como prática de backend e conta com documentação interativa via **Swagger**.

---

## 🚀 Funcionalidades

### 👤 Usuários
- Registro (`/register`) com senha criptografada (**bcrypt**).
- Login (`/login`) com autenticação **JWT**.
- Proteção de rotas via middleware `verifyToken`.

### 📦 Produtos
- CRUD completo:
  - Criar produto (`POST /products`)
  - Listar todos produtos (`GET /products`)
  - Buscar produto por ID (`GET /products/:id`)
  - Atualizar produto (`PUT /products/:id`)
  - Deletar produto (`DELETE /products/:id`)

### 🛒 Carrinho
- Adicionar produto ao carrinho (`POST /cart`)
- Listar itens do carrinho (`GET /cart`)
- Remover produto do carrinho (`DELETE /cart/:productId`)
- Carrinho sempre associado a um único usuário

### 📑 Pedidos
- Criar pedido a partir do carrinho (`POST /orders`)
- Listar pedidos do usuário (`GET /orders`)
- Detalhes de um pedido específico (`GET /orders/:id`)
- Atualizar status do pedido (admin) (`PATCH /orders/:id/status`)

---

## 🛠 Tecnologias Utilizadas
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Arquitetura MVC**
- **JWT (JSON Web Tokens)** → autenticação
- **Bcrypt** → criptografia de senhas
- **Cors** → habilitar requisições externas
- **Dotenv** → variáveis de ambiente
- **Swagger UI** → documentação interativa da API

---

## 📌 Documentação da API (Swagger)

Você pode acessar a documentação interativa da API com **Swagger** no seguinte link (O servidor precisa está rodando...):  

```

http://localhost:5000/api-docs

```

## ⚡ Estrutura do Projeto (MVC)

```

src/
├─ controllers/        # Controladores → lógica das rotas
│  ├─ userController.js
│  ├─ productController.js
│  ├─ cartController.js
│  └─ orderController.js
│
├─ models/             # Modelos (dados/esquemas do MongoDB)
│  ├─ User.js
│  ├─ Product.js
│  ├─ Cart.js
│  └─ Order.js
│
├─ routes/             # Rotas → chamam os controllers
│  ├─ auth.js
│  ├─ products.js
│  ├─ cart.js
│  └─ orders.js
│
├─ middlewares/        # Middlewares (ex: autenticação)
│  └─ auth.js
│
├─ config/             # Conexão com banco e configs
│  └─ db.js
│
└─ index.js            # Arquivo principal do servidor

````

---

## ⚡ Rotas Principais

### 👤 Usuários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /register | Registrar usuário |
| POST   | /login    | Login usuário e gerar token |

### 📦 Produtos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | /products | Listar produtos |
| GET    | /products/:id | Buscar produto por ID |
| POST   | /products | Criar produto (admin) |
| PUT    | /products/:id | Atualizar produto |
| DELETE | /products/:id | Deletar produto |

### 🛒 Carrinho
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | /cart | Listar itens do carrinho |
| POST   | /cart | Adicionar produto ao carrinho |
| DELETE | /cart/:productId | Remover produto do carrinho |

### 📑 Pedidos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /orders | Criar pedido a partir do carrinho |
| GET    | /orders | Listar pedidos do usuário |
| GET    | /orders/:id | Detalhes de pedido específico |
| PATCH  | /orders/:id/status | Atualizar status do pedido (admin) |

---

## 🔑 Como usar

1. Clone o projeto:

```bash
git clone https://github.com/seu-usuario/ecommerce-api.git
````

2. Instale as dependências:

```bash
npm install
```

3. Configure seu arquivo `.env`:

```
MONGO_URI=Sua_URI_do_MongoDB
JWT_SECRET=SuaChaveSecreta
PORT=5000
```

4. Rode o servidor:

```bash
npm run dev
```

5. Acesse a documentação Swagger:

```
http://localhost:5000/api-docs
```

6. Teste as rotas via Postman ou Swagger UI.

---

## 📦 Observações

* Para rotas protegidas, envie o token JWT no header `Authorization` no formato:
  `Bearer SEU_TOKEN`.
* Todos os dados sensíveis (senhas) são **criptografados**.
* O carrinho é único por usuário, não é necessário criar/deletar manualmente.
* Swagger permite testar endpoints sem precisar de Postman.
