//establish all dependencies
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const recipe = require('./controllers/recipe')
const parser = require('body-parser')
const methodOverride = require('method-override')

app.set('port', process.env.PORT || 3001)

app.use(methodOverride('_method'))

app.set('view engine', 'hbs')

app.engine('.hbs', hbs({
  extname: '.hbs',
  partialsDir: 'views/',
  layoutsDir: 'views/',
  defaultLayout: 'layout-main'
}))
//set up root route
app.get('/', (req, res) => {
  res.render('app-welcome')
})

//set up secret route
app.get('/secret', (req, res) => {
  res.render('secret')
})

app.use('/assets', express.static('public'))

app.use(parser.urlencoded({ extended: true }))
app.use('/recipe', recipe)

app.listen(app.get('port'), () => {
  console.log('It\'s aliiive!')
  console.log('IServer running at  3001 .......')
})
