const { Router } = require('express');
const router = Router();
const productController = require('../controllers/productController');
const authenticateToken = require("../middleware/auth")


router.post('/product', authenticateToken, productController.createProduct);
router.get('/product', authenticateToken, productController.getProduct);

module.exports = router;
