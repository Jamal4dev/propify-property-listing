import { useState } from "react";
import { createProperty, updateProperty } from "../services/propertyService";

const initialForm = {
    title: "",
    price: "",
    location: "",
    description: "",
    imageUrl: ""
};

function PropertyForm({ onPropertyCreated, editingProperty, onPropertyUpdated }) {
    const [formData, setFormData] = useState(() => editingProperty
        ? {
            title: editingProperty.title,
            price: editingProperty.price,
            location: editingProperty.location,
            description: editingProperty.description,
            imageUrl: editingProperty.imageUrl
        }
        : initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [imageError, setImageError] = useState(false);

    const handleChange = (event) => {
        setFormData((current) => ({
            ...current,
            [event.target.name]: event.target.value
        }));
        setError("");
    };

    const validateForm = () => {
        const price = Number(formData.price);

        if (!formData.title.trim()) return "Property title is required";
        if (!Number.isFinite(price) || price <= 0) return "Price must be greater than zero";
        if (!formData.location.trim()) return "Location is required";
        if (formData.description.trim().length < 20) {
            return "Description should contain at least 20 characters";
        }

        try {
            new URL(formData.imageUrl);
        } catch {
            return "Please enter a valid image URL";
        }

        return "";
    };

    const resetForm = () => {
        setFormData(initialForm);
        setImageError(false);
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            const propertyData = {
                ...formData,
                price: Number(formData.price)
            };

            if (editingProperty) {
                await updateProperty(editingProperty._id, propertyData);
                onPropertyUpdated();
            } else {
                await createProperty(propertyData);
                onPropertyCreated();
            }

            resetForm();
        } catch (error) {
            console.error("Failed to save property:", error);
            setError(error.response?.data?.message ||
                "Failed to save property. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    let submitLabel = editingProperty ? "Update Property" : "Add Property";
    if (submitting) {
        submitLabel = editingProperty ? "Updating Property..." : "Adding Property...";
    }

    return (
        <form className="property-form" onSubmit={handleSubmit}>
            <h2>{editingProperty ? "Edit Property" : "Add New Property"}</h2>

            {error && <p className="form-error">{error}</p>}

            <div className="form-group">
                <label htmlFor="title">Property Title</label>
                <input id="title" type="text" name="title" placeholder="Enter property title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input id="price" type="number" name="price" min="1" placeholder="Enter property price" value={formData.price} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input id="location" type="text" name="location" placeholder="Enter property location" value={formData.location} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" placeholder="Describe the property" value={formData.description} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input id="imageUrl" type="url" name="imageUrl" placeholder="Paste image URL" value={formData.imageUrl} onChange={(event) => {
                    handleChange(event);
                    setImageError(false);
                }} required />
            </div>

            {formData.imageUrl && !imageError && (
                <div className="image-preview">
                    <img className="preview-image" src={formData.imageUrl} alt="Property preview" onError={() => setImageError(true)} />
                </div>
            )}

            {imageError && <p className="form-error">Image preview unavailable</p>}

            <button type="submit" disabled={submitting}>
                {submitLabel}
            </button>
        </form>
    );
}

export default PropertyForm;
