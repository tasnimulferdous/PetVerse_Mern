const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true,
    },
    location : {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    }
});

// Add index for phone_number field
UserSchema.index({ phone_number: 1 });

const UserModel = mongoose.model('users', UserSchema); // Create a model_>table/collection named 'users' based on the UserSchema->fields
module.exports = UserModel;