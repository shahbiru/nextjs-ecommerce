const { Router } = require('express');
const router = Router();
const cartController = require('../controllers/cartController');
const authenticateToken = require("../middleware/auth")

router.post('/cart', authenticateToken, cartController.addCart);
router.get('/cart/:id', authenticateToken, cartController.getCart);
router.put('/cart/:id', authenticateToken, cartController.updateCart);
router.delete('/cart/:id', authenticateToken, cartController.deleteCart);

module.exports = router;
