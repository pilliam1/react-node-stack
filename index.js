const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(new GoogleStrategy({
    //pass in config that tells this googlestrat how to auth users.
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('access token :' + accessToken);
        console.log('refresh token :' + refreshToken);
        console.log('profile :' + profile);
        }
    )
);


app.get('/auth/google', 
                        //'google' is referring to GoogleStrategy
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

//create route handler for callback recieved from google once user grant permission
app.get('/auth/google/callback', passport.authenticate('google'));


//dynamic port binding.
//heroku will set an enviroment variable to bind the port to. 
const PORT = process.env.PORT || 5000;
app.listen(PORT);
