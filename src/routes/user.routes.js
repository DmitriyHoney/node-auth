const route = require('express').Router()
const userController = require('../controllers/user.controllers')

route.post('/signUp', userController.signUp)
route.post('/signIn', userController.signIn)
route.post('/checkSSID', userController.checkSSID)

module.exports = route