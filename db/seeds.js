// imports our SCHEMA AKA schematics to that format.
const Recipe = require('./schema')
//imports our seeds.json data for use in the application. 
const seedData = require('./seeds.json')
// clears the database, before postiing new things up
Recipe.remove({})
  .then(() => {
    return Recipe.collection.insert(seedData)
  })
  .then(() => {
    process.exit()
  })

// this document is used to import your json file!
// into your mongo db! run it after you've started 'nodemon'
// 'node seeds.json'
