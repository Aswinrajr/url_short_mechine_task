export const formatDate = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatUrl = (url, maxLength = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
};

export const getShortUrl = (code) => {
    return `${window.location.origin}/${code}`;
};