import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DocumentDuplicateIcon, TrashIcon, ChartBarIcon, ArrowTopRightOnSquareIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { formatDate, formatUrl, getShortUrl } from '../../utils/formatters';

export default function LinkItem({ link, onDelete, showToast }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const copyToClipboard = async () => {
        try {
            const fullUrl = getShortUrl(link.code);
            await navigator.clipboard.writeText(fullUrl);
            showToast('Copied to clipboard!', 'success');
        } catch (err) {
            showToast('Failed to copy URL', 'error');
        }
    };

    const handleDelete = async () => {
        try {
            await onDelete(link.code);
            showToast('Link deleted successfully', 'success');
            setShowDeleteConfirm(false);
        } catch (err) {
            showToast('Failed to delete link', 'error');
        }
    };

    return (
        <>
            <div className="group relative bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
                <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-3">
                            <a
                                href={getShortUrl(link.code)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors group/link"
                            >
                                <span className="font-mono">{window.location.host}/{link.code}</span>
                                <ArrowTopRightOnSquareIcon className="h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                            </a>

                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={copyToClipboard}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                    title="Copy to clipboard"
                                >
                                    <DocumentDuplicateIcon className="h-5 w-5" />
                                </button>
                                <Link
                                    to={`/code/${link.code}`}
                                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                                    title="View stats"
                                >
                                    <ChartBarIcon className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>

                        <div className="mb-3">
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center group/url"
                                title={link.url}
                            >
                                <span className="truncate">{formatUrl(link.url, 80)}</span>
                                <ArrowTopRightOnSquareIcon className="h-3 w-3 ml-1 opacity-0 group-hover/url:opacity-100 transition-opacity flex-shrink-0" />
                            </a>
                        </div>

                        <div className="flex items-center space-x-6 text-xs">
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white font-bold">
                                    {link.clicks || 0}
                                </div>
                                <span className="text-gray-600">clicks</span>
                            </div>

                            <div className="flex items-center space-x-2 text-gray-500">
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                <span>Last: {formatDate(link.lastClicked)}</span>
                            </div>

                            <div className="flex items-center space-x-2 text-gray-500">
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                <span>Created: {formatDate(link.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete link"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div >
            </div >

            {showDeleteConfirm && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={() => setShowDeleteConfirm(false)}
                    ></div>

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                            <div className="p-6">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Delete Link
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Are you sure you want to delete <span className="font-mono font-semibold text-blue-600">{link.code}</span>? This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex items-center justify-end space-x-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 shadow-lg transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
}