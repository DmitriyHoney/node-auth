const route = require('express').Router()
const userController = require('../controllers/user.controllers')

route.post('/signUp', userController.signUp)
route.post('/signIn', userController.signIn)
route.post('/checkSSID', userController.checkSSID)
route.post('/forgetPassword', userController.forgetPassword)
route.post('/resetPassword', userController.resetPassword)

module.exports = route