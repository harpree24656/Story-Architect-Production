// import mongoose
import mongoose from 'mongoose'

// create user schema
const userSchema = new mongoose.Schema(
    {
        clerkId:{
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        username:{
            type: String,
            required:true,
            trim: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName:{
            type: String,
            trim: true
        },
        imageUrl:{
            type: String,
            default: ''
        },
        plan:{
            type: String,
            enum: ["free", "pro", "ultra"],
            default: 'free'
        }
    },
    {
        timestamps: true
    }
)
// create a model 
const Users = mongoose.model("User", userSchema);
// export the user
export default Users;