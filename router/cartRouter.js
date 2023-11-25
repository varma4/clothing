const express = require('express')
const router = express.Router()
const cartController = require('../controller/cartController')
router.route('/addItem').post(cartController.addTocart)
router.route('/getCartItems/:currentUser').get(cartController.getCartItems)
router.route('/delete/:userId/:productId').delete(cartController.removeCartItem)

module.exports = router