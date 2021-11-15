const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  res.send('aloha!')
})

module.exports = router
