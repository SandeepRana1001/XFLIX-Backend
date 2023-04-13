const ApiError = require('../utils/APIError')

const validate = (id)=>{
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return false
    } 
}

module.exports = validate