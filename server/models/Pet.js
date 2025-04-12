const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    name: String,
    gender: String,
    size: String,
    age: String,
    photoUrl: String,
});

module.exports = mongoose.model("Pet", petSchema);
