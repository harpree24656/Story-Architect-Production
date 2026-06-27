// import dependencies
import chapterModel from '../models/chapter.model.js'
import storyModel from '../models/story.model.js'

// create chapter
async function createChapter(data, userId) {
    const storyId = data.storyId

    // verify story ownership
    const story = await storyModel.findOne({
        _id: storyId,
        author: userId,
        isDeleted: false
    })

    if (!story) {
        const error = new Error("Story not found")
        error.statusCode = 404
        throw error
    }

    // auto calculate word count
    const wordCount = data.content
        ? data.content.split(' ').filter(word => word !== '').length
        : 0

    // create chapter
    const chapter = await chapterModel.create({
        ...data,
        story: storyId,
        wordCount
    })

    return chapter
}

// get chapters by story
async function getChaptersByStory(storyId, userId) {
    // verify story ownership
    const story = await storyModel.findOne({
        _id: storyId,
        author: userId,
        isDeleted: false
    })

    if (!story) {
        const error = new Error("Story not found")
        error.statusCode = 404
        throw error
    }

    // get chapters sorted by order
    const chapters = await chapterModel.find({
        story: storyId,
        isDeleted: false
    }).sort({ order: 1 })

    return chapters
}

// get chapter by id
async function getChapterById(chapterId, userId) {
    // find chapter
    const chapter = await chapterModel.findOne({
        _id: chapterId,
        isDeleted: false
    })

    if (!chapter) {
        const error = new Error("Chapter not found")
        error.statusCode = 404
        throw error
    }

    // verify story ownership
    const story = await storyModel.findOne({
        _id: chapter.story,
        author: userId,
        isDeleted: false
    })

    if (!story) {
        const error = new Error("Story not found")
        error.statusCode = 404
        throw error
    }

    return chapter
}

// update chapter
async function updateChapter(chapterId, userId, updateData) {
    // find chapter
    const chapter = await chapterModel.findOne({
        _id: chapterId,
        isDeleted: false
    })

    if (!chapter) {
        const error = new Error("Chapter not found")
        error.statusCode = 404
        throw error
    }

    // verify story ownership
    const story = await storyModel.findOne({
        _id: chapter.story,
        author: userId,
        isDeleted: false
    })

    if (!story) {
        const error = new Error("Story not found")
        error.statusCode = 404
        throw error
    }

    // auto calculate word count if content updated
    if (updateData.content) {
        updateData.wordCount = updateData.content
            .split(' ')
            .filter(word => word !== '')
            .length
    }

    // protect sensitive fields
    delete updateData.story
    delete updateData.isDeleted

    // update chapter
    Object.assign(chapter, updateData)
    await chapter.save()

    return chapter
}

// delete chapter
async function deleteChapter(chapterId, userId) {
    // find chapter
    const chapter = await chapterModel.findOne({
        _id: chapterId,
        isDeleted: false
    })

    if (!chapter) {
        const error = new Error("Chapter not found")
        error.statusCode = 404
        throw error
    }

    // verify story ownership
    const story = await storyModel.findOne({
        _id: chapter.story,
        author: userId,
        isDeleted: false
    })

    if (!story) {
        const error = new Error("Story not found")
        error.statusCode = 404
        throw error
    }

    // soft delete
    chapter.isDeleted = true
    await chapter.save()

    return chapter
}

export default {
    createChapter,
    getChaptersByStory,
    getChapterById,
    updateChapter,
    deleteChapter
}