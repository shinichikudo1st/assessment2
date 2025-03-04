import express from 'express'
import { CreateAccount, UserLogin, UserLogout, ChangePassword, ChangeEmail } from './controllers.js'
import { authenticateToken } from './middleware.js'

const router = express.Router()

router.post('/api/users/add', CreateAccount)
router.post('/api/users/login', UserLogin)
router.post('/api/users/logout', authenticateToken, UserLogout)
router.put('/api/users/change-password', authenticateToken, ChangePassword)
router.put('/api/users/change-email', authenticateToken, ChangeEmail)

export default router
