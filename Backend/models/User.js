
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Empêche les doublons
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
