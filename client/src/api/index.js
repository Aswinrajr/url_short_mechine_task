import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createShortUrl = async (url, customCode = '') => {
    try {
        const response = await axios.post(`${API_URL}/links`, { url, code: customCode });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to create short URL';
    }
};

// In client/src/api/index.js
export const getLinkStats = async (code) => {
    try {
        const response = await axios.get(`/api/links/${code}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching link stats:', error);
        throw error;
    }
};

export const getAllLinks = async () => {
    try {
        const response = await axios.get(`${API_URL}/links`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch links';
    }
};

export const deleteLink = async (code) => {
    try {
        const response = await axios.delete(`${API_URL}/links/${code}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete link';
    }
};