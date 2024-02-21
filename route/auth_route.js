const express = require('express')
const AuthController = require('../controllers/auth_controller')
const AuthMiddleware = require('../middleware/auth_middleware')
const route = express.Router()

route.post("/registration", AuthController.registration)
route.post('/login', AuthController.login)
route.get('/users', AuthMiddleware.check_access_token, AuthController.getUsers)
route.post('/refresh', AuthMiddleware.check_refresh_token, AuthController.refreshToken)
module.exports = route

