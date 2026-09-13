import axios from "axios";


const API_URL = "http://localhost:5000/api/properties";


// Get all properties
export const getProperties = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};


// Get single property
export const getProperty = async (id) => {

    const response = await axios.get(
        `${API_URL}/${id}`
    );

    return response.data;

};


// Create a new property
export const createProperty = async (propertyData) => {

    const response = await axios.post(
        API_URL,
        propertyData
    );

    return response.data;

};


// Delete a property
export const deleteProperty = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;

};


// Update a property
export const updateProperty = async (id, propertyData) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        propertyData
    );

    return response.data;

};