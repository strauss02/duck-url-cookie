/* eslint-disable new-cap */

/** ******** Import tools ******* */

require('dotenv').config()
const express = require('express')
const app = new express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
/** ****** Connect to Mongoose ******* */

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose
  .connect(url)
  .then((res) => {
    console.log('connected to DuckDB')
  })
  .catch((_err) => {
    console.log('coneection failed to DuckDB')
  })

/** ****** Import router modules ******* */

const redirectRouter = require('./redirect-router')
const shortifyRouter = require('./shortify-router')
const newUserRouter = require('./new-user-router')
const errorHandler = require('./error-handler')
const userRouter = require('./user-router')
/** ***** General Middleware *********** */

app.use(cors())
app.use(express.json())

/** ****** Routing ************ */

app.use(express.static('public'))

app.use('/', redirectRouter)

// Authenticate user berfore letting him use the shortener
app.post('/', authenticateToken, shortifyRouter)

app.use('/new-user', newUserRouter)

app.use('/user', userRouter)

/** ****** Authenticate Token ************ */

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

/** ****** Error Handler ************ */

app.use(errorHandler)

/** ************************* */

app.listen(process.env.PORT || 3000, () => console.log('Server is running...'))
