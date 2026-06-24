// import mongoDB for story model
import mongoose from 'mongoose'
import { STORY_STATUS } from '../utils/constants.js'

// create story Schema
const storySchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            author: true,
            trim: true, 
            index: true
        },
        description:{
            type: String,
            required: true
        },
        genre:{
            type: String,

        },
        coverImage:{
            type: String,
            default: ''
        },
        status:{
            type: String,
            enum: Object.values(STORY_STATUS),
            default: STORY_STATUS.DRAFT
        },
        isPublic:{
            type: Boolean,
            default: false
        },
        isDeleted:{
            type: Boolean,
            default: false
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        tags: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
)

// create model
const Story = mongoose.model("Story", storySchema)
export default Story;