require('dotenv').config()

const express = require('express')
const router = express.Router()
const User = require('./models/user')

router.post('/', (req, res) => {
  const reqUsername = req.body.username
  const reqPassword = req.body.password
  console.log(reqUsername, reqPassword)
  res.send('aloha!')
})

module.exports = router
