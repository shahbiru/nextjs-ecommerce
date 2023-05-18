const { Router } = require('express');
const router = Router();
const productController = require('../controllers/productController');

router.post('/product', productController.createProduct);
router.get('/product/list', productController.getProduct);

module.exports = router;
