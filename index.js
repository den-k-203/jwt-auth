const express = require('express')
const dotenv = require('dotenv')
const { logger, init_file_logger } = require('./logger_conf/logger_conf')

dotenv.config()

const app = express()

const SERVER = process.env.PORT || 2222

const start = async () => {
    try{
        await init_file_logger()
        app.listen(SERVER, () => {
            logger.info(`Server started on port ${SERVER}`)
        })
    }catch(e){
        logger.error(e)
    }
}

start()