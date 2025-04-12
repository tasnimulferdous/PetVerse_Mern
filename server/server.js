const express = require("express");
const cors = require("cors");
const connectDB = require("./dbConnect/mongodb.js");
const petRoutes = require("./routes/petRoutes.js");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();
app.use("/api", petRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
