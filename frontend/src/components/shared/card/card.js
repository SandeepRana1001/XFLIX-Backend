/* eslint-disable */
import React from 'react'
import './card.css'
import { Link } from 'react-router-dom'
import calculateTime from '../../../globalFunctions/dateCalculator'

const Card = (props) => {

    return <div className='card '>
        <Link className='stretched-link video-tile-link' to={`/video/${props.id}`}></Link>
        <div className='card-image-container'>
            <img src={`${props.thumbnail}`} />
        </div>
        <div className='card-body'>

        <p className='title'>{props.title}</p>
        {/* <p className='title'>{props.contentRating}</p>
        <p className='title'>{props.genre}</p> */}
            <p className='sub-title'>{calculateTime(props.releaseDate)}</p>
        </div>

    </div>
}

export default Card