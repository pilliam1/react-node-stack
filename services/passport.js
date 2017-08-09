const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(new GoogleStrategy({
    //pass in config that tells this googlestrat how to auth users.
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('access token :' + accessToken);
        console.log('refresh token :' + refreshToken);
        console.log(JSON.stringify(profile));
        }
    )
);