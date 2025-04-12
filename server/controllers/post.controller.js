const Post = require("../models/post.model");
const mongoose = require("mongoose");

// Create a new post
const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { image } = req.body;
        //const userId = req.user._id;

        // Validate input
        if (!text && (!image || image.length === 0)) {
            return res.status(400).json({ message: "Text or image is required" });
        }

        // Handle image as array if it's not already
        if (image && !Array.isArray(image)) {
            image = [image];
        }

        // Create new post
        const newPost = new Post({
            //user: userId,
            text,
            image
        });
        
        await newPost.save();
        res.status(201).json({ 
            message: "Post created successfully", 
            post: newPost 
        });
    }
    catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        // Get all posts sorted by newest first
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .exec();
        
        res.status(200).json({ 
            message: "Posts retrieved successfully",
            count: posts.length,
            posts: posts 
        });
    } catch (error) {
        console.error("Error retrieving posts:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        // Find and delete the post
        const deletedPost = await Post.findByIdAndDelete(id);
        
        // Check if post was found
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ 
            message: "Post deleted successfully",
            deletedPost: deletedPost
        });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    deletePost
};