/* ============================== */

// const app = new express()
const express = require('express')
const router = express.Router()
// const urls = require('./urls.json')
const UrlEntry = require('./models/UrlEntry')
/* ============================== */

router.get('/*', (req, res) => {
  const hash = req.url.substring(1)
  UrlEntry.find({ hash: hash })
    .then((entries) => {
      if (entries.length < 1) {
        return res.status(404).send('No short url found! Sorry bud')
      } else {
        return res.redirect(entries.originalUrl)
      }
    })
    .catch((err) => {
      console.log(`Error while searching the DB for a hash. ${err}`)
      return res.sendStatus(500)
    })
})

module.exports = router
