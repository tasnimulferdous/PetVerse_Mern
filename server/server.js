const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');

const connectDB = require("./dbConnect/mongodb"); // Connect to MongoDB

require('dotenv').config(); //
connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 3000;//

app.use(express.json());
app.use(cors());
// Removed redundant bodyParser.json() middleware
// app.use(bodyParser.json());

app.use('/auth', AuthRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


