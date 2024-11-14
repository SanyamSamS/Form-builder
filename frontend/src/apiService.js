import axios from 'axios';

// Define API URL
const API_URL = 'http://localhost:3000/api/forms';

// Create an axios instance to handle base URL and potential configurations like headers
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Save a new form
export const saveForm = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/forms/save', formData);
    console.log("Response from backend:", response);
    if (response.status === 200) {
      alert("Form saved successfully!");
    }
  } catch (error) {
    console.error("Error saving form:", error);
    alert("Failed to save form.");
    console.log("Error details:", error.response ? error.response.data : error.message);
  }
};

// List all forms
export const listForms = async () => {
  try {
    const response = await apiClient.get('/list');
    return response.data;  // Return list of forms
  } catch (error) {
    console.error("Error fetching forms:", error);
    throw new Error(error.response ? error.response.data.message : error.message);  // Enhanced error handling
  }
};

// Fetch a form by ID
export const fetchFormById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data;  // Return the specific form data
  } catch (error) {
    console.error("Error fetching form:", error);
    throw new Error(error.response ? error.response.data.message : error.message);  // Enhanced error handling
  }
};

// Update a form by ID
export const updateFormById = async (id, updatedFormData) => {
  try {
    const response = await apiClient.put(`/update/${id}`, updatedFormData);
    return response.data;  // Return the updated form data
  } catch (error) {
    console.error("Error updating form:", error);
    throw new Error(error.response ? error.response.data.message : error.message);  // Enhanced error handling
  }
};