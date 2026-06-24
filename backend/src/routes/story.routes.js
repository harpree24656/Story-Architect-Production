// import express and neccesary things
import express from 'express'
const router  = express.Router()
import { authMiddleware } from '../middleware/auth.middleware.js'
import validMiddleware from '../middleware/validate.middleware.js'
import storyController from '../controllers/story.controller.js'

router.post('/', authMiddleware, validMiddleware, storyController.createStory)
router.get('/', authMiddleware, storyController.getStories)
router.get('/:id', authMiddleware, storyController.getStoryById)
router.put('/:id', authMiddleware, validMiddleware, storyController.updateStoryById)
router.delete('/:id', authMiddleware, storyController.deleteStoryById)

export default router