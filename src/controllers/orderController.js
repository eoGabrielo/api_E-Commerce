const Order = require("../models/Order");
const Cart = require("../models/Cart");

module.exports = class TaskController {

    static async taskCreatedOrder(req, res) {
        //Cria pedido com base na existencia do carrinho
        try {
            const userId = req.user.id

            //Buscar carrinho do user
            const cart = await Cart.findOne({ user: userId }).populate("items.product");

            if (!cart || cart.items.length === 0) {
                res.status(400).json({ message: "Carrinho não encontrado ou vazio" });
            };

            //Calc total do preco dos produtos
            const totalPrice = cart.items.reduce((acc, item) => {
                return acc + (item.product.preco * item.quantity)
            }, 0);

            //Cria pedido com base no carrinho
            const order = new Order({
                user: userId,
                items: cart.items.map(item => ({
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
    }


    static async taskListAllOrders(req, res) {
        //Listar todos pedidos do usuario
        try {
            const id = req.user.id

            const orders = await Order.findById(id).populate("items.product");

            if (orders === null) {
                return res.status(200).json({ message: "Não existe pedido!" });
            }

            res.status(200).json(orders);

        } catch (err) {
            res.status(500).json({ message: " Erro ao listar pedidos", error: err.message });
        };
    }


    static async taskListOrderId(req, res) {
        //Lista pedido especifico
        try {
            const order = await Order.findById({ _id: req.params.id, user: req.user.id }).populate("items.product");

            if (!order) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            };

            res.json(order);

        } catch (err) {
            res.status(500).json({ message: "Erro ao buscar pedido", error: err.message });
        };
    }
    static async taskUpdateStatusOrder(req, res) {
        //Atualizar status do pedido (admin)
        try {
            const { status } = req.body

            //Verificar se role===admin{

            //}

            const order = await Order.findByIdAndUpdate(
                req.params.id,
                { status: status },
                { new: true }
            );

            if (!order) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            res.json(order);

        } catch (err) {
            res.status(500).json({ message: "Erro ao atualizar status do pedido", error: err.message });
        }
    }

}