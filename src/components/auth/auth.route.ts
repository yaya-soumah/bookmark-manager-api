import { Router } from 'express'

import { validate } from '../../middleware/validate.middleware'

import { register, login, refreshToken } from './auth.controller'
import { AuthSchema, LoginSchema } from './auth.schema'

const router = Router()

router.post('/register', validate(AuthSchema), register)
router.post('/login', validate(LoginSchema), login)
router.post('/refresh', refreshToken)

export default router
