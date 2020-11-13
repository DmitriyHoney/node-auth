const route = require('express').Router()
const roleController = require('../controllers/role.controllers')

route.post('/', roleController.create)

module.exports = route