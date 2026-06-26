// import dependies
import storyModel from '../models/story.model.js'
import characterModel from '../models/character.model.js'
import relationModel from '../models/relation.model.js'

// create Realtion
async function createRelation(data, userId){
    const storyId = data.storyId
    const story = await storyModel.findOne({
        _id: storyId,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }
    // characterfrom
    const fromCharacter = await characterModel.findOne({
        _id: data.fromCharacter,
        story: storyId,
        isDeleted: false
    })
    if(!fromCharacter){
        const error = new Error("fromCharacter is not found")
        error.statusCode = 404
        throw error
    }
    // characterto
    const toCharacter = await characterModel.findOne({
        _id: data.toCharacter,
        story: storyId,
        isDeleted: false
    })
    if(!toCharacter){
        const error = new Error("toCharacter is not found")
        error.statusCode = 404
        throw error
    }
    // prevent to selfrelation
    if(data.fromCharacter.toString() === data.toCharacter.toString()){
        const error = new Error("character should not relation to itself")
        error.statusCode = 400
        throw error
    }
    // create realtion
    const relation = await relationModel.create({
        story: storyId,
        fromCharacter: data.fromCharacter,
        toCharacter: data.toCharacter,
        relationshipType: data.relationshipType,
        description: data.description
    })
    return relation
}

// getRealtion by story
async function getRelationByStory(storyId, userId){
    const story = await storyModel.findOne({
        _id: storyId,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }
    // find relationship
    const relations = await relationModel.find({
        story: storyId,
        isDeleted: false
    })
    // populate from and to cahracter
    .populate("fromCharacter")
    .populate("toCharacter");

    return relations;
}
// getRealtion by id
async function getRelationById(relationId, userId){
    const relation = await relationModel.findOne({
        _id: relationId,
        isDeleted: false
    })
    .populate("fromCharacter")
    .populate("toCharacter")

    if(!relation){
        const error = new Error("relation is not found")
        error.statusCode = 404
        throw error
    }
    const story = await storyModel.findOne({
        _id: relation.story,
        author: userId,
        isDeleted: false
    })

    if (!story) {
        const error = new Error("Story not found");
        error.statusCode = 404;
        throw error;
    }
    return relation;
}

// update user by id
async function updateRelation(userId, relationId, updateData){
    const relation = await relationModel.findOne({
        _id: relationId,
        isDeleted: false
    })
    if(!relation){
        const error = new Error("relation is not found")
        error.statusCode = 404
        throw error
    }
    const story = await storyModel.findOne({
        _id: relation.story,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }
    // characterfrom 
    if(updateData.fromCharacter){
        const fromCharacter = await characterModel.findOne({
            _id: updateData.fromCharacter,
            story: relation.story,
            isDeleted: false
        })
    
        if(!fromCharacter){
            const error = new Error("fromCharacter is not found")
            error.statusCode = 404
            throw error
        }
    }
    // characterto
    if(updateData.toCharacter){
        const toCharacter = await characterModel.findOne({
            _id: updateData.toCharacter,
            story: relation.story,
            isDeleted: false
        })
        if(!toCharacter){
            const error = new Error("toCharacter is not found")
            error.statusCode = 404
            throw error
        }
    }
    
    // prevent to selfrelation
    const fromCharacterId = updateData.fromCharacter || relation.fromCharacter;
    const toCharacterId = updateData.toCharacter || relation.toCharacter;
    if(fromCharacterId.toString() === toCharacterId.toString()){
        const error = new Error("character should not relation to itself")
        error.statusCode = 400
        throw error
    }
    delete updateData.story
    delete updateData.isDeleted
    Object.assign(relation, updateData)
    await relation.save()
    return relation
}

// delete relation with id
async function deleteRelation(userId, relationId){
    const relation = await relationModel.findOne({
        _id: relationId,
        isDeleted: false
    })
    if(!relation){
        const error = new Error("relation is not found")
        error.statusCode = 404
        throw error
    }
    const story = await storyModel.findOne({
        _id: relation.story,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }
    relation.isDeleted = true
    await relation.save()
    return relation
}

export default {
    createRelation,
    getRelationByStory,
    getRelationById,
    updateRelation,
    deleteRelation
}