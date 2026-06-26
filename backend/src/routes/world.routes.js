// import router 
import express from 'express'
const router = express.Router();
import { authMiddleware } from '../middleware/auth.middleware.js'
import { validateMiddleware } from '../middleware/validate.middleware.js'
import worldController from '../controllers/world.controller.js'

router.post('/', authMiddleware, validateMiddleware, worldController.createWorld)
router.get('/story/:storyId', authMiddleware, worldController.getWorldByStory)
router.get('/:id', authMiddleware, worldController.getWorldById)
router.put('/:id', authMiddleware, validateMiddleware, worldController.updateWorld)
router.delete('/:id', authMiddleware, worldController.deleteWorldById)

export default router