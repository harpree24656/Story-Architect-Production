// import dependencies
import apiResponse from '../utils/apiResponse.js'
import userModel from '../models/user.model.js'
import asyncHandler from '../utils/asyncHandler.js'

// create user if not exist
const syncUser = asyncHandler(async (req, res) => {
    const clerkId = req.user.sub;
    const { email, firstName, lastName, imageUrl} = req.user;
    let user = await userModel.findOne({ clerkId })
    if(!user){
        user = await userModel.create({
            clerkId,
            email,
            firstName,
            lastName,
            imageUrl
        })
        return apiResponse.successResponse(
            res,
            201,
            "User created successfully",
            user
        )
    }
    return apiResponse.successResponse(
        res,
        200,
        "User is already exist",
        user
    )
})

// generate user
const getCurrentUser = asyncHandler(async (req, res) => {
    const clerkId = req.user.sub;
    const user = await userModel.findOne({ clerkId })
    
    if(!user){
        const error = new Error("User is not found")
        error.statusCode = 404
        throw error
    }
    return apiResponse.successResponse(
        res,
        200,
        "User fetched successfully",
        user
    )
})

// update user
const updateUser = asyncHandler(async (req, res) => {
    const clerkId = req.user.sub;
    const updateData = { ...req.body };
    
    delete updateData.clerkId;
    delete updateData.email;
    delete updateData.plan;

    const user = await userModel.findOne({ clerkId })
    if(!user){
        const error = new Error("User is not found")
        error.statusCode = 404
        throw error
    }
    Object.assign(user, updateData)
    await user.save()
    return apiResponse.successResponse(
        res,
        200,
        "User updated Successfully",
        user
    )
})

// update plan
const updatePlan = asyncHandler(async (req, res) => {
    const clerkId = req.user.sub;
    const { plan } = req.body

    const allowedPlan = ["free", "pro"]
    if(!allowedPlan.includes(plan)){
        const error = new Error("Invalid plan")
        error.statusCode = 400
        throw error
    }
    const user = await userModel.findOne({ clerkId })
    if(!user){
        const error = new Error("User is not found")
        error.statusCode = 404
        throw error
    }
    user.plan = plan
    await user.save()
    return apiResponse.successResponse(
        res, 
        200,
        "User already exist",
        user
    )
})
export default {
    syncUser,
    getCurrentUser,
    updateUser,
    updatePlan
};