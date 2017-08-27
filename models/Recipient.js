const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema ({
    email: String,
    feedback: String,
    responded: { type: Boolean, default: false}
});

module.exports = recipientSchema;