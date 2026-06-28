// import express
import express from 'express'
const router =  express.Router()

import { authMiddleware } from '../middleware/auth.middleware.js'
import { validateMiddleware } from '../middleware/validate.middleware.js'
import relationController from '../controllers/relation.controller.js'

router.post('/', authMiddleware, validateMiddleware, relationController.createRelation)
router.get('/story/:storyId', authMiddleware, relationController.getRelationByStory)
router.get('/:id', authMiddleware, relationController.getRelationById)
router.put('/:id', authMiddleware, validateMiddleware, relationController.updateRelation)
router.delete('/:id', authMiddleware, relationController.deleteRelation)

export default router