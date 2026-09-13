const Property = require("../models/Property");


// @desc    Create a new property
// @route   POST /api/properties
const createProperty = async (req, res) => {

    try {

        const property = await Property.create(req.body);

        res.status(201).json(property);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// @desc    Get all properties
// @route   GET /api/properties
const getProperties = async (req, res) => {

    try {

        const properties = await Property.find();

        res.status(200).json(properties);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// @desc    Get single property
// @route   GET /api/properties/:id
const getProperty = async (req, res) => {

    try {

        const property = await Property.findById(req.params.id);


        if (!property) {

            return res.status(404).json({
                message: "Property not found"
            });

        }


        res.status(200).json(property);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// @desc    Update a property
// @route   PUT /api/properties/:id
const updateProperty = async (req, res) => {

    try {

        const property = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );


        if (!property) {

            return res.status(404).json({
                message: "Property not found"
            });

        }


        res.status(200).json(property);


    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// @desc    Delete a property
// @route   DELETE /api/properties/:id
const deleteProperty = async (req, res) => {

    try {

        const property = await Property.findByIdAndDelete(
            req.params.id
        );


        if (!property) {

            return res.status(404).json({
                message: "Property not found"
            });

        }


        res.status(200).json({
            message: "Property deleted successfully"
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    createProperty,
    getProperties,
    getProperty,
    updateProperty,
    deleteProperty
};