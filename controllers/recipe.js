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

module.exports = router
