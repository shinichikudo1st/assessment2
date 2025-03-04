import express from 'express'
import {
  CreateAccount,
  UserLogin,
  UserLogout,
  ChangePassword,
  ChangeEmail,
  UpdateUserInfo,
  UserInfo,
  ForgotPassword,
  ResetPassword,
} from './controllers.js'
import { authenticateToken } from './middleware.js'

const router = express.Router()

router.post('/api/users/add', CreateAccount)
router.post('/api/users/login', UserLogin)
router.post('/api/users/logout', authenticateToken, UserLogout)
router.put('/api/users/change-password', authenticateToken, ChangePassword)
router.put('/api/users/change-email', authenticateToken, ChangeEmail)
router.put('/api/users/change-user-info', authenticateToken, UpdateUserInfo)
router.get('/api/users/info', authenticateToken, UserInfo)
router.post('/api/auth/forgot-password', ForgotPassword)
router.post('/api/auth/reset-password', ResetPassword)

export default router
