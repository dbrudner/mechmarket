
const express  = require('express');
const app      = express();
const port     = process.env.PORT || 5000;
const mongoose = require('mongoose');
const passport = require('passport');

const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const path = require('path')

const dbname = 'testdb'

const developmentUrl = `mongodb://localhost/${dbname}`

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
} else {
    mongoose.connect(developmentUrl, function(err) {
        console.log('connected')
    })
}

app.use(express.static(path.join(__dirname, 'react/build')));

require('./config/passport')(passport); 

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================h
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('App listening on port ' + port);