const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const recipe = require('./controllers/recipe')

const router = express.Router()

app.set('port', process.env.PORT || 3001)

app.set('view engine', 'hbs')

app.engine('.hbs', hbs({
  extname: '.hbs',
  partialsDir: 'views/',
  layoutsDir: 'views/',
  defaultLayout: 'layout-main'
}))

app.get('/', (req, res) => {
  res.render('app-welcome')
})

router.get('/:title', (req, res) => {
  let title = req.params.title
  recipe.findOne({ title: title })
    .then(recipe => {
      res.render('recipe-show', { recipe: recipe })
    })
})

app.use('/recipe', recipe)

app.listen(app.get('port'), () => {
  console.log('It\'s aliiive!')
  console.log('Im rnning port 3001')
})
