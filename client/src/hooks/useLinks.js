import { useState, useEffect, useCallback } from 'react';
import { getAllLinks, deleteLink, createShortUrl } from '../api/links.api';

export const useLinks = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchLinks = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const response = await getAllLinks();
            setLinks(response.data || []);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    const addLink = (newLink) => {
        setLinks(prev => [newLink, ...prev]);
    };

    const removeLink = async (code) => {
        try {
            await deleteLink(code);
            setLinks(prev => prev.filter(link => link.code !== code));
        } catch (err) {
            throw err;
        }
    };

    return { links, loading, error, addLink, removeLink, refetch: fetchLinks };
};