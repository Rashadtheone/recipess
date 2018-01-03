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

// use passport and the stratagy local to authencicate
// the authontication method come from passportLocalMongoose
passport.use(new localStrategy(User.authenticate()))

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

// Handling user sign UP
app.post('/register', (req, res)=>{
  req.body.username
  req.body.password
  // create new user object, and pass in only user name and we dont save the password to db
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.render("register")
    }
    //if not error the passport middle ware take care of the session, 
    //register the correct info, serialize user method and deserialize
    // the passport strategy here is local
    passport.authenticate("local")(req, res, function(){
      // once logged in redirect to secret
      res.redirect("/secret");
    })

  });

});

// Login routes
// Render login form
app.get("/login", function(req, res){
  res.render("login");

})

// login logic
// passport.authenticate is a middleware run before final callback
// check credientials of request inside body aganist the db
  app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"

}) ,function(req, res){


});



app.listen(app.get('port'), () => {
  console.log('It\'s aliiive!')
  console.log('The server is running at port 3001 .......')
})