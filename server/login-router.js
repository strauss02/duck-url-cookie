require('dotenv').config()

const jwt = require('jsonwebtoken')
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
      // authentication successful
      // const token = generateToken(reqUsername)
      const accessToken = jwt.sign(reqUsername, process.env.ACCESS_TOKEN_SECRET)
      //
      // const refreshToken = jwt.sign(reqUsername, process.env.REFRESH_TOKEN_SECRET)
      // refreshTokens.push(refreshToken)
      // res.json({token: token, refreshToken: refreshToken})
      return res.json({ accessToken: accessToken })
    }
  })
})

function generateToken(user) {
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' })
}

module.exports = router
