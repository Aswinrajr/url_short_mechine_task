import api from './axios.config';

export const createShortUrl = async (url, customCode = '') => {
    const response = await api.post('/api/links', { url, code: customCode });
    return response.data;
};

export const getLinkStats = async (code) => {
    const response = await api.get(`/api/links/${code}`);
    return response.data;
};

export const getAllLinks = async () => {
    const response = await api.get('/api/links');
    return response.data;
};

export const deleteLink = async (code) => {
    const response = await api.delete(`/api/links/${code}`);
    return response.data;
};