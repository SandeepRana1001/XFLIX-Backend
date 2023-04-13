/* eslint-disable */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Checkbox_Radio from "../checkbox_radio/checkbox_radio";

import './filter.css'
//eslint-disable

const all_genre = [
    {
        name: 'All',
        id: 'movies'
    },
    {
        name: 'Education',
        id: 'education'
    },
    {
        name: 'Sports',
        id: 'sports'
    },
    {
        name: 'Comedy',
        id: 'comedy'
    },
    {
        name: 'Lifestyle',
        id: 'lifestyle'
    }

]

const age_group = [
    {
        name: 'Any age group',
        id: 'anyone'
    },
    {
        name: '7+',
        id: 'seven_AndAbove'
    },
    {
        name: '12+',
        id: 'twelve_AndAbove'
    },
    {
        name: '16+',
        id: 'sixteen_AndAbove'
    },
    {
        name: '18+',
        id: 'eighteen_AndAbove'
    },
]

const Filter = (props) => {

    const handleFilter = (filter, isChecked) => {
        props.getFilter(filter.toLowerCase(), isChecked)
    }

    const handleAgeGroup = (filter) => {
        props.handleAgeGroup(filter)
    }

    const handleSort = (a) => {
        props.getSort(a.target.idp)
    }




    return (
        <div className="theme">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-8">

                        <div className="radios mt-3">


                            {
                                all_genre.map((val) => {
                                    return <button
                                        key={val.id}

                                    >
                                        <Checkbox_Radio
                                            type='checkbox'
                                            id={val.id}
                                            name={val.name}
                                            handleFilter={handleFilter}
                                        />
                                    </button>
                                })
                            }

                            {/* <input type="checkbox" className="btn-check" name="options-outlined" id="sort" autoComplete="off" onClick={handleSort} />
                <label className="btn btn-outline-light" htmlFor="sort">
                    <i className="fa-solid fa-sort"></i>
                    Sort By Uploaded Date
                </label> */}
                            <div className="sorting_menu">
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="sort">
                                        <i className="fa-solid fa-sort"></i>
                                        Sort By
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="#" id='ReleaseDate  ' onClick={handleSort}>
                                            Release Date
                                        </Link>
                                        </li>

                                        <li><Link className="dropdown-item" to="#" id='ViewCount' onClick={handleSort}>
                                            View Count
                                        </Link>
                                        </li>
                                    </ul>
                                </li>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-7">

                        <div className="radios mt-2 pb-3">


                            {
                                age_group.map((val) => {
                                    return <Checkbox_Radio
                                        type='radio'
                                        key={val.id}
                                        id={val.id}
                                        name={val.name}
                                        handleAgeGroup={handleAgeGroup}
                                    />
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter