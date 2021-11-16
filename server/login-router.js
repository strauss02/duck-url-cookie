require('dotenv').config()

const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const User = require('./models/user')
const RefreshToken = require('./models/refreshToken')

const refreshTokens = []

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
      // Authentication successful
      const user = { name: reqUsername }
      const accessToken = generateAccessToken(user)
      const userRefreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      const refreshToken = new RefreshToken({
        token: userRefreshToken,
      })
      refreshToken
        .save()
        .then((savedToken) =>
          res.json({
            accessToken: accessToken,
            refreshToken: userRefreshToken,
          })
        )
        .catch((_err) => {
          res.end('Error while creating tokens!')
        })
    }
  })
})

router.post('/token', async (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  //
  await RefreshToken.find({ token: refreshToken })
    .then((result) => {
      if (result.length === 0) {
        console.log(`coldn't find that refresh token `)
        res.sendStatus(403)
        return res.end()
      } else {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, user) => {
            if (err) return res.sendStatus(403)
            const accessToken = generateAccessToken({ name: user.name })
            res.json({ accessToken: accessToken })
          }
        )
      }
    })
    .catch((err) => {
      res.status(500).end()
      console.log(`error while looking for refresh token. ${err}`)
    })
  //
})

router.delete('/logout', (req, res) => {
  //
  RefreshToken.findOneAndDelete({ token: req.body.token })
    .then((result) => {
      res.sendStatus(204)
    })
    .catch((err) => {
      console.log(`error while trying to delete refresh token. ${err} `)
    })
  //
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

module.exports = router
