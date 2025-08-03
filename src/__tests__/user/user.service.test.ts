import { UserService } from '../../components/users/user.service'
import { UserRepository } from '../../components/users/user.repository'

import { userFactory } from './user.factory'

const userData = { ...userFactory(), id: 1 }

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getUserById', () => {
    it('Should get user by id', async () => {
      jest.spyOn(UserRepository, 'findById').mockResolvedValue(userData)

      const data = await UserService.getById(userData.id)

      expect(data?.id).toBe(userData.id)
      expect(data?.email).toBe(userData.email)
    })

    it('Should throw error if user not found', async () => {
      jest.spyOn(UserRepository, 'findById').mockResolvedValue(null)

      await expect(UserService.getById(5)).rejects.toThrow('User not found')
    })
  })
  describe('getUserByEmail', () => {
    it('Should get user by email', async () => {
      jest.spyOn(UserRepository, 'findByEmail').mockResolvedValue(userData)
      const data = await UserService.getByEmail(userData.email)

      expect(data.email).toBe(userData.email)
    })

    it('Should throw error if user not found', async () => {
      jest.spyOn(UserRepository, 'findByEmail').mockResolvedValue(null)

      await expect(UserService.getByEmail('invalid@email.com')).rejects.toThrow('User not found')
    })
  })

  describe('getAllUsers', () => {
    it('Should get all users', async () => {
      jest.spyOn(UserRepository, 'findAll').mockResolvedValue(userData)

      const data = await UserService.getAll(1, 10, 0, {})
      expect(data).toHaveProperty('users')
    })
  })
  describe('updateUser', () => {
    it('Should update a user', async () => {
      jest.spyOn(UserRepository, 'update').mockResolvedValue({ ...userData, bio: 'new Update' })

      const data = await UserService.updateProfile(userData.id, { bio: 'new Update' })

      expect(UserRepository.update).toHaveBeenCalledWith(userData.id, { bio: 'new Update' })
      expect(data.id).toBe(userData.id)
    })
    it('Should throw error if a user is not found', async () => {
      jest.spyOn(UserRepository, 'update').mockResolvedValue(null)

      await expect(UserService.updateProfile(5, { bio: 'new Update' })).rejects.toThrow(
        'User not found',
      )
    })
  })

  describe('updateAvatar', () => {
    it('Should update avatar', async () => {
      jest.spyOn(UserRepository, 'findById').mockResolvedValue(userData)
      jest
        .spyOn(UserRepository, 'update')
        .mockResolvedValue({ ...userData, avatar: '/uploads/my-avatar' })

      const data = await UserService.updateAvatar(userData.id, 'my-avatar')

      expect(UserRepository.update).toHaveBeenCalledWith(userData.id, {
        avatar: '/uploads/my-avatar',
      })
      expect(data.id).toBe(userData.id)
      expect(data.avatar).toBe('/uploads/my-avatar')
    })
    it('Should throw error if a user is not found', async () => {
      jest.spyOn(UserRepository, 'findById').mockResolvedValue(null)

      await expect(UserService.updateAvatar(5, 'filename')).rejects.toThrow('User not found')
    })
  })
})
