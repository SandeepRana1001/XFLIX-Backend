/* eslint-disable */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'

import './dashboard.css'

import Card from '../shared/card/card'
import Loader from '../shared/loader/loader'

const data = [
    {
        "votes": {
            "upVotes": 0,
            "downVotes": 0
        },
        "previewImage": "https://i.ytimg.com/vi/EL5hcdXu8dc/mqdefault.jpg",
        "viewCount": 39,
        "_id": "60331f421f1d093ab5424483",
        "videoLink": "youtube.com/embed/EL5hcdXu8dc",
        "title": "Top 10 Facts - Music",
        "genre": "Comedy",
        "contentRating": "12+",
        "releaseDate": "17 Mar 2018"
    },
    {
        "votes": {
            "upVotes": 0,
            "downVotes": 0
        },
        "previewImage": "https://i.ytimg.com/vi/sf9tBmMfFcw/mqdefault.jpg",
        "viewCount": 10,
        "_id": "60331f421f1d093ab5424478",
        "videoLink": "youtube.com/embed/sf9tBmMfFcw",
        "title": "Top 10 Facts - Reddit",
        "genre": "Sports",
        "contentRating": "18+",
        "releaseDate": "03 Feb 2018"
    },
    {
        "votes": {
            "upVotes": 0,
            "downVotes": 0
        },
        "previewImage": "https://i.ytimg.com/vi/EL5hcdXu8dc/mqdefault.jpg",
        "viewCount": 39,
        "_id": "60331f421f1d093ab5424483",
        "videoLink": "youtube.com/embed/EL5hcdXu8dc",
        "title": "Top 10 Facts - Music",
        "genre": "Comedy",
        "contentRating": "12+",
        "releaseDate": "17 Mar 2018"
    },
    {
        "votes": {
            "upVotes": 0,
            "downVotes": 0
        },
        "previewImage": "https://i.ytimg.com/vi/sf9tBmMfFcw/mqdefault.jpg",
        "viewCount": 10,
        "_id": "60331f421f1d093ab5424478",
        "videoLink": "youtube.com/embed/sf9tBmMfFcw",
        "title": "Top 10 Facts - Reddit",
        "genre": "Sports",
        "contentRating": "18+",
        "releaseDate": "03 Feb 2018"
    },
    {
        "votes": {
            "upVotes": 0,
            "downVotes": 0
        },
        "previewImage": "https://i.ytimg.com/vi/EL5hcdXu8dc/mqdefault.jpg",
        "viewCount": 39,
        "_id": "60331f421f1d093ab5424483",
        "videoLink": "youtube.com/embed/EL5hcdXu8dc",
        "title": "Top 10 Facts - Music",
        "genre": "Comedy",
        "contentRating": "12+",
        "releaseDate": "17 Mar 2018"
    },
    {
        "votes": {
            "upVotes": 0,
            "downVotes": 0
        },
        "previewImage": "https://i.ytimg.com/vi/sf9tBmMfFcw/mqdefault.jpg",
        "viewCount": 10,
        "_id": "60331f421f1d093ab5424478",
        "videoLink": "youtube.com/embed/sf9tBmMfFcw",
        "title": "Top 10 Facts - Reddit",
        "genre": "Sports",
        "contentRating": "18+",
        "releaseDate": "03 Feb 2018"
    },
    {
        "votes": {
            "upVotes": 0,
            "downVotes": 0
        },
        "previewImage": "https://i.ytimg.com/vi/EL5hcdXu8dc/mqdefault.jpg",
        "viewCount": 39,
        "_id": "60331f421f1d093ab5424483",
        "videoLink": "youtube.com/embed/EL5hcdXu8dc",
        "title": "Top 10 Facts - Music",
        "genre": "Comedy",
        "contentRating": "12+",
        "releaseDate": "17 Mar 2018"
    },
    {
        "votes": {
            "upVotes": 0,
            "downVotes": 0
        },
        "previewImage": "https://i.ytimg.com/vi/sf9tBmMfFcw/mqdefault.jpg",
        "viewCount": 10,
        "_id": "60331f421f1d093ab5424478",
        "videoLink": "youtube.com/embed/sf9tBmMfFcw",
        "title": "Top 10 Facts - Reddit",
        "genre": "Sports",
        "contentRating": "18+",
        "releaseDate": "03 Feb 2018"
    }

]


const Dashboard = ({ filter, sort, ageGroup, searchValue, uploadValue }) => {

    const { enqueueSnackbar } = useSnackbar()

    const showSnackBar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
            snackbarprops: 'data-role="alert"'

        })
    }

    const [videos, setVideos] = useState([])
    const [allvideos, setAllVideos] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchVideos = (value) => {
        let url = `${process.env.REACT_APP_BACKEND}/v1/videos`
        if (value) {
            url += `?title=${value}`

        } else {

            url = `${process.env.REACT_APP_BACKEND}/v1/videos`
        }
        try {
            axios.get(url)
                .then((data) => {
                    setVideos(data.data.videos)
                    setAllVideos(data.data.videos)
                    setLoading(false)
                }).catch((err) => {
                    showSnackBar(err.message, 'error')
                    if (value)
                        setLoading(false)
                    setVideos([])
                    setAllVideos([])

                })
        } catch (err) {
            showSnackBar('Something went wrong', 'error')
            setLoading(false)
            setVideos([])
            setAllVideos([])
        }
    }

    const filterVideos = () => {

        let arr;
        if (ageGroup.toLowerCase() === 'all' || ageGroup.toLowerCase() === 'anyone') {
            arr = allvideos.filter((video) => {
                return filter.includes(video.genre.toLowerCase())
            })

            setVideos([...arr])
            return;
        } else {

            arr = allvideos.filter((video) => {
                return filter.includes(video.genre.toLowerCase()) && video.contentRating === ageGroup
            })
            setVideos([...arr])
        }
    }

    const sortVideos = () => {
        if (sort === 'ReleaseDate') {
            videos.sort((a, b) => {
                return new Date(a.releaseDate) - new Date(b.releaseDate)
            })
        } else {
            videos.sort((a, b) => {
                return new Date(b.viewCount) - new Date(a.viewCount)
            })
        }
        setVideos([...videos])
    }

    const addUploadedVideo = () => {
        setVideos([uploadValue, ...videos])
        setAllVideos([uploadValue, ...allvideos])
    }

    // useEffect(() => {
    //     addUploadedVideo()
    // }, [uploadValue])

    useEffect(() => {

        if (filter.length === 0)
            fetchVideos(searchValue);
        else {
            filterVideos();
        }

    }, [searchValue, filter, ageGroup, uploadValue])

    useEffect(() => {
        sortVideos();
    }, [sort])


    return (
        <div className='container mt-4'>
            <Loader loading={loading} length={videos.length}
                message={`No videos present ${searchValue ? 'for entered keyword' : 'with current filter.'} `} />
            <div className='row justify-content-around'>

                {
                    !loading
                    &&
                    videos.map((video, index) => {
                        return <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6' key={video._id + '' + index}>
                            <Card
                                title={video.title}
                                thumbnail={video.previewImage}
                                releaseDate={video.releaseDate}
                                contentRating={video.contentRating}
                                genre={video.genre}
                                id={video._id ? video._id : video.id}
                            />
                        </div>
                    })
                }

            </div>
        </div>
    )
}

export default Dashboard