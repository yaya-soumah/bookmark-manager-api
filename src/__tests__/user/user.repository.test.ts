import { User } from '../../components/models'
import { UserRepository } from '../../components/users/user.repository'

import { userFactory } from './user.factory'

describe('User Repository', () => {
  afterEach(async () => {
    // Optional: truncate tables between tests
    await User.destroy({ where: {} })
  })

  describe('createUser', () => {
    it('Should create a users', async () => {
      const userData = userFactory()
      const data = await UserRepository.create(userData)

      expect(data).toHaveProperty('id')
      expect(data.email).toBe(userData.email)
      expect(data.username).toBe(userData.username)
      expect(data.role).toBe('user')
    })
  })

  describe('findUserById', () => {
    it('Should find user by id', async () => {
      const userData = userFactory()
      const user = await UserRepository.create(userData)

      const data = await UserRepository.findById(user.id)

      expect(data?.id).toBe(user.id)
      expect(data?.email).toBe(user.email)
    })

    it('Should return null if user not found', async () => {
      const data = await UserRepository.findById(5)

      expect(data).toBeNull()
    })
  })
  describe('findUserByEmail', () => {
    it('Should find user by email', async () => {
      const userData = userFactory()
      const user = await UserRepository.create(userData)

      const data = await UserRepository.findByEmail(user.email)

      expect(data?.id).toBe(user.id)
      expect(data?.email).toBe(user.email)
    })

    it('Should return null if user not found', async () => {
      const data = await UserRepository.findByEmail('invalid@email')

      expect(data).toBeNull()
    })
  })

  describe('findUserByUsername', () => {
    it('Should find user by username', async () => {
      const userData = userFactory()
      const user = await UserRepository.create(userData)

      const data = await UserRepository.findByUsername(user.username)

      expect(data?.id).toBe(user.id)
      expect(data?.username).toBe(user.username)
    })

    it('Should return null if user not found', async () => {
      const data = await UserRepository.findByEmail('invalid@email')

      expect(data).toBeNull()
    })
  })

  describe('findAllUsers', () => {
    it('Should find all users', async () => {
      const data = await UserRepository.findAll(10, 0, {})

      expect(Array.isArray(data.users)).toBeTruthy()
      expect(data.total).toBe(0)
    })
  })
  describe('updateUser', () => {
    it('Should update a user', async () => {
      const userData = userFactory()
      const user = await UserRepository.create(userData)

      const data = await UserRepository.update(user.id, { bio: 'backend developer' })

      expect(data?.id).toBe(user.id)
      expect(data?.bio).toBe('backend developer')
    })
  })
})
