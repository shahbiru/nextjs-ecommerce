const express = require("express")
const router = express.Router();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

router.use("/", authRoutes);
router.use("/", productRoutes);
router.use("/", cartRoutes);

module.exports = router;