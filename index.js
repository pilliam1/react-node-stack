const express = require('express');

const app = express();

//route handler
app.get('/', (req ,res) => {
    res.send({ bye: 'buddddd'});
});

//dynamic port binding.
//heroku will set an enviroment variable to bind the port to. 
const PORT = process.env.PORT || 5000;
app.listen(PORT);
