/* eslint-disable new-cap */

/** ******** Import tools ******* */

const express = require('express')
const app = new express()
const cors = require('cors')

/** ****** Import router modules ******* */

const redirectRouter = require('./redirect-router')
const shortifyRouter = require('./shortify-router')
const newUserRouter = require('./new-user-router')
const errorHandler = require('./error-handler')
const loginRouter = require('./login-router')

/** ***** General Middleware *********** */

app.use(cors())
app.use(express.json())

/** ****** Routing ************ */

app.use(express.static('public'))

app.use('/', redirectRouter)

app.post('/', shortifyRouter)

app.use('/new-user', newUserRouter)

app.use('/login-user', loginRouter)

/** ****** Error Handler ************ */

app.use(errorHandler)

/** ************************* */

app.listen(process.env.PORT || 3000, () => console.log('Server is running...'))
