# E-commerce API

API de e-commerce construída com **Node.js**, **Express** e **MongoDB**, incluindo funcionalidades de usuários, produtos, carrinho e pedidos.

---

## 🚀 Funcionalidades

### Usuários
- Registro (`/register`) com senha criptografada.
- Login (`/login`) com autenticação JWT.
- Proteção de rotas via middleware `verifyToken`.

### Produtos
- CRUD completo:
  - Criar produto (`POST /products`)
  - Listar todos produtos (`GET /products`)
  - Buscar produto por ID (`GET /products/:id`)
  - Atualizar produto (`PUT /products/:id`)
  - Deletar produto (`DELETE /products/:id`)

### Carrinho
- Adicionar produto ao carrinho (`POST /cart`)
- Listar itens do carrinho (`GET /cart`)
- Remover produto do carrinho (`DELETE /cart/:productId`)
- Carrinho sempre associado a um único usuário

### Pedidos
- Criar pedido a partir do carrinho (`POST /orders`)
- Listar pedidos do usuário (`GET /orders`)
- Detalhes de um pedido específico (`GET /orders/:id`)
- Atualizar status do pedido (admin) (`PATCH /orders/:id/status`)

---

## 🛠 Tecnologias
- Node.js
- Express
- MongoDB + Mongoose
- JWT (JSON Web Tokens) para autenticação
- Bcrypt para criptografia de senhas
- Cors para requisições externas
- Dotenv para variáveis de ambiente

---

## ⚡ Estrutura do Projeto
```

src/
├─ models/
│  ├─ User.js
│  ├─ Product.js
│  ├─ Cart.js
│  └─ Order.js
├─ routes/
│  ├─ auth.js
│  ├─ products.js
│  ├─ cart.js
│  └─ orders.js
├─ middlewares/
│  └─ auth.js
└─ index.js

````

---

## ⚡ Rotas Principais

### Usuários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /register | Registrar usuário |
| POST   | /login    | Login usuário e gerar token |

### Produtos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | /products | Listar produtos |
| GET    | /products/:id | Buscar produto por ID |
| POST   | /products | Criar produto (admin) |
| PUT    | /products/:id | Atualizar produto |
| DELETE | /products/:id | Deletar produto |

### Carrinho
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET    | /cart | Listar itens do carrinho |
| POST   | /cart | Adicionar produto ao carrinho |
| DELETE | /cart/:productId | Remover produto do carrinho |

### Pedidos
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
cd ecommerce-api
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

5. Teste as rotas via Postman ou outro cliente HTTP.

---

## 📦 Observações

* Para rotas protegidas, envie o token JWT no header `Authorization` no formato: `Bearer SEU_TOKEN`.
* Todos os dados sensíveis (senhas) são criptografados.
* O carrinho é único por usuário, não é necessário criar/deletar manualmente.
