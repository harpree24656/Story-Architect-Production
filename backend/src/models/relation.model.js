// import mogoose 
import mongoose from 'mongoose'
import { RELATIONSHIP_TYPE } from '../utils/constants.js'

// create schema
const relationshipSchema = new mongoose.Schema(
    {
        story:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Story",
            required: true,
            index: true
        },
        fromCharacter :{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Character",
            required: true,
            index: true
        },
        toCharacter:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Character",
            required: true,
            index: true
        },
        relationshipType:{
            type: String,
            enum: Object.values(RELATIONSHIP_TYPE),
            required: true
        },
        description:{
            type: String
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
const Relation = mongoose.Schema("Relation", relationshipSchema)
export default Relation;