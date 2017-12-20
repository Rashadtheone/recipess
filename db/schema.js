// db/schema.js

const mongoose = require('./connections')

const RecipeSchema = new mongoose.Schema({
  title: String,
  descirpition: String,
  instruction: String,
  ingredient: String,
  rating: Number
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe
