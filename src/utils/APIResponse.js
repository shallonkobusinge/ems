const SUCCESS_RESPONSE = (data = null, message = "", status = 200) => {
    return { status: status, success: true, data, message }
}


const ERROR_RESPONSE = (data = null, message = "", status = 400) => {
    return { status: status, success: false, data, message }
}

module.exports = {
    SUCCESS_RESPONSE,
    ERROR_RESPONSE
}