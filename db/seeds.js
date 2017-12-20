const Recipe = require('./schema')
const seedData = require('./seeds.json')

Recipe.remove({})
  .then(() => {
    return Recipe.collection.insert(seedData)
  })
  .then(() => {
    process.exit()
  })
