
// handle error
const asyncHandler = (controllerFunction) => {
    return (req, res, next) => {
        return Promise
        .resolve(controllerFunction(req, res, next))
        .catch((error) => next(error))
    }
}
export default asyncHandler;