// import mongoose
import mongoose from "mongoose";

// create schema
const chapterSchema = new mongoose.Schema(
    {
        story:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Story",
            required: true,
            index: true
        },
        title:{
            type: String,
            required: true,
            trim: true,
            index: true
        },
        content:{
            type: String,
            required: true
        },
        order:{
            type: Number,
            required: true,
            index: true
        },
        isPublished:{
            type: Boolean,
            default: false
        },
        wordCount:{
            type: Number,
            default: 0
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
const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter