// API service functions
// Example structure for making API calls

import { API_BASE_URL } from '../utils/constants';

// Generic fetch wrapper
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Example API functions
export const apiService = {
  // GET request
  get: (endpoint) => fetchAPI(endpoint, { method: 'GET' }),
  
  // POST request
  post: (endpoint, data) => fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // PUT request
  put: (endpoint, data) => fetchAPI(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // DELETE request
  delete: (endpoint) => fetchAPI(endpoint, { method: 'DELETE' }),
};

// Example: Get all items
export const getItems = () => apiService.get('/items');

// Example: Get single item
export const getItem = (id) => apiService.get(`/items/${id}`);

// Example: Create item
export const createItem = (data) => apiService.post('/items', data);

// Example: Update item
export const updateItem = (id, data) => apiService.put(`/items/${id}`, data);

// Example: Delete item
export const deleteItem = (id) => apiService.delete(`/items/${id}`);

