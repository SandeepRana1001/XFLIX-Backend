/**
 * App JS is created for storing all routes and other imports
 */


const express = require('express')
const app = express()
const routes = require('./routes/v1/index')
const errorHandler = require('./middleware/errorHandler')
const ApiError = require('./utils/APIError')
const cors = require("cors");

const httpStatus = require('http-status')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// enable cors
app.use(cors());
app.options("*", cors());

app.use('/v1',routes)



// send back a 404 error for any unknown api request
app.use((req, res, next) => {
   throw new ApiError(httpStatus.NOT_FOUND, "Not found");
});

app.use(errorHandler)



module.exports = app