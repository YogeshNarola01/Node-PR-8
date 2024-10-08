const express = require('express')
const router = express.Router()
router.use('/auth',require('../routes/authRoutes'))
router.use('/forgot',require('../routes/forgotRoutes'))
router.use('/category',require('./categoryRoutes'))
router.use('/subcategory',require('./subcategoryRoutes'))
router.use('/exsubcategory',require('./exsubcategoryRoutes'))
router.use('/product',require('./productRoutes'))
module.exports = router