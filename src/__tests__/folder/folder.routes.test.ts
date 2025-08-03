import request from 'supertest'

import app from '../../app'
import { userFactory } from '../user/user.factory'

import { folderFactory } from './folder.factory'

describe('Folder API', () => {
  let folderData: any
  let userToken = ''

  beforeAll(async () => {
    const userData = userFactory()
    const res1 = await request(app).post('/api/v1/auth/register').send(userData)
    userToken = res1.body.data.token
    let userId = res1.body.data.user.id
    folderData = folderFactory({ userId })
  })

  describe('POST /folders', () => {
    it('Should create a new folder', async () => {
      const res = await request(app)
        .post('/api/v1/folders')
        .set('Authorization', `Bearer ${userToken}`)
        .send(folderData)

      expect(res.status).toBe(201)
      expect(res.body.data.name).toBe('my favorites')
    })

    it('Should throw error for missing folder name', async () => {
      const res = await request(app)
        .post('/api/v1/folders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({})

      expect(res.status).toBe(400)
    })
  })

  describe('GET /folders', () => {
    it('Should get all folders', async () => {
      const res = await request(app)
        .get('/api/v1/folders')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })

    it('Should get all folders by filter userID', async () => {
      const res = await request(app)
        .get('/api/v1/folders?userId=1')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })

    it('Should get all folders by filter name', async () => {
      const res = await request(app)
        .get('/api/v1/folders?q=my')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })
  })

  describe('GET /folders/:id', () => {
    it('Should get a folder by id', async () => {
      const res = await request(app)
        .get('/api/v1/folders/1')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(200)
      expect(res.body.data.name).toBe('my favorites')
    })

    it('Should throw error for wrong id', async () => {
      const res = await request(app)
        .get('/api/v1/folders/2')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(404)
    })
  })

  describe('PATCH /folders/:id', () => {
    it('Should update a folder name', async () => {
      const res = await request(app)
        .patch('/api/v1/folders/1')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'updated name' })

      expect(res.status).toBe(200)
      expect(res.body.data.name).toBe('updated name')
    })

    it('Should throw error for wrong id', async () => {
      const res = await request(app)
        .patch('/api/v1/folders/5')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'updated name' })

      expect(res.status).toBe(404)
    })
  })

  describe('DELETE /folders/:id', () => {
    it('Should remove a folder by id', async () => {
      const res = await request(app)
        .delete('/api/v1/folders/1')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(204)
    })
    it('Should throw error for wrong id', async () => {
      const res = await request(app)
        .delete('/api/v1/folders/5')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(404)
    })
  })
})
