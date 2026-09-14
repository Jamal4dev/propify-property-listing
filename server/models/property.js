const mongoose = require("mongoose");
const { minLength } = require("zod");


const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 1
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