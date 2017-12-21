// establishes connection to mongo! The Schema needs mongo connection to function properly.
const mongoose = require('./connections')
// Created varaiable const for the SCHEMATICS AKA Schema for the databse.
const RecipeSchema = new mongoose.Schema({
  title: String,
  descirpition: String,
  instruction: String,
  ingredient: String,
  rating: Number
})
// formats data for seeds.json, and data added by user!
const Recipe = mongoose.model('Recipe', RecipeSchema)

// exports to rest of the application
module.exports = Recipe

// This document should be created second, AFTER you've created
// the connection.js file!