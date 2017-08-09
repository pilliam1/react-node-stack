const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String
});

//loading in userSchema into mongoose
//tells mongoose we want to create a new collection called 'users'
mongoose.model('users', userSchema);