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
            required: true,
            trim: true,
            minlength: 20
        },

        imageUrl: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: (value) => {
                    try {
                        new URL(value);
                        return true;
                    } catch {
                        return false;
                    }
                },
                message: "imageUrl must be a valid URL"
            }
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