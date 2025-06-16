const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getAllCartItems);

router.get('/:id', cartController.getCartByUserId);

router.post('/', cartController.addToCart);

router.put('/:id', cartController.updateCartItem);

router.delete('/:id', cartController.removeFromCart);

router.delete('/clear/:id', cartController.clearCart);

module.exports = router;
