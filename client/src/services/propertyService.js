import API from "./api";


// Get all properties
export const getProperties = async (filters = {}) => {

    const response = await API.get("/properties", {
        params: filters
    });

    return response.data.data;

};


// Get single property
export const getProperty = async (id) => {

    const response = await API.get(`/properties/${id}`);

    return response.data.data;

};


// Create property
export const createProperty = async (propertyData) => {

    const response = await API.post(
        "/properties",
        propertyData
    );

    return response.data.data;

};


// Update property
export const updateProperty = async (
    id,
    propertyData
) => {

    const response = await API.put(
        `/properties/${id}`,
        propertyData
    );

    return response.data.data;

};


// Delete property
export const deleteProperty = async (id) => {

    const response = await API.delete(
        `/properties/${id}`
    );

    return response.data.data;

};