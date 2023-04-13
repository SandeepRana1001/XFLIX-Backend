const express = require('express')
const router = express.Router()
const Videos = require('../../controller/video.controller')
const video = new Videos()
const { check } = require('express-validator')
const tryCatch = require('../../utils/tryCatch')

const validate = require('../../middleware/validator')

router.get('/:videoId',
    check('videoId').notEmpty(),

    tryCatch(video.getVideosById))

router.get('/', tryCatch(video.getVideos))

router.post('/', 
    tryCatch(video.addVideo)
)

router.patch('/:videoId/votes', [
    check('vote').notEmpty(),
    check('change').notEmpty(),
    check('videoId').notEmpty(),
],

    tryCatch(video.updateVote)
)

router.patch(
    '/:videoId/views',
    [check('videoId').notEmpty()],
    tryCatch(video.updateViews)
)

module.exports = router