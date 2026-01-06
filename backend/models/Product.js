const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        categories: { type: Array },
        price: { type: Number, required: true },
        priceBefore: { type: Number },
        seller: { type: String, required: true },
        saves: { type: Number, default: 0 },
        sold: { type: Number, default: 0 },
        rating: { type: Number, default: 0.0 },
        inStock: { type: Boolean, required: true, default: false },
        quantity: { type: Number, required: true, default: 0 },
        selections: [{
            type: {
                type: String,
            },
            name: String,
            options: [{
                name: String,
                value: String
            }]
        }],
        specifications: [{
            specName: { type: String },
            specValue: { type: String },
        }],
        reviews: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            author: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5,
            },
            comment: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            images: {
                type: Array,
                default: [],
            }
        }],
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
