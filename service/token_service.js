require('dotenv').config()
const jwt = require('jsonwebtoken')

const config_jwt = { 
    secret_key_access: process.env.SECRET_KEY_JWT_ACCESS,
    secret_key_refresh: process.env.SECRET_KEY_JWT_REFRESH,
    expires_in_refresh: process.env.EXPIRES_IN_JWT_REFRESH,
    expires_in_access: process.env.EXPIRES_IN_JWT_ACCESS
}

class GenerateToken{
    static generateRefreshToken = (user) => {
        return jwt.sign({username: user.username, first_name: user.first_name, second_name: user.second_name, email: user.email}, config_jwt.secret_key_refresh, { expiresIn: config_jwt.expires_in_refresh})
    }

    static generateAccessToken = (token) => {
        return jwt.sign({token: token}, config_jwt.secret_key_access, { expiresIn: config_jwt.expires_in_access})
    }
}

module.exports = GenerateToken