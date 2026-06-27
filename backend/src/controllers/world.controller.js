// import dependencies
import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import worldService from '../services/world.service.js'

// create world
const createWorldItem = asyncHandler( async (req, res) => {
    const { storyId, name, type, description, details, tags, relatedCharacters, imageUrl } = req.body
    const clerkId = req.user.sub
    const worldItem = await worldService.createWorldItem(
        {
            storyId,
            name,
            type,
            description,
            details,
            tags,
            relatedCharacters,
            imageUrl
        },
        clerkId
    )
    return apiResponse.successResponse(
        res,
        201,
        "World Item created successfully",
        worldItem
    )
})

// getWorldItem by story
const getWorldItemsByStory = asyncHandler ( async (req, res) => {
    const storyId = req.params.storyId
    const clerkId = req.user.sub
    const worldItems = await worldService.getWorldItemsByStory(
        storyId,
        clerkId
    )
    return apiResponse.successResponse(
        res, 
        200,
        "World Item fetched successfully",
        worldItems
    )
})

// getrelation by id
const getWorldItemsById = asyncHandler( async (req, res) => {
    const worldItemId = req.params.id
    const clerkId = req.user.sub
    const worldItem = await worldService.getWorldItemsById(
        worldItemId,
        clerkId
    )
    return apiResponse.successResponse(
        res,
        200,
        "World Item fetched successfully",
        worldItem
    )
})

// update world
const updateWorldItem = asyncHandler( async (req, res) => {
    const worldItemId = req.params.id
    const clerkId = req.user.sub
    const updateData = req.body
    const worldItem = await worldService.updateWorldItem(
        worldItemId,
        clerkId,
        updateData
    )
    return apiResponse.successResponse(
        res, 
        200,
        "World Item updated successfully",
        worldItem
    )
})

// delete world 
const deleteWorldItem = asyncHandler ( async (req, res) => {
    const worldItemId = req.params.id
    const clerkId = req.user.sub
    const worldItem = await worldService.deleteWorldItem(
        worldItemId,
        clerkId
    )
    return apiResponse.successResponse(
        res, 
        200,
        "World Item deleted successfully",
        worldItem
    )
})
export default {
    createWorldItem,
    getWorldItemsByStory,
    getWorldItemsById,
    updateWorldItem,
    deleteWorldItem
}