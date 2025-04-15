const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Get MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => 
    mongoose
.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

module.exports = connectDB;