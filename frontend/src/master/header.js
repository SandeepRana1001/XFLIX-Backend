/* eslint-disable */
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import './header.css'
//eslint-disable



const Header = (props) => {

    const { enqueueSnackbar } = useSnackbar()
    const [debounceTimer, setDebounceTimer] = useState(null)
    const [value, setvalue] = useState()


    const showSnackBar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
            snackbarprops: 'data-role="alert"'
        })
    }

    const getResponse = (value) => {
        // try {
        //     axios.get(`${process.env.REACT_APP_BACKEND}/v1/videos?title=${value}`)
        //         .then((data) => {
        //             setSearchVideoData(data.data.videos)
        //         }).catch((err) => {
        //             showSnackBar('No videos found with this keyword', 'error')
        //             setSearchVideoData([...data])
        //         })
        // } catch (err) {
        //     showSnackBar('Something went wrong', 'error')
        //     // setSearchVideoData([...data])
        // }
        props.getSearchValue(value)
    }

    const debounceSearch = (event) => {
        event.preventDefault()
        let value = event.target.value
        setvalue(value)

        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }

        let timer;


        timer = setTimeout(() => {
            getResponse(value)
        }, 1000)

        setDebounceTimer(timer)

    }

    return (
        <div className="theme">
            <nav className="navbar navbar-expand-lg  navbar-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"><span>X</span><span>Flix</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {
                        !props.hideSearch &&
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <form className="d-flex" id="search" role="search">
                                <div className="input-group mb-3">
                                    <input type="search" className="form-control " placeholder="Recipient's username" id="search_bar" onChange={debounceSearch} value={value}
                                        autoComplete="off"
                                    />
                                    <span className="input-group-text" id="basic-addon2">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                </div>
                            </form>



                            <form className="d-flex" role="search" id="upload">
                                <button type="button" className="btn upload" data-bs-toggle="modal" data-bs-target="#uploadModal">
                                    <i className="fa-solid fa-upload"></i>
                                    Upload
                                </button>
                            </form>
                        </div>
                    }
                </div>
            </nav>
        </div>
    )
}


export default Header