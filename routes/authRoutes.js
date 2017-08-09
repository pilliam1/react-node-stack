const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', 
                            //'google' is referring to GoogleStrategy
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    //create route handler for callback recieved from google once user grant permission
    app.get('/auth/google/callback', passport.authenticate('google'));
};