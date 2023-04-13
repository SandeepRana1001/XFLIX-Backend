import React from "react"
import './loader.css'

const Loader = ({ loading, length,message }) => {
    return (

            <div className="row justify-content-center">
                {
                    loading === true &&
                    <div className="text-center text-white loading">
                        <span>Loading Please Wait...</span>
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                }
                {
                    length === 0 && !loading &&
                    <div className='text-center text-white'>
                        {message}
                        <i className="fa-regular fa-face-frown text-warning"></i>
                    </div>
                }
            </div>

    )
}

export default Loader