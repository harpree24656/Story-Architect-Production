// import mongoDB
import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
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
        description:{
            type: String,
            required: true
        },
        order:{
            type: Number,
            required: true,
            index: true
        },
        eventDate:{
            type: Date
        },
        involved:{
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Character"
            }],
            default: []
        },
        location:{
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
const Event = mongoose.model("Event", eventSchema)
export default Event