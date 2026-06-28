// import router 
import express from 'express'
const router = express.Router();
import { authMiddleware } from '../middleware/auth.middleware.js'
import { validateMiddleware } from '../middleware/validate.middleware.js'
import worldController from '../controllers/world.controller.js'

router.post('/', authMiddleware, validateMiddleware, worldController.createWorldItem)
router.get('/story/:storyId', authMiddleware, worldController.getWorldItemsByStory)
router.get('/:id', authMiddleware, worldController.getWorldItemsById)
router.put('/:id', authMiddleware, validateMiddleware, worldController.updateWorldItem)
router.delete('/:id', authMiddleware, worldController.deleteWorldItem)

export default router