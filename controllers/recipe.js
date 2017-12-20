const express = require('express')
const Recipe = require('../db/schema')

const router = express.Router()

router.get('/', (req, res) => {
  Recipe.find({})
    .then((recipeData) => {
      res.render('recipe-index', {
        recipe: recipeData
      })
    })
})

router.get('/:title', (req, res) => {
  let title = req.params.title
  Recipe.findOne({ title: title })
  .then(recipeData => {
    res.render('recipe-show', { recipe: recipeData })
  })
})

router.delete('/:title', (req, res) => {
  Recipe.findOneAndRemove({ recipe: req.params.recipe })
    .then(() => {
      res.redirect('/recipe')
    })
})

router.put('/:title', (req, res) => {
  Recipe.Update(
    {},
    {
      $set: {title: req.params.title},
      $set: {descirpition: req.params.descirpition},
      $set: {ingredient: req.params.ingredient},
      $set: {rating: req.params.rating}
    },
    { multi: true })
    .then((recipeData) => {
      res.redirect(`/recipe/${Recipe.title}`)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/', (req, res) => {
  Recipe.create(req.body.recipe)
    .then(recipe => {
      res.redirect(`/recipe/${recipe.title}`)
    })
})

module.exports = router
