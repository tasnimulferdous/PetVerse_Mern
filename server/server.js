const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const connectDB = require("./dbConnect/mongodb");
connectDB();



app.listen(3000, () => {
    console.log("Server is running on port 3000");
    });

