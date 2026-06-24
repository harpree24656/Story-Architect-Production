import express from 'express'
const router  = express.Router()
import { authMiddleware } from '../middleware/auth.middleware.js'
import validMiddleware from '../middleware/validate.middleware.js'
import characterController from '../controllers/character.controller.js'

// create
router.post('/', authMiddleware, validMiddleware, characterController.createCharacter)
router.get('/story/:storyId', authMiddleware, characterController.getCharacter)
router.get('/:id', authMiddleware, characterController.getCharacterById)
router.put('/:id', authMiddleware, validMiddleware, characterController.updateCharacterById)
router.delete('/:id', authMiddleware, characterController.deleteCharacterById)

export default router;