const httpStatus = require('http-status');
const { Video } = require('../model/index');
const ApiError = require('../utils/APIError');

class VideoServices {

    fetchByFilter = async (filter) => {
        let video;
        if (filter['title']) {
            try {
                video = await Video.find({ "title": { $regex: new RegExp(filter['title'], "i") } })
            } catch (err) {
                throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something Went Wrong')
            }
        } else {
            const genres = filter["genres"].split(',')
            try {
                video = await Video.find({ genre: { $in: genres } })
            } catch (err) {
                throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong')
            }
        }

        return video
    }

    fetchById = async (id) => {
        let video;

        try {
            video = await Video.findOne({ _id: id })
        } catch (err) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Invalid Id Provided')
        }

        if (!video) {
            throw new ApiError(400, 'No video exist with this ID')
        }

        return video
    }

    fetchVideos = async () => {
        let videos;
        try {
            videos = await Video.find({})
        } catch (err) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong')
        }

        return videos
    }

    addVideos = async (dataObject) => {
        const videos = new Video(dataObject)

        await videos.save()

        return videos
    }

    updateVote = async (id, vote) => {
        let video;

        try {
            video = await Video.findOne({ _id: id })
        } catch (err) {
            throw new ApiError(500, 'Something Went Wrong')
        }

        if (!video) {
            throw new ApiError(400, 'No video exist with this ID')
        }

        if (vote === 'downVote') {
            video.votes.downVotes += 1
        } else {
            video.votes.upVotes += 1
        }

        try {
            await video.save()
        } catch (err) {
            throw new ApiError(500, err)
        }
        return true

    }

    updateViews = async (id) => {
        let video;

        try {
            video = await Video.findOne({ _id: id })
        } catch (err) {
            throw new ApiError(500, 'Something Went Wrong')
        }

        if (!video) {
            throw new ApiError(400, 'No video exist with this ID')
        }
        video.viewCount += 1

        try {
            await video.save()
        } catch (err) {
            throw new ApiError(500, err)
        }
        return true

    }
}

module.exports = VideoServices