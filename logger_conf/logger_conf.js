const winston = require('winston')
const fs = require('fs').promises

const folder_name = "./logs"
const file_name = ".log"
const full_path = `${folder_name}/${file_name}`

const checkOrCreateFolder = async (folderPath) => {
    try {
      await fs.access(folderPath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        try {
          await fs.mkdir(folderPath, { recursive: true });
        } catch (err) {
          throw (`Error creating folder "${folderPath}":`, err);
        }
      } else {
        throw(`Error accessing folder "${folderPath}":`, error);
      }
    }
  }


const checkOrCreateFile = async (filePath) => {
    try {
      await fs.access(filePath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        try {
          await fs.writeFile(filePath, '');
        } catch (err) {
          throw (`Error creating file "${filePath}":`, err);
        }
      } else {
        throw (`Error accessing file "${filePath}":`, error);
      }
    }
  }

const init_file_logger = async () => {
    try{
        await checkOrCreateFolder(folder_name)
        await checkOrCreateFile(full_path)
    }catch(e){
        throw e
    }
}

const logger = winston.createLogger({
    format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} [${level}]: ${message}`
            })
    ),
    transports: [
        new winston.transports.File({
            filename: full_path,
        }),
        new winston.transports.Console()
    ]
})

module.exports = {logger, init_file_logger}