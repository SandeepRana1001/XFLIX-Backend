const httpStatus = require('http-status')
const mongoose = require('mongoose')
const APIError = require('../utils/APIError')

const videoSchema = mongoose.Schema({
    videoLink: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        validate(value) {
            const string = 'youtube.com/embed/'
            let regex = new RegExp('\\b(' + string + ')\\b');
            let res = value.match(regex)

            if (!res) {
                throw new APIError(httpStatus.BAD_REQUEST, 'Video Link should be youtub video embedded link')
            }
        }
    },
    title: {
        type: String,
        required: true,
        trim: true,
        min: 3,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        validate(val) {
            const genre = ["education", "sports", "movies", "comedy", "lifestyle", "all"]
            if (!genre.includes(val.toLowerCase())) {
                throw new APIError(httpStatus.BAD_REQUEST, 'Please provide a correct genre')
            }
        }
    },
    contentRating: {
        type: String,
        required: true,
        trim: true,
        validate(val) {
            const rating = ["anyone", "7+", "12+", "16+", "18+"]
            if (!rating.includes(val.toLowerCase())) {
                throw new APIError(httpStatus.BAD_REQUEST, 'Please provide a correct Content Rating')
            }
        }
    },
    releaseDate: {
        type: String,
        required:true
    },
    previewImage: {
        type: String,
        required: true,
        min: 3
    },
    votes: {
        upVotes: {
            type: Number,
            required: true,
            default: 0
        },
        downVotes: {
            type: Number,
            required: true,
            default: 0
        }
    },
    viewCount:{
        type:Number,
        default:0
    }
})

const Video = mongoose.model('Video', videoSchema)

module.exports = { Video }