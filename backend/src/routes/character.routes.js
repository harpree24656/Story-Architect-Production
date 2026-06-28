import express from 'express'
const router  = express.Router()
import { authMiddleware } from '../middleware/auth.middleware.js'
import { validateMiddleware } from '../middleware/validate.middleware.js'
import characterController from '../controllers/character.controller.js'

// create
router.post('/', authMiddleware, validateMiddleware, characterController.createCharacter)
router.get('/story/:storyId', authMiddleware, characterController.getCharactersByStory)
router.get('/:id', authMiddleware, characterController.getCharacterById)
router.put('/:id', authMiddleware, validateMiddleware, characterController.updateCharacter)
router.delete('/:id', authMiddleware, characterController.deleteCharacter)

export default router;