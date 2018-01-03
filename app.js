// establish all dependencies
  const express = require('express')
  const app = express()
  const hbs = require('express-handlebars')
  const recipe = require('./controllers/recipe')
  const parser = require('body-parser')
  const methodOverride = require('method-override')
  const passport = require('passport')
  const flash = require('connect-flash')
  const morgan = require('morgan')
  const cookieParser = require('cookie-parser')
  const bodyParser = require('body-parser')
  const session = require('express-session')
  const localStrategy = require('passport-local')
  const passportLocalMongoose = require('passport-local-mongoose')
  const User = require('./models/user')

// Establish mongoose connection
const mongoose = require('mongoose')
// add localhost with   recipe-auth path
mongoose.connect('mongodb://localhost/recipe-auth', { useMongoClient: true })
mongoose.Promise = Promise
module.exports = mongoose

//
app.use(require('express-session')({
    // used to encode and decode the session
  secret: 'zola and wit app',
  resave: false,
  saveUninitialized: false

}))

// use passport for the app
app.use(passport.initialize())
app.use(passport.session())

app.use('/assets', express.static('public'))
app.use(parser.urlencoded({ extended: true }))
app.use('/recipe', recipe)
// responsible for reading the session encode and decode.It comes with passport local mongose.
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.set('port', process.env.PORT || 3001)
app.use(methodOverride('_method'))
app.set('view engine', 'hbs')
app.engine('.hbs', hbs({
  extname: '.hbs',
  partialsDir: 'views/',
  layoutsDir: 'views/',
  defaultLayout: 'layout-main'
}))

// ============
// ROUTES
// ============

// set up root route
app.get('/', (req, res) => {
  res.render('app-welcome')
})

// set up secret route
app.get('/secret', (req, res) => {
  res.render('secret')
})
// set up Auth route

// Show sign up form
app.get('/register', (req, res) => {
  res.render('register')
})


app.listen(app.get('port'), () => {
  console.log('It\'s aliiive!')
  console.log('The server is running at port 3001 .......')
})
