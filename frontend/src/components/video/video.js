/* eslint-disable */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from 'notistack'

import './video.css'
import Loader from "../shared/loader/loader";
import Card from "../shared/card/card";
import calculateTime from '../../globalFunctions/dateCalculator'

const Video = (props) => {

    const { enqueueSnackbar } = useSnackbar()

    const showSnackBar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
            snackbarprops: 'data-role="alert"'

        })
    }

    const { videoId } = useParams()
    const [videoData, setVideoData] = useState({})
    const [genre, setGenre] = useState(null)
    const [loading, setLoading] = useState(true)
    const [recommended, setRecommended] = useState([])
    const [recommended_loading, set_recommended_loading] = useState(true)
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState(false)
    const [dislike, setDisLike] = useState(false)
    const [dislikeCount, setDisLikeCount] = useState(0)
    const [viewCount, setviewCount] = useState(0)


    const fetchVideoData = () => {
        props.hideDataFromSearch(true)
        try {
            axios.get(`${process.env.REACT_APP_BACKEND}/v1/videos/${videoId}`)
                .then((data) => {
                    const res = data.data.videos
                    console.log(res)
                    let like = res.upVotes===undefined?0:parseInt(res.upVotes)
                    let dislike = res.downVotes===undefined?0:parseInt(res.downVotes)
                    setVideoData(data.data.videos)
                    setLikeCount(like)
                    setDisLikeCount(dislike)
                    setviewCount(parseInt(data.data.viewCount))
                    setGenre(data.data.genre)
                    setLoading(false)
                }).catch((err) => {
                    showSnackBar(err.response.data.message, 'error')
                    setLoading(false)

                })
        } catch (err) {
            showSnackBar('Something went wrong', 'error')
            setLoading(false)

        }
    }

    const getVideoByGenre = () => {
        try {
            axios.get(`${process.env.REACT_APP_BACKEND}/v1/videos?genres=All`)
                .then((response) => {
                    const result = response.data.videos
                    const arr = result.filter((val) => {
                        return val.genre === genre
                    })
                    setRecommended([...arr])
                    set_recommended_loading(false)

                }).catch((err) => {
                    showSnackBar(err.response.data.message, 'error')
                    setLoading(false)

                })
        } catch (err) {
            showSnackBar('Something went wrong', 'error')
            setLoading(false)

        }
    }

    const setLikeButtonActive = () => {
        try {
            axios.patch(`${process.env.REACT_APP_BACKEND}/v1/videos/${videoId}/votes`, {
                "vote": "upVote",
                "change": "increase"
            }).then((data) => {
                setLikeCount(likeCount + 1)
                if(dislikeCount>0){
                    setDisLikeCount(dislikeCount - 1)
                }
            }).catch((err) => {
                showSnackBar(err.response.data.message, 'error')
            })
        } catch (err) {
            showSnackBar('Something went wrong', 'error')
        }
        setDisLike(false)
        setLike(true)
    }

    const setDislikeButtonActive = () => {
        try {
            axios.patch(`${process.env.REACT_APP_BACKEND}/v1/videos/${videoId}/votes`,{
                "vote": "downVote",
                "change": "increase"
            }).then((data) => {
                if(likeCount>0){
                    setLikeCount(likeCount - 1)
                }
                setDisLikeCount(dislikeCount + 1)
            }).catch((err) => {
                showSnackBar(err.message, 'error')
            })
        } catch (err) {
            showSnackBar('Something went wrong', 'error')
        }
        setDisLike(true)
        setLike(false)
    }

    const increaseViewCount = (id) => {
        try {
            axios.patch(`${process.env.REACT_APP_BACKEND}/v1/videos/${id}/views`)
                .then((data) => {
                    setviewCount(viewCount + 1)
                }).catch((err) => {
                    console.log(err)
                    setviewCount(viewCount + 1)
                    // showSnackBar(err.response.data.message, 'error')
                })
        } catch (err) {
            showSnackBar('Something went wrong', 'error')
        }
    }

    useEffect(() => {
        fetchVideoData()
    }, [])

    useEffect(() => {
        getVideoByGenre()
    }, [genre])

    useEffect(()=>{
        increaseViewCount(videoId)
    },[videoId])

    return (
        <div className="container">
            <Loader loading={loading} length={videoData.videoLink} message='The Video Is Either Removed or Missing' />
            <div className="row justify-content-center">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" id="col">
                    {
                        !loading &&
                        <div>
                            <div className="video_steamer">
                                <iframe width="560" height="315" src={`${videoData.videoLink}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>

                            <div className="video_data">
                                <div className="video_heading">
                                    <h6>{videoData.title}</h6>
                                </div>
                                <div className="video_subheadings">
                                    <div className="row justify-content-around">
                                        <div className="col-lg-2 " id="col_">
                                            <div className="data">
                                                <li>
                                                    <i className="fa-solid fa-arrow-up"></i>
                                                    <span>
                                                        {viewCount}
                                                    </span>
                                                </li>

                                                <li>
                                                    <span> {calculateTime(videoData.releaseDate)}</span>
                                                </li>
                                            </div>
                                        </div>

                                        <div className="col-lg-10 " id="col_">
                                            <div className="data_2">
                                                <button id="like" className={`social ${like ? 'active' : ''}`} onClick={setLikeButtonActive}>
                                                    <i className="fa-solid fa-thumbs-up"></i>
                                                    <span>{likeCount}</span>
                                                </button>
                                                <button id="dislike" className={`social ${dislike ? 'active' : ''}`} onClick={setDislikeButtonActive}>
                                                    <i className="fa-solid fa-thumbs-down"></i>
                                                    <span>{dislikeCount}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    }

                    <hr ></hr>
                </div>
            </div>
            <div className="row justify-content-center">
                <Loader loading={recommended_loading} length={recommended.length} message='No Recommendation available for this genre' />
                {
                    !recommended_loading &&
                    recommended.map((video, index) => {
                        return <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6' key={video._id + '' + index}>

                            <Card
                                title={video.title}
                                thumbnail={video.previewImage}
                                releaseDate={video.releaseDate}
                                id={video._id}
                            />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Video