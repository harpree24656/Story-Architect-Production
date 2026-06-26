// import dependencies
import storyModel from '../models/story.model.js'

async function createStory(data, userId){
    const storyData = {
        ...data,
        author: userId
    }
    const createdStory = await storyModel.create(storyData);
    return createdStory; 
}
async function getStoriesByUser(userId, pagination){

    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const stories = await storyModel.find({
        author: userId,
        isDeleted: false
    }).skip(skip).limit(limit)
}
async function getStoryById(storyId, userId){
    const story = await storyModel.findOne({
        _id: storyId,
        author: userId,
        isDeleted: false 
    })
    if(!story){
        const error = new Error("Story is not found");
        error.statusCode = 404;
        throw error;
    }
    return story;
}
async function updateStory(storyId, userId, updateData) {
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
    Object.assign(story, updateData)
    await story.save()
    return story
} 
async function deleteStory(storyId, userId){
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
    story.isDeleted = true
    await story.save()
    return story
}