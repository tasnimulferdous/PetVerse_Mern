const express = require("express");
const { createPost, getAllPosts, deletePost } = require("../controllers/post.controller");

const router = express.Router();

// POST /api/post/create - Create a new post
router.post("/create", createPost);

// GET /api/post/all - Get all posts
router.get("/all", getAllPosts);

// DELETE /api/post/:id - Delete a post
router.delete("/:id", deletePost);

module.exports = router;