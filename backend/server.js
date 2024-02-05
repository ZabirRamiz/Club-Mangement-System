require('dotenv').config()  //imports config from .env file
const express = require("express");
const documentRoutes = require('./routes/routing')
const mongoose = require('mongoose')


//express app
const app = express();


// middleware - executes everytime a request is done
app.use(express.json())     //looks if the request has any body, if yes, attaches it to req handler
// will enable us to use req.body
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})



// routes
app.use('/api/documents', documentRoutes)  //when we fire a request to given route, use workoutRoutes

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //when connection is established
        // listen for requests only when connection is established
        app.listen(process.env.PORT, () =>{     // PORT variable is in the .env file, accessed through process.env
        console.log('connected to db and listening on port 4000!!!')
})

    })
    .catch((error) =>{
        console.log(error)
    })


    