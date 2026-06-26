// import express
import express from 'express'
const router = express.Router()

import { authMiddleware } from '../middleware/auth.middleware.js'
import { validateMiddleware } from '../middleware/validate.middleware.js'
import getEventsByStory from '../controllers/event.controller.js'

router.post('/', authMiddleware, validateMiddleware, getEventsByStory.createEvent)
router.get('/story/:storyId', authMiddleware, getEventsByStory.getEvent)
router.get('/:id', authMiddleware, getEventsByStory.getEventById)
router.put('/:id', authMiddleware, validateMiddleware, getEventsByStory.updateEvent)
router.delete('/:id', authMiddleware, getEventsByStory.deleteEvent)

export default router