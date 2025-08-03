import { Router } from 'express'

import { authenticateToken } from '../../middleware/auth.middleware'
import { upload } from '../../middleware/uploads.middleware'
import { validate } from '../../middleware/validate.middleware'
import { authorizeRole } from '../../middleware/requireRole.middleware'

import { getAll, updateProfile, get, remove, updatePassword, updateAvatar } from './user.controller'
import { UpdatePasswordSchema, UpdateSchema } from './user.schema'

const router = Router()

router.use(authenticateToken)

router.get('/', authorizeRole('admin'), getAll)
router.get('/profile', get)
router.patch('/profile', validate(UpdateSchema), updateProfile)
router.delete('/:id', authorizeRole('admin'), remove)
router.patch('/profile/password', validate(UpdatePasswordSchema), updatePassword)
router.patch('/profile/avatar', upload.single('avatar'), updateAvatar)

export default router
