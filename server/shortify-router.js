/* ============================== */

const express = require('express')
const router = express.Router()
const ApiError = require('./ApiError')
//
const UrlEntry = require('./models/UrlEntry')
//
/* ==============================  

  This router is for processing POST requests.
  It takes the user-given URL and generates a hash 
  that will correspond to it.
  The {hash : URL} pair is stored in a DB.

   ============================== */

router.post('/', (req, res) => {
  const inputURL = req.body.userURL

  //
  // const prevUrl = DB.getKeyByValue(inputURL)
  UrlEntry.find({ originalUrl: inputURL })
    .then((result) => {
      if (result.length > 0) {
        console.log('found prexisting hash!', result)
        return res.send(result[0].hash)
      } else {
        if (!isValidUrl(inputURL)) {
          throw new ApiError(400, 'That URL is invalid.')
        }
        const hash = getrandom()
        const urlEntry = new UrlEntry({ originalUrl: inputURL, hash: hash })
        urlEntry
          .save()
          .then((result) => {
            console.log('new URL stored!')
            return res.send(hash)
          })
          .catch((err) => {
            console.log(`Error while trying to save new URL. ${err}`)
            res.sendStatus(500)
          })
      }
    })
    .catch((err) => {
      console.log(
        `Error while searching the DB for previously shortened URLs. ${err}`
      )
      res.sendStatus(500)
    })
  //
  // if (prevUrl) {
  //   res.send(prevUrl)
  //   return
  // }

  // ASSERT PROPER URL
  function isValidUrl(string) {
    let url
    try {
      url = new URL(string)
    } catch (_) {
      return false
    }
    return url.protocol === 'http:' || url.protocol === 'https:'
  }

  // if (!isValidUrl(inputURL)) {
  //   throw new ApiError(400, 'That URL is invalid.')
  // }

  function getrandom() {
    const randomString =
      Math.random().toString(32).substring(2, 5) +
      Math.random().toString(32).substring(2, 5)
    return randomString
  }

  // DB.store(randomURL, inputURL)

  // res.send(randomURL)
})

/* ============================== */

module.exports = router
