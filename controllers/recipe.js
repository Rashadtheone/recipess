// imports express, establishes dependicies 
const express = require('express')
// imports schema, establishes makeup!
const Recipe = require('../db/schema')
// router most be imported! it allows us to establishs paths! 
const router = express.Router()

// this gets the recipe index handle bar file.
router.get('/', (req, res) => {
// this allows you to find the recipe
  Recipe.find({})
  // the .then methosd in our express app helps us to wait until the recipe-index is fully constracted and renderd. 
    .then((recipeData) => {
      //renders the recipe-indexs HBS file. 
      res.render('recipe-index', {
        recipe: recipeData
      })
    })
})
// this gets the recipe index handle bar file. 
router.get('/:title', (req, res) => {
  // this set titles as a variable to be used to find stuff in the databse. 
  let title = req.params.title
  //findOne Method allows you to find one item by title. 
  Recipe.findOne({ title: title })
    //renders only that recipe
  .then(recipeData => {
    res.render('recipe-show', { recipe: recipeData })
  })
})

//this deletes recipe from index
router.delete('/:title', (req, res) => {
  // this locates one recipe by it's title and deletes it. 
  Recipe.findOneAndRemove({ recipe: req.body.recipe })
    ////then sends you back to the homepage. 
    .then((recipe) => {
      res.redirect('/recipe')
    })
})
// this updates your recipe. 
router.put('/:title', (req, res) => {
  // this updates a particular code, AFTER it locates them and updates it. 
  Recipe.findOneAndUpdate({ title: req.params.title},
    //this says it's going to require the entire recipe
    req.body.recipe,
    { new: true })
    // this allows one to return to recipe data, 
    .then((recipeData) => {
    })
    // if there's no return, then it'll shoot you a console message. 
    .catch((err) => {
      console.log(err)
    })
})
// this  creates a new reicpe in the database,, the responds with the homepage. 

router.post('/', (req, res) => {
  Recipe.create(req.body.recipe)
    .then(recipe => {
      res.redirect(`/recipe/${recipe.title}`)
    })
})

module.exports = router
