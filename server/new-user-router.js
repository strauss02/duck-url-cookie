require('dotenv').config()

const express = require('express')
const router = express.Router()
const User = require('./models/user')

router.post('/', (req, res) => {
  const reqUsername = req.body.username
  const reqPassword = req.body.password
  console.log(reqUsername, reqPassword)

  const user = new User({
    username: reqUsername,
    password: reqPassword,
  })
  console.log('New user created! Here it is:', user)

  user
    .save()
    .then((savedUser) => {
      res.send('User saved!')
    })
    .catch((_err) => {
      res.end('There was an error while trying to save!')
    })
})

module.exports = router
