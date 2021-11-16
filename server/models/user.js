const mongoose = require('mongoose')

// const url = process.env.MONGODB_URI

// console.log(`connecting to ${url}`)

// mongoose
//   .connect(url)
//   .then((res) => {
//     console.log('connected to DuckDB')
//   })
//   .catch((_err) => {
//     console.log('coneection failed to DuckDB')
//   })

const userScheme = new mongoose.Schema({
  username: String,
  password: String,
})

userScheme.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('User', userScheme)
