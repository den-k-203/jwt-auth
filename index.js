const express = require('express')
const dotenv = require('dotenv')
const { logger, init_file_logger } = require('./logger_conf/logger_conf')
const auth_route = require('./route/auth_route')
const cors = require('cors')

dotenv.config()

const app = express()
const SERVER = process.env.PORT || 2222

app.use(express.json());
app.use(cors())
app.use('/api/v1', auth_route)


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