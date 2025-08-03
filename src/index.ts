import { config } from 'dotenv'

import sequelize, { setupModels } from './config/database.config'
import logger from './config/logger'
import app from './app.js'

config()

const PORT = process.env.PORT || 8080

async function startServer() {
  try {
    await sequelize.authenticate()
    setupModels(sequelize)

    logger.info('Database connected successfully')
    app.listen(PORT, () => {
      logger.info(`Server listening on http://localhost:${PORT}/api/v1/`)
    })
  } catch {
    logger.error('Failed to start')
  }
}
startServer()
