const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        //req represents the incoming request to our application. exists on the body prop
        const { title, subject, body, recipients} = req.body;

        //survey mongoose model
        //lowercase to know that it is an instance of a survey
        const survey = new Survey({
            title: title,
            subject: subject,
            body: body,
            //for every email address, return an object with prop email with the email.
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
    });
};  