import { Router } from 'express'

import { validate } from '../../middleware/validate.middleware'

import {
  createOne,
  getList,
  getOneById,
  updateOne,
  deleteOne,
  addTagsToBookmark,
  removeTagsFromBookmark,
  getTagsFromBookmark,
} from './bookmark.controller'
import { BookmarkSchema, BookmarkUpdateSchema } from './bookmark.schema'

const router = Router()

router.post('/', validate(BookmarkSchema), createOne)
router.get('/', getList)
router.get('/:id', getOneById)
router.patch('/:id', validate(BookmarkUpdateSchema), updateOne)
router.delete('/:id', deleteOne)
router.post('/:id/tags', addTagsToBookmark)
router.delete('/:id/tags', removeTagsFromBookmark)
router.get('/:id/tags', getTagsFromBookmark)

export default router
