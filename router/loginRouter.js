const express = require(`express`)
const router = express.Router()
const loginController = require('../controller/loginController')
router.route('/signup').post(loginController.signup)
router.route('/login').post(loginController.loginUser)

module.exports = router