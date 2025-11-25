import Link from '../models/Link.js';

export async function generateUniqueCode(maxRetries = 5) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < maxRetries; i++) {
        let code = '';
        for (let j = 0; j < 6; j++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        const exists = await Link.findOne({ code });
        if (!exists) return code;
    }

    throw new Error('Failed to generate unique code');
}

export function validateCodeFormat(code) {
    return /^[A-Za-z0-9]{6,8}$/.test(code);
}