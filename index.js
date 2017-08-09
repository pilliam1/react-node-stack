const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')
require('./models/user');
require('./services/passport.js');


mongoose.connect(keys.mongoURI);

const app = express();

//tell express to make use of cookies
app.use(
    //configuration object
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        keys: [keys.cookieKey]       
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);


//dynamic port binding.
//heroku will set an enviroment variable to bind the port to. 
const PORT = process.env.PORT || 5000;
app.listen(PORT);
