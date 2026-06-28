const apiResponse = {
    successResponse(res, statusCode, message, data){
        return res.status(statusCode).json({
            success: true,
            message,
            data
        })
    },
    errorResponse(res, statusCode, message, errors){
        return res.status(statusCode).json({
            success: false,
            message, 
            errors
        })
    }
}
export default apiResponse