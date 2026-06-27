// import dependencies
import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import characterService from '../services/character.service.js'

// creaate character
const createCharacter = asyncHandler(async (req, res) => {
    const {storyId, name, role, description, traits, backstory, appearance, isAlive} = req.body
    const clerkId = req.user.sub;

    const character  = await characterService.createCharacter({
        storyId, 
        name, 
        role, 
        description, 
        traits, 
        backstory, 
        appearance, 
        isAlive 
    }, clerkId)
    return apiResponse.successResponse(
        res, 
        201,
        "Character created successfully",
        character
    )
})

// get characters by story
const getCharactersByStory = asyncHandler(async (req, res) => {
    const storyId = req.params.storyId;
    const clerkId = req.user.sub;
    const characters  = await characterService.getCharactersByStory(
        storyId,
        clerkId
    )
    return apiResponse.successResponse(
        res, 
        200,
        "Characters fetched successfully",
        characters
    )
})

// get character by id
const getCharacterById = asyncHandler(async (req, res) => {
    const characterId = req.params.id
    const clerkId = req.user.sub

    const character =  await characterService.getCharacterById(
        characterId, 
        clerkId
    )
    return apiResponse.successResponse(
        res, 
        200,
        "Character found successfully",
        character
    )
})
// update character
const updateCharacter = asyncHandler(async (req, res) => {
    const characterId = req.params.id
    const clerkId = req.user.sub
    const updateData = req.body

    const character = await characterService.updateCharacter(
        characterId,
        clerkId,
        updateData
    )
    return apiResponse.successResponse(
        res, 
        200,
        "Character updated successfully",
        character
    )
})

// delete character 
const deleteCharacter = asyncHandler(async (req, res) => {
    const characterId = req.params.id
    const clerkId = req.user.sub

    const character = await characterService.deleteCharacter(
        characterId,
        clerkId
    )
    return apiResponse.successResponse(
        res, 
        200,
        "character deleted successfully",
        character
    )
})

export default {
    createCharacter,
    getCharactersByStory,
    getCharacterById,
    updateCharacter,
    deleteCharacter
}