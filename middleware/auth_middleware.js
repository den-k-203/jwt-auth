const jwt = require('jsonwebtoken')
const { logger } = require('../logger_conf/logger_conf')
require('dotenv').config()

const config = {
    secret_key_access: process.env.SECRET_KEY_JWT_ACCESS,
    secret_key_refresh: process.env.SECRET_KEY_JWT_REFRESH
}

class AuthMiddleware{
    static check_access_token = (req, res, next) => {
        try{
            const token_access = req.headers.authorization.split(" ")[1]
            if(!token_access){
                return res.status(403).json()
            }
            
            jwt.verify(token_access, config.secret_key_access)
            next()
        }catch(e){
            if (e.name === 'TokenExpiredError') {
                res.status(404).json()
            }else{
                logger.error(e)
                res.status(404).json()
            }
        }
    }

    static check_refresh_token = (req, res, next) => {
        try{
            const { refresh_token } = req.body
            if(refresh_token){
                jwt.verify(refresh_token, config.secret_key_refresh)
            }
        }catch(e){

        }
    }
}

module.exports = AuthMiddleware