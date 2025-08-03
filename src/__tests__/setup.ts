import sequelize, { setupModels } from '../config/database.config'
// import { User } from '../components/models/index'

setupModels(sequelize)

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Only for test
})

// afterEach(async () => {
//   // Optional: truncate tables between tests
//   await User.destroy({ where: {} })
// })

afterAll(async () => {
  await sequelize.close()
})
