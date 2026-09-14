import api from "./api";



// Get all properties
export const getProperties = async (params = {}) => {

    const response = await api.get(
        "/properties",
        {
            params
        }
    );


    return response.data.data;

};




// Get single property
export const getProperty = async (id) => {


    const response =
        await api.get(
            `/properties/${id}`
        );


    return response.data.data;


};




// Create property
export const createProperty = async (propertyData) => {


    const response =
        await api.post(
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


    const response =
        await api.put(
            `/properties/${id}`,
            propertyData
        );


    return response.data.data;


};




// Delete property
export const deleteProperty = async (id) => {


    const response =
        await api.delete(
            `/properties/${id}`
        );


    return response.data;


};