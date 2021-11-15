require('dotenv').config()

const express = require('express')
const router = express.Router()
const User = require('./models/user')

router.post('/', (req, res) => {
  const reqUsername = req.body.username
  const reqPassword = req.body.password

  console.log(reqUsername, reqPassword)

  /* Authentication */
  User.find({ username: reqUsername, password: reqPassword }).then((result) => {
    console.log(`result is `, result)
    if (!result.length) {
      console.log(`couldn't find any user with matching credentials`)
      return res
        .status(401)
        .send(`couldn't find any user with matching credentials`)
    } else {
      return res.send(`Welcome back ${reqUsername}! Logging you in...`)
    }
  })
})

module.exports = router
