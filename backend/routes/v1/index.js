const express = require('express')
const router = express.Router()

const videoRoutes = require('./video.route')


router.use('/videos',videoRoutes)

module.exports = router
