import { Router } from 'express'

import { validate } from '../../middleware/validate.middleware'

import { createOne, getList, getOne, updateOne, deleteOne } from './tag.controller'
import { TagSchema } from './tag.schema'

const router = Router()

router.post('/', validate(TagSchema), createOne)
router.get('/', getList)
router.get('/:id', getOne)
router.patch('/:id', validate(TagSchema), updateOne)
router.delete('/:id', deleteOne)

export default router
