const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys')
require('./models/User');
require('./services/passport.js');

mongoose.connect(keys.mongoURI);

const app = express();

//parser middleware
app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app);

//only executed in production
if(process.env.NODE_ENV === 'production'){
    //Express will serve up production assets
    //ie: main.js, or main.css

    //if there is a request that we dont have a route handler for, then look into 'client/build'
    //express will check to see if there is a SPECIFIC file that matches up with what that request is looking for.
    app.use(express.static('client/build'));
    //Express serve up index.html
    //if there is nothing in authRoute billingRoute and nothing to match up with in 'client/build', exhausted all options
    //expect that it just needs the html    
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


//dynamic port binding.
//heroku will set an enviroment variable to bind the port to. 
const PORT = process.env.PORT || 5000;
app.listen(PORT);
