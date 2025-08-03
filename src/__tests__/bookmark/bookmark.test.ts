import request from 'supertest'

import app from '../../app'
import { userFactory } from '../user/user.factory'
import { folderFactory } from '../folder/folder.factory'
import { tagFactory } from '../tag/tag.factory'

import { bookmarkFactory } from './bookmark.factory'

describe('Bookmark API', () => {
  let bookmarkData: any
  let token = ''
  let tagId: number
  let tagData: any

  beforeAll(async () => {
    const userData = userFactory()
    const res1 = await request(app).post('/api/v1/auth/register').send(userData)
    token = res1.body.data.token
    let userId = res1.body.data.user.id

    const folderData = folderFactory()
    const res2 = await request(app)
      .post('/api/v1/folders')
      .set('Authorization', `Bearer ${token}`)
      .send(folderData)
    let folderId = res2.body.data.id

    bookmarkData = bookmarkFactory({ userId, folderId })

    tagData = tagFactory({ userId })
    const res3 = await request(app)
      .post('/api/v1/tags')
      .set('Authorization', `Bearer ${token}`)
      .send(tagData)
    tagId = res3.body.data.id
  })

  describe('POST /bookmarks', () => {
    it('should create a bookmark without tag', async () => {
      const res = await request(app)
        .post('/api/v1/bookmarks')
        .set('Authorization', `Bearer ${token}`)
        .send(bookmarkData)

      expect(res.status).toBe(201)
      expect(res.body.data.title).toBe('My Docs')
    })

    it('should create bookmark with tag', async () => {
      const res = await request(app)
        .post('/api/v1/bookmarks')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...bookmarkData, tagIds: [tagId] })

      expect(res.status).toBe(201)
    })

    it('should throw error for missing data', async () => {
      const res = await request(app)
        .post('/api/v1/bookmarks')
        .set('Authorization', `Bearer ${token}`)
        .send({})

      expect(res.status).toBe(400)
    })
  })

  describe('GET /bookmarks', () => {
    it('should get all bookmarks', async () => {
      const res = await request(app)
        .get('/api/v1/bookmarks')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(Array.isArray(res.body.data)).toBe(true)
    })

    it('should get all bookmarks filtered by title and url', async () => {
      const res = await request(app)
        .get('/api/v1/bookmarks?q=docs')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(Array.isArray(res.body.data)).toBe(true)
    })

    it('should get all bookmarks filtered by tags', async () => {
      const res = await request(app)
        .get('/api/v1/bookmarks?tagIds=1')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(Array.isArray(res.body.data)).toBe(true)
    })
  })

  describe('GET /bookmarks/:id', () => {
    it('should get a bookmark by id', async () => {
      const res = await request(app)
        .get('/api/v1/bookmarks/1')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body.data.title).toBe('My Docs')
    })

    it('should throw error for wrong id', async () => {
      const res = await request(app)
        .get('/api/v1/bookmarks/5')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(404)
    })
  })

  describe('PATCH /bookmarks/:id', () => {
    it('should update a bookmark', async () => {
      const res = await request(app)
        .patch('/api/v1/bookmarks/1')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Title' })

      expect(res.status).toBe(200)
      expect(res.body.data.title).toBe('Updated Title')
    })
    it('should throw error for wrong id', async () => {
      const res = await request(app)
        .patch('/api/v1/bookmarks/5')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Title' })

      expect(res.status).toBe(404)
      expect(res.body.message).toBe('Bookmark not found')
    })
  })

  describe('POST /bookmarks/:id/tags', () => {
    it('should add tags to bookmarks', async () => {
      const res = await request(app)
        .post('/api/v1/bookmarks/1/tags')
        .set('Authorization', `Bearer ${token}`)
        .send({ tagIds: [tagId] })

      expect(res.status).toBe(200)
    })
    it('should throw error for wrong id', async () => {
      const res = await request(app)
        .post('/api/v1/bookmarks/5/tags')
        .set('Authorization', `Bearer ${token}`)
        .send({ tagIds: [tagId] })

      expect(res.status).toBe(404)
      expect(res.body.message).toBe('Bookmark not found')
    })
  })

  describe('GET /bookmarks/:id/tags', () => {
    it('should get tags list of a bookmark', async () => {
      const res = await request(app)
        .get('/api/v1/bookmarks/1/tags')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(Array.isArray(res.body.data)).toBe(true)
    })
    it('should throw error for wrong id', async () => {
      const res = await request(app)
        .get('/api/v1/bookmarks/5/tags')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(404)
      expect(res.body.message).toBe('Bookmark not found')
    })
  })

  describe('DELETE bookmarks/:id/tags', () => {
    it('should remove tags from a bookmark', async () => {
      const res = await request(app)
        .delete('/api/v1/bookmarks/1/tags')
        .set('Authorization', `Bearer ${token}`)
        .send({ tagIds: [tagId] })

      expect(res.status).toBe(200)
    })
    it('should throw error for wrong id', async () => {
      const res = await request(app)
        .delete('/api/v1/bookmarks/5/tags')
        .set('Authorization', `Bearer ${token}`)
        .send({ tagIds: [tagId] })

      expect(res.status).toBe(404)
      expect(res.body.message).toBe('Bookmark not found')
    })
  })

  describe('DELETE /bookmarks/:id', () => {
    it('should delete a bookmark', async () => {
      const res = await request(app)
        .delete('/api/v1/bookmarks/2')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(204)
    })
    it('should throw error for wrong id', async () => {
      const res = await request(app)
        .delete('/api/v1/bookmarks/5')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(404)
    })
  })
})
