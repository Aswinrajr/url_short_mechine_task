import { useState } from 'react';
import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { createShortUrl } from '../../api/links.api';
import { isValidUrl, isValidCode } from '../../utils/validators';

export default function ShortenForm({ onSuccess, showToast }) {
    const [url, setUrl] = useState('');
    const [customCode, setCustomCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!url) {
            newErrors.url = 'URL is required';
        } else if (!isValidUrl(url)) {
            newErrors.url = 'Please enter a valid URL';
        }
        if (customCode && !isValidCode(customCode)) {
            newErrors.code = 'Code must be 6-8 alphanumeric characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setErrors({});

        try {
            const data = await createShortUrl(url, customCode);
            showToast('URL shortened successfully!', 'success');
            setUrl('');
            setCustomCode('');
            if (onSuccess) onSuccess(data.data);
        } catch (err) {
            setErrors({ submit: err });
            showToast(err, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <div className="flex items-center space-x-2">
                    <SparklesIcon className="h-6 w-6 text-white" />
                    <div>
                        <h3 className="text-lg font-bold text-white">Create Short Link</h3>
                        <p className="text-blue-100 text-xs">Transform your long URLs into tiny links</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Long URL
                    </label>
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            setErrors(prev => ({ ...prev, url: '' }));
                        }}
                        placeholder="https://example.com/very/long/url"
                        className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 ${errors.url
                                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                                : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                            } focus:outline-none`}
                    />
                    {errors.url && (
                        <p className="mt-1 text-xs text-red-600">{errors.url}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="customCode" className="block text-sm font-semibold text-gray-700 mb-2">
                        Custom Code <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                    </label>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500 text-sm font-medium whitespace-nowrap">
                            {window.location.host}/
                        </span>
                        <input
                            type="text"
                            id="customCode"
                            value={customCode}
                            onChange={(e) => {
                                setCustomCode(e.target.value.toUpperCase());
                                setErrors(prev => ({ ...prev, code: '' }));
                            }}
                            placeholder="MYLINK"
                            maxLength={8}
                            className={`flex-1 px-4 py-3 border-2 rounded-lg transition-all duration-200 ${errors.code
                                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                                    : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
                                } focus:outline-none font-mono`}
                        />
                    </div>
                    {errors.code && (
                        <p className="mt-1 text-xs text-red-600">{errors.code}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                        6-8 alphanumeric characters
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading || !url}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <span className="flex items-center justify-center space-x-2">
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Creating...</span>
                            </>
                        ) : (
                            <>
                                <span>Shorten URL</span>
                                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </span>
                </button>
            </form>
        </div>
    );
}