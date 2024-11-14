const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    price: { type: Number, required: true },
    priceBefore: { type: Number },
    seller: { type: String, required: true },
    saves: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    rating: { type: Number, default: 0.0 },
    inStock: { type: Boolean, required: true, default: false },
    quantity: { type: Number, required: true, default: 0 },
    colorOptions: [ {
      colorName: { type: String },
      colorValue: { type: String },
      colorImg: { type: String },
      colorQuantity: { type: Number },
    }],
    specifications: [ {
      specName: { type: String },
      specValue: { type: String },
    }],
    reviews: [ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
