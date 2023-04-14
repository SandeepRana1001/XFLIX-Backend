const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


module.exports = {
    PORT,
    MONGO_URI,
    MONGO_OPTIONS
}