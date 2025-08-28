const mongoose = require("mongoose")

//Schema do item do carrinho
const CartItemSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId, //?
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }
});

//Schema do carrinho
const CartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //?
        ref: "User",
        required: true,
        unique: true
    },
    items: [CartItemSchema]
}, {timestamps: true});

module.exports = mongoose.model("Cart", CartSchema);