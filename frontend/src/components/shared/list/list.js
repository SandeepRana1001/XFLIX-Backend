import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import './list.css'

const List = (props) => {
    const history = useHistory()
    
    const handleList = (event)=>{
        props.clearList()
        let id = event.target.id
        history.push(`/video/${id}`)
    }

    return (
        <div className="list-group">
            {
                props.list.map((data)=>{
                    return (
            <Link to={`#`} className="list-group-item list-group-item-action" aria-current="true" key={data._id} id={data._id}
            onClick={handleList}
            >
                {data.title}
            </Link>
                    )
                })
            }
        </div>

    )
}

export default List