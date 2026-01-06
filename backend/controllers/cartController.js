const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add product to cart with stock validation 3
exports.addToCart = async (req, res) => {
    // const userId = req.user.id; // Extract userId from the JWT, not the request body
    // const { productId, quantity } = req.body;
    const { userId, productId, quantity } = req.body; // Get userId from the body

    try {
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if there is enough stock
        if (product.quantity < quantity) {
            return res.status(400).json({
                message: `Insufficient stock. Only ${product.quantity} items available.`,
            });
        }

        // Find or create a cart for the user
        let cart = await Cart.findOne({ userId });
        if (cart) {
            const productInCart = cart.products.find(
                (item) => item.productId == productId
            );
            if (productInCart) {
                // Check if the new total quantity exceeds available stock
                if (productInCart.quantity + quantity > product.quantity) {
                    return res.status(400).json({
                        message: `Insufficient stock. Only ${product.quantity} items available.`,
                    });
                }
                productInCart.quantity += quantity; // Update quantity in the cart
            } else {
                // Add new product to the cart
                cart.products.push({ productId, quantity });
            }
            await cart.save();
        } else {
            // Create a new cart for the user if none exists
            cart = new Cart({
                userId,
                products: [{ productId, quantity }],
            });
            await cart.save();
        }

        // Update product stock
        product.quantity -= quantity;
        await product.save();

        res.status(200).json(cart);
    } catch (err) {
        console.error("Error adding product to cart:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get the cart contents for a user
exports.getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId }).populate(
            "products.productId",
            "title price"
        );
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error getting cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update the quantity of a product in the cart
exports.updateQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(
            (item) => item.productId === productId
        );
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error updating quantity:", error);
        res.status(500).json({ message: "Server error" });
    }
};