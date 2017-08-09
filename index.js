const express = require('express');
require('./services/passport.js');

const app = express();

require('./routes/authRoutes')(app);


//dynamic port binding.
//heroku will set an enviroment variable to bind the port to. 
const PORT = process.env.PORT || 5000;
app.listen(PORT);
