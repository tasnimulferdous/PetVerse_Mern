const express = require("express");
const router = express.Router();
const {
    getPets,
    addPet,
    updatePet,
    deletePet,
} = require("../controllers/petControllers.js");

router.get("/pets", getPets);
router.post("/pets", addPet);
router.put("/pets/:id", updatePet);
router.delete("/pets/:id", deletePet);

module.exports = router;
