const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authController');

router.post('/signin', authController.signin);

module.exports = router;
