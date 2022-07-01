const express = require('express')
const morgan = require('morgan') //tao log phia server 
const bodyParser = require('body-parser') // phan tich thong tin gui ve tu client
const mongoose = require('mongoose')
const config = require('./config')
const cors = require('cors')
const employeeRoutes = require('./routes/employee')
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')

const app = express();

mongoose.connect(config.DATABASE_CONNECT_URL, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`connected to the database`);
    }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
app.options('*', cors()) //cho phep tat ca truy cap nam ngoai server
app.use(authJwt())
app.use(errorHandler)

app.use(`${config.API}/accounts`, employeeRoutes)
app.listen(config.PORT, err => {
    console.log(`magic happens on port awesome`, config.PORT);
})
