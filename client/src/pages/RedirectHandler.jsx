import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function RedirectHandler() {
    const { code } = useParams();

    useEffect(() => {
        const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        window.location.href = `${backendUrl}/${code}`;
    }, [code]);

    return <LoadingSpinner text="Redirecting..." />;
}