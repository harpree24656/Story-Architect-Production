// import for character service
import characterModel from '../models/character.model.js'
import storyModel from '../models/story.model.js'

// create character
async function createCharacter(data, userId){
    const story = await storyModel.findOne({
        _id: data.storyId,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }
    const character = await characterModel.create({
        ...data,
        story: data.storyId
    })
    return character;
}
// getCharacter
async function getCharactersByStory(storyId, userId){
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
    const character = await characterModel.find({
        story: storyId,
        isDeleted: false
    })
    return character
}
// getcharacter by id
async function getCharacterById(characterId, userId){
    const character = await characterModel.findOne({
        _id: characterId,
        isDeleted: false 
    })
    if(!character){
        const error = new Error("character is not found")
        error.statusCode = 404
        throw error
    }
    const story = await storyModel.findOne({
        _id: character.story,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }
    return character
}

// update charcter by id
async function updateCharacter(characterId, userId, updateData){
    const character = await characterModel.findOne({
        _id: characterId,
        isDeleted: false
    })
    if(!character){
        const error = new Error("Character is not found")
        error.statusCode = 404
        throw error
    }
    const story = await storyModel.findOne({
        _id: character.story,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }

    delete updateData.story;
    delete updateData.isDeleted;

    Object.assign(character, updateData)
    await character.save()
    return character
}

// delete character by id
async function deleteCharacter(characterId, userId){
    const character = await characterModel.findOne({
        _id: characterId,
        isDeleted: false
    })
    if(!character){
        const error = new Error("character is not found")
        error.statusCode = 404
        throw error
    }
    const story = await storyModel.findOne({
        _id: character.story,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }
    character.isDeleted = true;
    await character.save()
    return character
}

export default {
    createCharacter,
    getCharactersByStory,
    getCharacterById,
    updateCharacter,
    deleteCharacter
}