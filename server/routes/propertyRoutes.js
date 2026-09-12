const express = require("express");

const router = express.Router();


const {
    createProperty,
    getProperties,
    getProperty,
    updateProperty,
    deleteProperty
} = require("../controllers/propertyController");


// Create a new property
// POST /api/properties
router.post("/", createProperty);


// Get all properties
// GET /api/properties
router.get("/", getProperties);


// Get a single property by ID
// GET /api/properties/:id
router.get("/:id", getProperty);


// Update a property
// PUT /api/properties/:id
router.put("/:id", updateProperty);


// Delete a property
// DELETE /api/properties/:id
router.delete("/:id", deleteProperty);


module.exports = router;