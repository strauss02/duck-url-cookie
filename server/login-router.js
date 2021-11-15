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
      // Create Token
      const token = generateToken(reqUsername)
      //
      /*   WE STOPPED OVA HERE
      SO... We got to the part where we generate a token and send it to the user. all before that is basically taken care of.
      the problem is, we need to send something called refresh tokens and i dunno what the heck is that.
      so we neeed to figure that out and continue from here.
      generally whats left is generaing tokens, storing them at the user, and limiting usage through that token verification.
      after that of course there's all the small cute stuff like verification and ux nuances.

      */
      //
      return res.json(token)
    }
  })
})

function generateToken(user) {
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' })
}

module.exports = router
