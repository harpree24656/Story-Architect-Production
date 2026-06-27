// import dependencies 
import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import  storyService from '../services/story.service.js'

// create a story
const createStory = asyncHandler(async (req, res) => {
    const {title, description, genre, coverImage, status, tags} = req.body
    const clerkId = req.user.sub 
   
    const story = await storyService.createStory({
        title,
        description,
        genre,
        coverImage,
        status,
        tags
    }, clerkId)
    return apiResponse.successResponse(
        res, 
        201,
        "Story created successfully",
        story
    )
})

// get the story 
const getStoriesByUser = asyncHandler(async (req, res) => {
    const clerkId = req.user.sub;
    const { page = 1, limit = 10 } = req.query;
    const stories = await storyService.getStoriesByUser(
        clerkId, {
            page,
            limit
        }
    );
    return apiResponse.successResponse(
        res, 
        200,
        "Stories fetch successfully",
        stories
    )
})

// get story by id 
const getStoryById = asyncHandler(async ( req, res) => {
    const storyId = req.params.id;
    const clerkId = req.user.sub;
    const story = await storyService.getStoryById(
        storyId,
        clerkId
    );
    return apiResponse.successResponse(
        res, 
        200, 
        "Story fetched successfully",
        story
    )
})

// update story
const updateStory = asyncHandler(async (req, res) => {
    const storyId = req.params.id;
    const clerkId = req.user.sub;
    const updateData = req.body

    const story = await storyService.updateStory(   
        storyId,
        clerkId,
        updateData
    )
    return apiResponse.successResponse(
        res,
        200,
        "Story updated successfully",
        story
    )
})

// delete story
const deleteStory = asyncHandler(async (req, res) => {
    const storyId = req.params.id;
    const clerkId = req.user.sub;

    const story = await storyService.deleteStory(   
        storyId,
        clerkId
    );
    return apiResponse.successResponse(
        res,
        200,
        "Story deleted successfully",
        story
    )
})

export default {
   createStory,
   getStoriesByUser,
   getStoryById,
   updateStory,
   deleteStory
}