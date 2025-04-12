const multer = require("multer");
const path = require("path");
const Pet = require("../models/Pet");

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
    },
});

const upload = multer({ storage: storage });

// GET all pets
exports.getPets = async (req, res) => {
    try {
        const pets = await Pet.find().sort({ _id: -1 });
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST new pet (with image upload)
exports.addPet = [
    upload.single("photo"), // Handle single file upload
    async (req, res) => {
        try {
            const { name, gender, size, age } = req.body;
            const photoUrl = req.file ? `/uploads/${req.file.filename}` : null; // Save the relative path to the image

            const pet = new Pet({ name, gender, size, age, photoUrl });
            const savedPet = await pet.save();
            res.status(201).json(savedPet);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
];

// PUT (Edit) pet
exports.updatePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(pet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE pet
exports.deletePet = async (req, res) => {
    try {
        const result = await Pet.findByIdAndDelete(req.params.id);
        res.json({ message: "Pet deleted", id: result._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
