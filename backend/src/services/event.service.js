// import some neccessary files
import storyModel from "../models/story.model.js";
import characterModel from "../models/character.model.js"
import eventModel from "../models/event.model.js"

// createEvent
async function createEvent(data, userId){
    const storyId = data.storyId;
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
    
    if(data.characters && data.characters.length > 0){
        const character = await characterModel.find({
            _id: { $in: data.characters},
            story: storyId,
            isDeleted: false
        })
        if(character.length !== data.characters.length){
            const error = new Error("one or more characters are invalid")
            error.statusCode = 400
            throw error
        }
    }
    const event = await eventModel.create({
        ...data,
        story: storyId
    })
    return event
}

// getEvent by story
async function getEventByStory(storyId, userId){
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
    const event = await eventModel.find({
        story: storyId,
        isDeleted: false
    }).sort({order: 1})

    return event
}

// getEvent by story id
async function getEventById(eventId, userId){
    const event = await eventModel.findOne({
        _id: eventId,
        isDeleted: false
    })
    if(!event){
        const error = new Error("event is not found")
        error.statusCode = 404
        throw error
    }
    const story = await storyModel.findOne({
        _id: event.story,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }
    return event;
}

// update event
async function updateEvent(eventId, userId, updateData){
    const event = await eventModel.findOne({
        _id: eventId,
        isDeleted: false
    })
    if(!event){
        const error = new Error("event is not found")
        error.statusCode = 404
        throw error
    }
    const story = await storyModel.findOne({
        _id: event.story,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }
    if(updateData.characters && updateData.characters.length > 0){
        const character = await characterModel.find({
            _id: {$in: updateData.characters},
            story: event.story,
            isDeleted:false
        })
        if(character.length !== updateData.characters.length){
            const error = new Error("one or more characters are invalid")
            error.statusCode = 400
            throw error
        }
    }
    delete updateData.story
    delete updateData.isDeleted
    Object.assign(event, updateData)
    await event.save()
    return event  
}

// delete event
async function deleteEvent(eventId, userId){
    const event = await eventModel.findOne({
        _id: eventId,
        isDeleted: false
    })
    if(!event){
        const error = new Error("event is not found")
        error.statusCode = 404
        throw error
    }
    const story = await storyModel.findOne({
        _id: event.story,
        author: userId,
        isDeleted: false
    })
    if(!story){
        const error = new Error("story is not found")
        error.statusCode = 404
        throw error
    }
    event.isDeleted = true
    await event.save()
    return event
}

export default {
    createEvent,
    getEventByStory,
    getEventById,
    updateEvent,
    deleteEvent
}