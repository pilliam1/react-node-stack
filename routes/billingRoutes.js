const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    //recieving whats sent from the client and then sending async request to stripe API, once stripe API has responded
    //we will then take the user model and add 5 credits and send the model back to the client.
    app.post('/api/stripe', requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        req.user.credits +=5;
        //persisting update user credit value to the DB
        const user = await req.user.save();
        
        res.send(user);
    });
};