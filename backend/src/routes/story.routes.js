// import express and neccesary things
import express from 'express'
const router  = express.Router()
import { authMiddleware } from '../middleware/auth.middleware.js'
import { validateMiddleware } from '../middleware/validate.middleware.js'
import storyController from '../controllers/story.controller.js'

router.post('/', authMiddleware, validateMiddleware, storyController.createStory)
router.get('/', authMiddleware, storyController.getStories)
router.get('/:id', authMiddleware, storyController.getStoryById)
router.put('/:id', authMiddleware, validateMiddleware, storyController.updateStoryById)
router.delete('/:id', authMiddleware, storyController.deleteStoryById)

export default router