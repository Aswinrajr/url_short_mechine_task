import Link from '../models/Link.js';
import validUrl from 'valid-url';
import { generateUniqueCode, validateCodeFormat } from '../utils/codeGenerator.js';

const { isWebUri } = validUrl;

const sendResponse = (res, status, success, data = null, message = '') => {
    const response = { success };
    if (data !== null) response.data = data;
    if (message) response.message = message;
    return res.status(status).json(response);
};

export const createLink = async (req, res) => {
    try {
        let { url, code: customCode } = req.body;

        if (!url) {
            return sendResponse(res, 400, false, null, 'URL is required');
        }

        if (!isWebUri(url)) {
            return sendResponse(res, 400, false, null, 'Invalid URL format');
        }

        let code;
        if (customCode) {
            if (!validateCodeFormat(customCode)) {
                return sendResponse(
                    res,
                    400,
                    false,
                    null,
                    'Custom code must be 6-8 alphanumeric characters'
                );
            }
            code = customCode.toUpperCase();

            const existingLink = await Link.findOne({ code });
            if (existingLink) {
                return sendResponse(
                    res,
                    409,
                    false,
                    null,
                    'Custom code already in use'
                );
            }
        } else {
            code = await generateUniqueCode();
        }

        const link = new Link({ url, code, clicks: 0 });
        await link.save();

        return sendResponse(res, 201, true, link, 'URL shortened successfully');
    } catch (error) {
        console.error('Error creating short URL:', error);
        return sendResponse(res, 500, false, null, 'Server error: ' + error.message);
    }
};

export const getAllLinks = async (req, res) => {
    try {
        const links = await Link.find().sort({ createdAt: -1 });
        return sendResponse(res, 200, true, links);
    } catch (error) {
        console.error('Error fetching links:', error);
        return sendResponse(res, 500, false, null, 'Error fetching links');
    }
};

export const getLinkStats = async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code.toUpperCase() });
        if (!link) {
            return sendResponse(res, 404, false, null, 'Link not found');
        }
        return sendResponse(res, 200, true, link);
    } catch (error) {
        console.error('Error fetching link stats:', error);
        return sendResponse(res, 500, false, null, 'Error fetching link stats');
    }
};

export const deleteLink = async (req, res) => {
    try {
        const link = await Link.findOneAndDelete({ code: req.params.code.toUpperCase() });
        if (!link) {
            return sendResponse(res, 404, false, null, 'Link not found');
        }
        return sendResponse(res, 200, true, null, 'Link deleted successfully');
    } catch (error) {
        console.error('Error deleting link:', error);
        return sendResponse(res, 500, false, null, 'Error deleting link');
    }
};