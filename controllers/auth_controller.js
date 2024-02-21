const { json } = require("sequelize")
const { logger } = require("../logger_conf/logger_conf")
const UserService = require("../service/users_service")
const jwt = require('jsonwebtoken')
const GenerateToken = require("../service/token_service")
require('dotenv').config()

const config = {
    secret_key_refresh: process.env.SECRET_KEY_JWT_REFRESH
}

class AuthController{
    static registration = async (req, res) => {
        try{
            const data = req.body 
            const user = await UserService.registrationUser(data)
            if(!user){
                return res.status(404).json()
            }
            return res.status(201).json(user)
        }catch(e){
            res.status(404).json()
        }
    }

    static login = async (req, res) => {
        try{
            const {login, password} = req.body
            const user = await UserService.loginUser(login, password)
            if(!user){
                return res.status(404).json()
            }
            
            res.cookie("RefreshToken", user.refresh_token)
            res.setHeader('Authorization', `Bearer ${user.access_token}`);
            res.json({
                id: user.id,
                username: user.username,
                first_name: user.first_name,
                second_name: user.second_name,
                email: user.email,
                access_token: user.access_token
            })
        }catch(e){
            res.status(404).json()
        }
    }

    static refreshToken = async (req, res) => {
        try{
            const { refresh_token } = req.body
            const access_token = GenerateToken.generateAccessToken(refresh_token)
            
            res.cookie("RefreshToken", refresh_token)
            res.setHeader('Authorization', `Bearer ${access_token}`);
            return res.json(access_token)
        }catch(e){
            if(e == "TokenExpiredError"){
                logger.warn(e)
                return res.status(404).json()
            }
            logger.error(e)
            return res.status(404).json()
        }
    }

    static getUsers = async (req, res) => {
        try{
            const users = await UserService.getUsers()
            res.json(users)
        }catch(e){
            res.status(404).json()
        }
    }
}

module.exports = AuthController