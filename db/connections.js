
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/recipe', { useMongoClient: true })

mongoose.Promise = Promise

module.exports = mongoose
