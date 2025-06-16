const Cart = require('../models/cartModel');

exports.getAllCartItems = (req, res) => {
    Cart.getAll((err, items) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }

        res.status(200).json({
            status: 'success',
            data: items,
            count: items.length
        });
    });
};

exports.getCartByUserId = (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({
            status: 'fail',
            message: '用户ID不能为空'
        });
    }

    Cart.getUserCart(userId, (err, items) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }

        res.status(200).json({
            status: 'success',
            data: items,
            count: items.length
        });
    });
};

exports.addToCart = (req, res) => {
    const { cart_user_id, product_id, quantity, price_at_add } = req.body;

    if (!cart_user_id || !product_id || !quantity || !price_at_add) {
        return res.status(400).json({
            status: 'fail',
            message: '缺少必填参数: cart_user_id, product_id, quantity 或 price_at_add'
        });
    }

    Cart.addItem(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message.includes('FOREIGN KEY')
                    ? '关联的用户或商品不存在'
                    : err.message
            });
        }

        res.status(201).json({
            status: 'success',
            data: {
                cart_id: result.cart_id,
                ...req.body
            }
        });
    });
};

exports.updateCartItem = (req, res) => {
    const cartId = req.params.id;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        return res.status(400).json({
            status: 'fail',
            message: '数量必须大于0'
        });
    }

    Cart.updateItem(cartId, quantity, (err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }

        res.status(200).json({
            status: 'success',
            message: '购物车商品数量已更新'
        });
    });
};

exports.removeFromCart = (req, res) => {
    const cartId = req.params.id;

    Cart.removeItem(cartId, (err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }

        res.status(200).json({
            status: 'success',
            message: '商品已从购物车移除'
        });
    });
};

exports.clearCart = (req, res) => {
    const userId = req.params.id;

    Cart.clearUserCart(userId, (err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message
            });
        }

        res.status(200).json({
            status: 'success',
            message: '购物车已清空'
        });
    });
};
