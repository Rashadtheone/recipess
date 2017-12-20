const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const recipe = require('./controllers/recipe')
const parser = require('body-parser')
const methodOverride = require('method-override')

app.set('port', process.env.PORT || 3001)

app.set('view engine', 'hbs')

app.engine('.hbs', hbs({
  extname: '.hbs',
  partialsDir: 'views/',
  layoutsDir: 'views/',
  defaultLayout: 'layout-main'
}))

app.use(parser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('app-welcome')
})

app.use('/recipe', recipe)
app.use(methodOverride('_method'))

app.listen(app.get('port'), () => {
  console.log('It\'s aliiive!')
  console.log('Im rnning port 3001')
})
