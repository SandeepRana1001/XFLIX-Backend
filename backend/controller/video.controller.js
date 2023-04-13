const httpStatus = require('http-status')
const { validationResult } = require('express-validator');
const VideoServices = require('../service/video.service');
const ApiError = require('../utils/APIError');

const videoService = new VideoServices()

class Videos {

    getVideosById = async (req, res) => {
        const id = req.params.videoId
        const videos = await videoService.fetchById(id)
        return res.status(200).json({
            videos
        })
    }

    getVideos = async (req, res) => {
        let videos;
        if (req.query['title'] || req.query['genres']) {
            videos = await videoService.fetchByFilter(req.query)
        } else {
            videos = await videoService.fetchVideos()
        }
        return res.status(200).json({
            videos
        })
    }

    addVideo = async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new ApiError(422, 'Invalid Input Passed')
        }

        const { videoLink, previewImage, title, genre, contentRating, releaseDate } = req.body

        const dataObject = {
            videoLink,
            title,
            genre,
            contentRating,
            previewImage,
            releaseDate
        }

        const video = await videoService.addVideos(dataObject)

        return res.status(httpStatus.CREATED).json({
            video
        })
    }

    updateVote = async (req, res) => {
        const { vote, change } = req.body
        const id = req.params.videoId
        const voteContainer = ['upVote', 'downVote']

        if (!voteContainer.includes(vote) && change !== 'increase') {
            throw new ApiError(422, 'Invalid Input Passed')
        }
        const result = await videoService.updateVote(id, vote)
        if (result) {
            return res.status(204).send()
        }




    }

    updateViews = async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            throw new ApiError(422, 'Invalid Input Passed')
        }
        const id = req.params.videoId

        const result = await videoService.updateViews(id)

        if(result){
            return res.status(204).send()
        }

    }
}

module.exports = Videos