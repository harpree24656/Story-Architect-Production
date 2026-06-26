//import express and other
import express from 'express'
const router = express.Router()

import { authMiddleware } from '../middleware/auth.middleware.js'
import { validateMiddleware } from '../middleware/validate.middleware.js'
import chapterController from '../controllers/chapter.controller.js'

router.post('/', authMiddleware, validateMiddleware, chapterController.createChapter)
router.get('/story/:storyId', authMiddleware, chapterController.getChaptersByStory)
router.get('/:id', authMiddleware, chapterController.getChapterById)
router.put('/:id', authMiddleware, validateMiddleware, chapterController.updateChapter)
router.delete('/:id', authMiddleware, chapterController.deleteChapter)

export default router