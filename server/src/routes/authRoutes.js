const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authController');

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);

module.exports = router;
