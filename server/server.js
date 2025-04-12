const express = require("express");
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const cors = require('cors');
const dotenv = require("dotenv");

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
const connectDB = require("./dbConnect/mongodb");
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", authRoutes);
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
