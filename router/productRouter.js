const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')
const logincontroller = require('../controller/loginController')

const checkRole = require('../middleware/roleMiddleware')

router.route('/').post( checkRole('admin') ,productController.createProduct)
router.route('/products').get(productController.getAllProducts)

module.exports = router