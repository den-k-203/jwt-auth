const { logger } = require('../../logger_conf/logger_conf')
const User = require('../models/user')

class UserRequests{
    static createUser = async (data) => {
        try{
            const user = await User.create(data)
            return user
        }catch(e){
            logger.error("User not created! Error:", e)
        }
    }

    static getUser = async (id) => {
        try{
            const user = await User.findByPk(id)
            if(!user){
                return null
            }
            return user.toJSON()
        }catch(e){
            logger.error("The user was not retrieved from the database. Error:", e)
        }
    }

    static getUsers = async () => {
        try{
            const users = await User.findAll()
            if(!users){
                return []
            }
            
            const users_json = []
            
            for(const usr of users){
                users_json.push(usr.toJSON())
            }
            
            return users_json
        }catch(e){
            logger.error("The users was not retrieved from the database. Error:", e)
        }
    }

    static removeUser = async (id) => {
        try{
            const user = await User.findByPk(id)
            if(user){
                return await user.destroy()
            }
            return null
        }catch(e){
            logger.error("The user was not removed from the database. Error:", e)
        }
    }

    static updateUser = async (userEdit) => {
        try{
            const user = await User.findByPk(userEdit.id)
            if(user){
                await user.update(userEdit)
                return user.toJSON()
            }
            return null
        }catch(e){
            logger.error("The user was not retrieved from the database. Error:", e)
        }
    }
}

module.exports = UserRequests