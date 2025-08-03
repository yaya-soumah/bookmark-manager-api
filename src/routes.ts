import { Router } from 'express'

import { authenticateToken } from './middleware/auth.middleware'
import authRouter from './components/auth/auth.route'
import usersRouter from './components/users/user.routes'
import folderRouter from './components/folders/folder.routes'
import bookmarkRouter from './components/bookmarks/bookmark.routes'
import tagRouter from './components/tags/tag.routes'

const router = Router()

router.use('/auth', authRouter)

router.use(authenticateToken)
router.use('/users', usersRouter)
router.use('/folders', folderRouter)
router.use('/bookmarks', bookmarkRouter)
router.use('/tags', tagRouter)

export default router
