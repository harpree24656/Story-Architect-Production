// import express and another routes paths 
import express from 'express'
import user from './user.routes.js'
import storyRoute from './story.routes.js'
import characterRoute from './character.routes.js'
import eventRoute from './event.routes.js'
import relationRoute from './relation.routes.js'
import worldRoute from './world.routes.js'
import chapterRoute from './chapter.routes.js'

// access route
const router  = express.Router()

// declare all route
router.use('/users', user)
router.use('/stories', storyRoute)
router.use('/characters', characterRoute)
router.use('/events', eventRoute)
router.use('/relations', relationRoute)
router.use('/worlds', worldRoute)
router.use('/chapters', chapterRoute)

export default router;