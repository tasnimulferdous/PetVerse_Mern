const express = require("express");

const app = express()

const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const postRoutes = require('./routes/post.routes');

const connectDB = require("./dbConnect/mongodb"); // Connect to MongoDB

require('dotenv').config(); //
connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 3000;//

app.use(express.json());
app.use(cors());
// Removed redundant bodyParser.json() middleware
// app.use(bodyParser.json());


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', AuthRouter);
app.use("/api/post", postRoutes);

// Root route for API information
app.get("/", (req, res) => {
  res.json({
    message: "PetVerse API Server",
    endpoints: {
      auth: "/api/auth",
      posts: {
        create: "POST /api/post/create",
        getAll: "GET /api/post/all",
        delete: "DELETE /api/post/:id"
      }
    }
  });
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
