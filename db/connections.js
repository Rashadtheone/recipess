// Establishes dependencie connection between applicaiton and mongoose
const mongoose = require('mongoose')
//  ensure you're using the proper name for your databse locally
mongoose.connect('mongodb://localhost/recipe', { useMongoClient: true })
// it's a promise to say mongoose should me use, and it's not directly to your machine
mongoose.Promise = Promise
// export mongo to make avaliable to other parts of the application
module.exports = mongoose

// You should start with this file in your database!