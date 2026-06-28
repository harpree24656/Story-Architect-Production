// import express
import express from 'express'
const router = express.Router()

// importing some other files
import { authMiddleware } from '../middleware/auth.middleware.js'
import { validateMiddleware  } from '../middleware/validate.middleware.js'
import userController from '../controllers/user.controller.js'

// route
router.get('/me', authMiddleware, userController.getCurrentUser)
router.post('/sync', authMiddleware, userController.syncUser)
router.put('/update', authMiddleware, userController.updateUser)
router.put('/plan', authMiddleware, userController.updatePlan)


export default router