// import mongoose
import mongoose from "mongoose";
import { WORLD_LIBRARY_TYPE } from "../utils/constants.js";
// create schema
const worldSchema = new mongoose.Schema(
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
        type:{
            type: String,
            enum: Object.values(WORLD_LIBRARY_TYPE),
            required: true,
            index: true
        },
        description:{
            type: String,
            required: true
        },
        details:{
            type: String
        }, 
        tags:{
            type: [String],
            default: []
        },
        relatedCharacters:{
            type:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Character"
            }],
            default: []
        },
        imageUrl:{
            type: String,
            default: ''
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
// crete model
const World = mongoose.model("World", worldSchema);
export default World