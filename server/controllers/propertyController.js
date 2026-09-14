const mongoose = require("mongoose");
const Property = require("../models/property");

const propertyFields = [
    "title",
    "price",
    "location",
    "description",
    "imageUrl"
];

const pickPropertyFields = (body = {}) => propertyFields.reduce((data, field) => {
    if (body[field] !== undefined) {
        data[field] = body[field];
    }

    return data;
}, {});

const escapeRegex = (value) => value.replace(
    /[.*+?^${}()|[\]\\]/g,
    String.raw`\$&`
);

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const validationMessage = (error) => error.name === "ValidationError"
    ? Object.values(error.errors).map((item) => item.message).join(", ")
    : error.message;

const buildPropertyQuery = (search, minPrice, maxPrice) => {
    const query = {};

    if (search?.trim()) {
        const safeSearch = escapeRegex(search.trim());
        query.$or = [
            { title: { $regex: safeSearch, $options: "i" } },
            { location: { $regex: safeSearch, $options: "i" } },
            { description: { $regex: safeSearch, $options: "i" } }
        ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        const minimum = Number(minPrice);
        const maximum = Number(maxPrice);

        if (minPrice !== undefined && (!Number.isFinite(minimum) || minimum < 0)) {
            throw new Error("minPrice must be a non-negative number");
        }

        if (maxPrice !== undefined && (!Number.isFinite(maximum) || maximum < 0)) {
            throw new Error("maxPrice must be a non-negative number");
        }

        query.price = {};
        if (minPrice !== undefined) query.price.$gte = minimum;
        if (maxPrice !== undefined) query.price.$lte = maximum;
    }

    return query;
};

const getSortOption = (sort) => {
    if (sort === "priceAsc") return { price: 1 };
    if (sort === "priceDesc") return { price: -1 };
    return { createdAt: -1 };
};

const createProperty = async (req, res) => {
    try {
        const property = await Property.create(pickPropertyFields(req.body));

        return res.status(201).json({
            success: true,
            data: property
        });
    } catch (error) {
        return res.status(error.name === "ValidationError" ? 400 : 500).json({
            success: false,
            message: validationMessage(error)
        });
    }
};

const getProperties = async (req, res) => {
    try {
        const { search, minPrice, maxPrice, sort } = req.query;
        let query;
        try {
            query = buildPropertyQuery(search, minPrice, maxPrice);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        const properties = await Property.find(query).sort(getSortOption(sort));

        return res.status(200).json({
            success: true,
            data: properties
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProperty = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid property ID"
            });
        }

        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateProperty = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid property ID"
            });
        }

        const propertyData = pickPropertyFields(req.body);

        if (Object.keys(propertyData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one property field is required"
            });
        }

        const property = await Property.findByIdAndUpdate(
            req.params.id,
            propertyData,
            { new: true, runValidators: true }
        );

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        return res.status(error.name === "ValidationError" ? 400 : 500).json({
            success: false,
            message: validationMessage(error)
        });
    }
};

const deleteProperty = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid property ID"
            });
        }

        const property = await Property.findByIdAndDelete(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: property._id,
                message: "Property deleted successfully"
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
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
