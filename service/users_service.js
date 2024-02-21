const bcrypt = require('bcrypt');
const UserRequests = require("../database/requests/user");
const GenerateToken = require("./token_service");
const { logger } = require('../logger_conf/logger_conf');

class UserService{
    static registrationUser = async (user) => {
        const users = await UserRequests.getUsers()

        let check
        if(users){
            check = users.find(el => el.email == user.email || el.username == user.username)
        }

        if(!check){
            const refresh_token = GenerateToken.generateRefreshToken({ 
                username: user.username,
                first_name: user.first_name, 
                second_name: user.second_name, 
                email: user.email
            }) 

            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(user.password, salt);
            
            user.refresh_token = refresh_token
            user.password = hashed_password
            logger.info("User created successful!")
            return await UserRequests.createUser(user)
        }
        return null
    }

    static loginUser = async (login, password) => {
        const users = await UserRequests.getUsers()
        let user = users.find(el => el.email == login || el.username == login)
        
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const token = GenerateToken.generateRefreshToken(user)
                const access_token = GenerateToken.generateAccessToken(token)
                
                user.refresh_token = token

                user = await UserRequests.updateUser(user)
                return {
                    id: user.id,
                    username: user.username,
                    first_name: user.first_name,
                    second_name: user.second_name,
                    email: user.email,
                    refresh_token: user.refresh_token,
                    access_token: access_token,
                }
            }
        }
        return null
    }

    static getUsers = async () => {
        const users = await UserRequests.getUsers()
        if(!users){
            return []
        }
        return users
    }
} 

module.exports = UserService