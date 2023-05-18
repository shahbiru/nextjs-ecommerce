const { Router } = require('express');
const router = Router();
const cartController = require('../controllers/cartController');

router.post('/cart', cartController.productCart);
router.get('/cart/:id', cartController.getCart);
router.put('/cart/:id', cartController.updateCart);
router.delete('/cart/:id', cartController.deleteCart);

module.exports = router;
