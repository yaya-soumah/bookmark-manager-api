import { Router } from 'express'

import { validate } from '../../middleware/validate.middleware'

import { createOne, getList, getOneById, updateOne, deleteOne } from './folder.controller'
import { FolderSchema } from './folder.schema'

const router = Router()

router.post('/', validate(FolderSchema), createOne)
router.get('/', getList)
router.get('/:id', getOneById)
router.patch('/:id', validate(FolderSchema), updateOne)
router.delete('/:id', deleteOne)

export default router
