export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const isValidCode = (code) => {
    return /^[A-Za-z0-9]{6,8}$/.test(code);
};