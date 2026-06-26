// import dependenices
import storyModel from '../models/story.model.js'
import characterModel from '../models/character.model.js' 
import worldModel from '../models/world.model.js'

// create world
async function createWorldItem(data, userId){
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
    if(data.relatedCharacters && data.relatedCharacters.length > 0){
        const character = await characterModel.find({
            _id:{$in: data.relatedCharacters},
            story: storyId,
            isDeleted: false
        })
        if(character.length !== data.relatedCharacters.length){
            const error = new Error("on or more characters are invalid")
            error.statusCode = 400
            throw error
        }
    }
    const world = await worldModel.create({
        ...data,
        story: storyId
    })
    return world;
}

// getWroldItems by story
async function getWorldItemsByStory(storyId, userId){
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
    const worlds = await worldModel.find({
        story: storyId,
        isDeleted: false
    })
    return worlds
}

// getWorldItem by id
async function getWorldItemsById(worldId, userId){
    const worldItem = await worldModel.findOne({
        _id: worldId,
        isDeleted: false
    })
    if(!worldItem){
        const error = new Error("world item is not found")
        error.statusCode = 404
        throw error
    }
    const story = await storyModel.findOne({
        _id: worldItem.story,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }
    return worldItem
}

// updateWorld Item
async function updateWorldItem(worldId, userId, updateData){
    const worldItem = await worldModel.findOne({
        _id: worldId,
        isDeleted: false
    })
    if(!worldItem){
        const error = new Error("worldItem is not found")
        error.statusCode = 404
        throw error
    }
    const story = await storyModel.findOne({
        _id: worldItem.story,
        author: userId,
        isDeleted: false
    });
    if (!story) {
        const error = new Error("Story not found");
        error.statusCode = 404;
        throw error;
    }

    if(updateData.relatedCharacters){
        const relatedCharacters = await characterModel.find({
            _id: { $in: updateData.relatedCharacters },
            story: worldItem.story,
            isDeleted: false
        })
        if (relatedCharacters.length !== updateData.relatedCharacters.length) {
            const error = new Error("One or more characters are invalid");
            error.statusCode = 400;
            throw error;
        }
    }
    
    delete updateData.story
    delete updateData.isDeleted
    Object.assign(worldItem, updateData)
    await worldItem.save();
    return worldItem
}

// delete Item
async function deleteWorldItem(worldId, userId){
    const worldItem = await worldModel.findOne({
        _id: worldId,
        isDeleted: false
    })
    if(!worldItem){
        const error = new Error("world is not found")
        error.statusCode = 404
        throw error
    }
    const story = await storyModel.findOne({
        _id: worldItem.story,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }
    worldItem.isDeleted = true
    await worldItem.save()
    return worldItem
}

export default {
    createWorldItem,
    getWorldItemsByStory,
    getWorldItemsById,
    updateWorldItem,
    deleteWorldItem
}