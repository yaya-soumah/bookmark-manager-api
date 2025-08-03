import request from 'supertest'

import { userFactory } from '../user/user.factory'
import app from '../../app'

import { tagFactory } from './tag.factory'

describe('tag API', () => {
  let tagData: any
  let userToken = ''

  beforeAll(async () => {
    const userData = userFactory()
    const res1 = await request(app).post('/api/v1/auth/register').send(userData)
    userToken = res1.body.data.token
    let userId = res1.body.data.user.id
    tagData = tagFactory({ userId })
  })

  describe('POST /tags', () => {
    it('Should create a new tag', async () => {
      const res = await request(app)
        .post('/api/v1/tags')
        .set('Authorization', `Bearer ${userToken}`)
        .send(tagData)

      expect(res.status).toBe(201)
      expect(res.body.data.name).toBe('work')
    })

    it('Should throw error for missing data', async () => {
      const res = await request(app)
        .post('/api/v1/tags')
        .set('Authorization', `Bearer ${userToken}`)
        .send({})

      expect(res.status).toBe(400)
    })
  })

  describe('GET /tags', () => {
    it('Should get all tags', async () => {
      const res = await request(app)
        .get('/api/v1/tags/')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })

    it('Should get all tags with filter', async () => {
      const res = await request(app)
        .get('/api/v1/tags/?q=work')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })
    it('Should throw error for wrong filter keyword', async () => {
      const res = await request(app)
        .get('/api/v1/tags/?k=work')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })
  })

  describe('GET /tags/:id', () => {
    it('Should get a tag by id', async () => {
      const res = await request(app)
        .get('/api/v1/tags/1')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(200)
      expect(res.body.data.name).toBe('work')
    })

    it('Should throw error for wrong id', async () => {
      const res = await request(app)
        .get('/api/v1/tags/2')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(404)
    })
  })

  describe('PATCH /tags/:id', () => {
    it('Should update a tag name', async () => {
      const res = await request(app)
        .patch('/api/v1/tags/1')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'updated name' })

      expect(res.status).toBe(200)
      expect(res.body.data.name).toBe('updated name')
    })

    it('Should throw error for wrong id', async () => {
      const res = await request(app)
        .patch('/api/v1/tags/2')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'updated name' })

      expect(res.status).toBe(404)
    })
  })
  describe('DELETE /tags:id', () => {
    it('Should remove a tag by id', async () => {
      const res = await request(app)
        .delete('/api/v1/tags/1')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(204)
    })

    it('Should throw error for wrong id', async () => {
      const res = await request(app)
        .delete('/api/v1/tags/5')
        .set('Authorization', `Bearer ${userToken}`)

      expect(res.status).toBe(404)
    })
  })
})
