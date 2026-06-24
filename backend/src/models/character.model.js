// import mongoDB in characters
import mongoose from 'mongoose'
import { CHARACTER_ROLE } from '../utils/constants.js'

// create schema
const characterSchema = new mongoose.Schema (
    {
        story:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Story",
            required: true,
            index: true
        },
        name:{
            type: String,
            required: true,
            trim: true,
            index: true
        },
        role:{
            type: String,
            enum: Object.values(CHARACTER_ROLE),
            default: CHARACTER_ROLE.SUPPORTING
        },
        description:{
            type: String,

        },
        traits: {
            type: [String],
            default: []
        },
        backstory:{
            type: String
        },
        appearance:{
            type: String
        },
        isAlive:{
            type: Boolean,
            default: true
        },
        isDeleted:{
            type: Boolean,
            default: false
        }        
    },
    {
        timestamps: true
    }
)

// create model
const Character = mongoose.model("Character", characterSchema)
export default Character