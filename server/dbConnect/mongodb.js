const mongoose = require("mongoose");

// DBzHypiS9THmv9aM
// mongodb+srv://tasnimulferdous:DBzHypiS9THmv9aM@cluster0.kihrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const connectDB = async () => 
    mongoose
.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

module.exports = connectDB;