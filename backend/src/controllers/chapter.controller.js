// import dependencies
import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import chapterService from '../services/chapter.service.js'

// create world
const createChapter = asyncHandler( async (req, res) => {
    const { storyId, title, content, order, isPublished} = req.body
    const clerkId = req.user.sub
    const chapter = await chapterService.createChapter(
        {
            storyId,
            title,
            content,
            order,
            isPublished
        },
        clerkId
    )
    return apiResponse.successResponse(
        res,
        201,
        "Chapter created successfully",
        chapter
    )
})

// getWorldItem by story
const getChaptersByStory = asyncHandler ( async (req, res) => {
    const storyId = req.params.storyId
    const clerkId = req.user.sub
    const chapters = await chapterService.getChaptersByStory(
        storyId,
        clerkId
    )
    return apiResponse.successResponse(
        res, 
        200,
        "Chapter fetched successfully",
        chapters
    )
})

// getrelation by id
const getChapterById = asyncHandler( async (req, res) => {
    const chapterId = req.params.id
    const clerkId = req.user.sub
    const chapter = await chapterService.getChapterById(
        chapterId,
        clerkId
    )
    return apiResponse.successResponse(
        res,
        200,
        "Chapter fetched successfully",
        chapter
    )
})

// update world
const updateChapter = asyncHandler( async (req, res) => {
    const chapterId = req.params.id
    const clerkId = req.user.sub
    const updateData = req.body
    const chapter = await chapterService.updateChapter(
        chapterId,
        clerkId,
        updateData
    )
    return apiResponse.successResponse(
        res, 
        200,
        "Chapter updated successfully",
        chapter
    )
})

// delete world 
const deleteChapter = asyncHandler ( async (req, res) => {
    const chapterId = req.params.id
    const clerkId = req.user.sub
    const chapter = await chapterService.deleteChapter(
        chapterId,
        clerkId
    )
    return apiResponse.successResponse(
        res, 
        200,
        "Chapter deleted successfully",
        chapter
    )
})

export default {
    createChapter,
    getChaptersByStory,
    getChapterById,
    updateChapter,
    deleteChapter
}