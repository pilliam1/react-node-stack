const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    credits: { type: Number, default: 0}
});

//loading in userSchema into mongoose
//tells mongoose we want to create a new collection called 'users'
mongoose.model('users', userSchema);