/* eslint-disable */
import React, { useState } from "react"
import './uploadModal.css'
import { $ } from 'react-jquery-plugin'
import { useSnackbar } from 'notistack'
import axios from "axios"

const UploadModal = (props) => {


  const { enqueueSnackbar } = useSnackbar()
  const [upload,setUpload] = useState({})

  const showSnackBar = (msg, variant) => {
    enqueueSnackbar(msg, {
      variant: variant,
      snackbarprops: 'data-role="alert"'

    })
  }


  const [formData, setFormData] = useState({
    link: 'https://www.youtube.com/embed/x_me3xsvDgk',
    title: 'Eternals',
    image: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
    genre: 'Education',
    age: 'Anyone',
    date: '02-October-2022'
  })


  const checkForErrors = () => {
    let errorMsg = '';
    let error = false;
    if (formData.link.trim().length < 1 || formData.link.split('youtube.com/embed/').length < 2) {
      error = true
      errorMsg = 'Invalid Video Link'
    }
    else if (formData.image.trim().length < 1) {
      error = true
      errorMsg = 'Invalid Image Link'
    }

    else if (formData.genre.length < 1) {
      error = true
      errorMsg = 'Invalid Genre'
    }
    else if (formData.age.length < 1) {
      error = true
      errorMsg = 'Invalid Age'
    }
    else if (formData.title.length < 1) {
      error = true
      errorMsg = 'Invalid Title'

    } else if (formData.date.length < 1) {
      error = true
      errorMsg = 'Invalid Release Date'
    }

    else {
      error = false
    }

    if (error === true) {
      showSnackBar(errorMsg, 'error')
    }

    return error
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const uploadData = () => {
    const err = checkForErrors()
    if (err) {
      return false
    }
    try {
      const options = {
        url: `${process.env.REACT_APP_BACKEND}/v1/videos`,
        method: 'POST',
        data: {
          "videoLink": formData.link,
          "title": formData.title,
          "genre": formData.genre,
          "contentRating": formData.age,
          "releaseDate": formData.date,
          "previewImage": formData.image


        }
      }

      axios(options)
        .then((data) => {
          setFormData({
            link: '',
            title: '',
            image: '',
            genre: '',
            age: '',
            date: ''
          })
          console.log(data.data)
          props.getUploadValue(data.data)
          showSnackBar('Video Uploaded Successfully','success')

        }).catch((err) => {
          showSnackBar(err.message, 'error')
        })
    } catch (err) {
      showSnackBar('Something went wrong', 'error')
    }

    $('#uploadModal').modal('hide');
  }


  return (
    <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="uploadModal" tabIndex="-1"
      aria-labelledby="uploadModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-light">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="modal-data">
              <div className="form-group">
                <input type="url" placeholder="Video Link" id="videoLink"
                  className="form-control form-control-lg"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                />
                <div className="sub-text">
                  <label>The link will be used to derive the video</label>
                </div>
              </div>

              <div className="form-group ">
                <input type="url" placeholder="Thumbnail Image Link" className="form-control form-control-lg"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
                <div className="sub-text">
                  <label>The link will be used to preview the thumbnail image</label>
                </div>
              </div>
              <div className="form-group ">
                <input type="text" placeholder="Title" className="form-control form-control-lg"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}

                />
                <div className="sub-text">
                  <label>The title will be the representative text for the video</label>
                </div>
              </div>

              <div className="form-group ">
                <select className="form-select form-select-lg"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                >
                  <option defaultValue hidden value="null" className="text-light"

                  >
                    Genre
                  </option>
                  <option defaultValue value="Education">
                    Education
                  </option>
                  <option defaultValue value="Sports">
                    Sports
                  </option>
                  <option defaultValue value="Comedy">
                    Comedy
                  </option>
                  <option defaultValue value="Movies">
                    Movies
                  </option>
                  <option defaultValue value="Lifestyle">
                    Lifestyle
                  </option>
                  <option defaultValue value="All">
                    All
                  </option>
                </select>

                <div className="sub-text">
                  <label>Genre will help in categorizing your videos</label>
                </div>
              </div>

              <div className="form-group ">
                <select className="form-select form-select-lg" name="age"
                  value={formData.age}
                  onChange={handleChange}

                >
                  <option defaultValue hidden value="null">
                    Suitable age group for the clip
                  </option>
                  <option defaultValue value="anyone">
                    Any Age Group
                  </option>
                  <option defaultValue value="7+">
                    7+
                  </option>
                  <option defaultValue value="12+">
                    12+
                  </option>
                  <option defaultValue value="15+">
                    15+
                  </option>
                  <option defaultValue value="18+">
                    18+
                  </option>
                </select>

                <div className="sub-text">
                  <label>This will be used to filter videos on age group suitability</label>
                </div>
              </div>

              <div className="form-group ">
                <input type="date" placeholder="Release Date" className="form-control form-control-lg"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                <div className="sub-text">
                  <label>This will be used to sort videos</label>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="footer d-flex justify-content-start">

              <button type="button" className="btn btn-primary" onClick={uploadData}>Submit</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadModal