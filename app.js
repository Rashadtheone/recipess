//establish all dependencies
const   express = require('express'),
        app = express(),
        hbs = require('express-handlebars'),
        recipe = require('./controllers/recipe'),
        parser = require('body-parser'),
        methodOverride = require('method-override'),
        passport = require('passport'),
        flash         = require('connect-flash'),
        morgan        = require('morgan'),
        cookieParser  = require('cookie-parser'),
        bodyParser    = require('body-parser'),
        session       = require('express-session'),
        localStrategy = require('passport-local'),
        passportLocalMongoose = require('passport-local-mongoose'),
        User                  = require('./models/user')

//Establish mongoose connection
const mongoose = require('mongoose')
// add localhost with   recipe-auth path
mongoose.connect('mongodb://localhost/recipe-auth', { useMongoClient: true })
mongoose.Promise = Promise
module.exports = mongoose

//
app.use(require("express-session")({
    // used to encode and decode the session
    secret: "zola and wit app",
    resave: false,
    saveUninitialized: false

}))

//use passport for the app
app.use(passport.initialize());
app.use(passport.session());

app.use('/assets', express.static('public'))
app.use(parser.urlencoded({ extended: true }))
app.use('/recipe', recipe)
//responsible for reading the session encode and decode.It comes with passport local mongose. 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.set('port', process.env.PORT || 3001)
app.use(methodOverride('_method'))
app.set('view engine', 'hbs')
app.engine('.hbs', hbs({
  extname: '.hbs',
  partialsDir: 'views/',
  layoutsDir: 'views/',
  defaultLayout: 'layout-main'
}))

//============
// ROUTES
//============

//set up root route
app.get('/', (req, res) => {
  res.render('app-welcome')
})

//set up secret route
app.get('/secret', (req, res) => {
  res.render('secret')
})
//set up Auth route

// Show sign up form
app.get('/register', (req, res)=>{
    res.render('register')

});


app.listen(app.get('port'), () => {
  console.log('It\'s aliiive!')
  console.log('The server is running at port 3001 .......')
})