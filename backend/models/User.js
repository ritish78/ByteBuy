const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob : {
        type: Date,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Address'
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema);

module.exports = User;