const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//fetching class
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

//turning ID into a mongoose model instance
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    //pass in config that tells this googlestrat how to auth users.
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleID: profile.id })
        //promise
            .then((existingUser) => {
                if (existingUser){
                    //already have record with profileID
                    //1st arg means everything is fine
                    //2nd arg means this is the user we found
                    done(null, existingUser);
                } else {
                    //dont have user record, make a new one
                    //creates mongoose model instance
                    new User({ googleID: profile.id}).save()
                        .then(user => done(null, user));
                }
            });
        }
    )
);