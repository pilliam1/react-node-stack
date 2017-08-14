const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', 
                            //'google' is referring to GoogleStrategy
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    //create route handler for callback recieved from google once user grant permission
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        //after authenticate() it will redirect the user to /surveys
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};