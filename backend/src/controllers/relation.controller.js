// import dependencies
import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import relationService from '../services/relation.service.js'

// create relation
const createRelation = asyncHandler( async (req, res) => {
    const { storyId, fromCharacter, toCharacter, relationshipType, description } = req.body
    const clerkId = req.user.sub
    const relation = await relationService.createRelation(
        {
            storyId,
            fromCharacter,
            toCharacter,
            relationshipType,
            description
        },
        clerkId
    )
    return apiResponse.successResponse(
        res,
        201,
        "Realtion created successfully",
        relation
    )
})

// getrelation by story
const getRelationByStory = asyncHandler ( async (req, res) => {
    const storyId = req.params.storyId
    const clerkId = req.user.sub
    const relations = await relationService.getRelationByStory(
        storyId,
        clerkId
    )
    return apiResponse.successResponse(
        res, 
        200,
        "Relations fetched successfully",
        relations
    )
})

// getrelation by id
const getRelationById = asyncHandler( async (req, res) => {
    const realtionId = req.params.id
    const clerkId = req.user.sub
    const realtion = await relationService.getRelationById(
        realtionId,
        clerkId
    )
    return apiResponse.successResponse(
        res,
        200,
        "Relation fetched successfully",
        realtion
    )
})

// update relation
const updateRelation = asyncHandler( async (req, res) => {
    const relationId = req.params.id
    const clerkId = req.user.sub
    const updateData = req.body
    const relation = await relationService.updateRelation(
        relationId,
        clerkId,
        updateData
    )
    return apiResponse.successResponse(
        res, 
        200,
        "Relation updated successfully",
        relation
    )
})

// dlet realtion 
const deleteRelation = asyncHandler ( async (req, res) => {
    const relationId = req.params.id
    const clerkId = req.user.sub
    const relation = await relationService.deleteRelation(
        relationId,
        clerkId
    )
    return apiResponse.successResponse(
        res, 
        200,
        "Relation deleted successfully",
        relation
    )
})
export default {
    createRelation,
    getRelationByStory,
    getRelationById,
    updateRelation,
    deleteRelation
}