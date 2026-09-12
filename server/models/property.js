const mongoose = require("mongoose");


const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


const Property = mongoose.model(
    "Property",
    propertySchema
);


module.exports = Property;