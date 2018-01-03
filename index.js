<<<<<<< HEAD
// establish depndencies of express, handlebars, body parser and method overrride
=======
//establish all dependencies
>>>>>>> b34ba0a8c0e58f0706921a298b26cb3ceea29d9f
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const recipe = require('./controllers/recipe')
const parser = require('body-parser')
const methodOverride = require('method-override')

// establish local host port and  environment variables in our app
app.set('port', process.env.PORT || 3001)
//Use override method in our app
// KEEP CLOSE TO THE TOP! 
app.use(methodOverride('_method'))
// setting hbs to our app
app.set('view engine', 'hbs')
// setting hbs engine  to our app
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
// use parser middle ware to our app 
app.use(parser.urlencoded({ extended: true }))
app.use('/recipe', recipe)
//Listen at the port and console the server status is running.....
app.listen(app.get('port'), () => {
  console.log('It\'s aliiive!')
  console.log('IServer running at  3001 .......')
})
