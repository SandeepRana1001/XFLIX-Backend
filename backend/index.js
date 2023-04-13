/**
 * Index.js file is the starting point of the app and contains the connection URL to the database
 
 */

const mongoose = require('mongoose')
const config = require('./config/config')
const app = require('./app')

mongoose.connect(config.MONGO_URI, config.MONGO_OPTIONS)
.then(()=>{
    console.log('Connected Successfully to Mongo DB')
    try{        
        app.listen(config.PORT)
        console.log('Server Listening on PORT : '+config.PORT)
    }catch(err){
        console.log('Connection Failed')
        console.log(err)
    }
}).catch((err)=>{
    console.log('Cannot Connect To Mongo')
    console.log(err)
})

