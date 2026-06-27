// import dependencies
import apiResponse from '../utils/apiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'
import eventService from '../services/event.service.js'
// create a event
const createEvent = asyncHandler(async (req, res) => {
    const { storyId, title, description, order, eventDate, characters, location } = req.body
    const clerkId = req.user.sub;

    const event = await eventService.createEvent(
        {
            storyId,
            title,
            description,
            order,
            eventDate,
            characters,
            location
        },
        clerkId
    );
    return apiResponse.successResponse(
        res,
        201,
        "Event Created successfully",
        event
    )
})

// get event by stroy
const getEventByStory = asyncHandler( async ( req, res ) => {
    const storyId = req.params.storyId
    const clerkId = req.user.sub
    const events = await eventService.getEventByStory(
        storyId,
        clerkId
    );
    return apiResponse.successResponse(
        res,
        200,
        "Event fetched successfully",
        events
    )
})

// get event by id
const getEventById = asyncHandler( async ( req, res ) => {
    const eventId = req.params.id;
    const clerkId = req.user.sub;
    const event = await eventService.getEventById(
        eventId,
        clerkId
    )
    return apiResponse.successResponse(
        res, 
        200,
        "Event fetched successfully",
        event
    )
})

// update event by id
const updateEvent = asyncHandler( async ( req, res ) => {
    const eventId = req.params.id;
    const clerkId = req.user.sub;
    const updateData = req.body

    const event = await eventService.updateEvent(
        eventId,
        clerkId,
        updateData
    )
    return apiResponse.successResponse(
        res, 
        200,
        "Event updated successfully",
        event
    )
})

// delete event by id
const deleteEvent = asyncHandler( async ( req, res ) => {
    const eventId = req.params.id
    const clerkId = req.user.sub
    const event = await eventService.deleteEvent(
        eventId,
        clerkId
    )
    return apiResponse.successResponse(
        res, 
        200,
        "Event deleted successfully",
        event
    )
})

export default {
    createEvent,
    getEventsByStory,
    getEventById,
    updateEvent,
    deleteEvent
}