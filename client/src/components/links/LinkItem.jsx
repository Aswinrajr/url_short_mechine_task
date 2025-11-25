import { Link } from 'react-router-dom';
import { DocumentDuplicateIcon, TrashIcon, ChartBarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { formatDate, formatUrl, getShortUrl } from '../../utils/formatters';

export default function LinkItem({ link, onDelete, showToast }) {
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
        if (!window.confirm('Are you sure you want to delete this link? This action cannot be undone.')) return;

        try {
            await onDelete(link.code);
            showToast('Link deleted successfully', 'success');
        } catch (err) {
            showToast('Failed to delete link', 'error');
        }
    };

    return (
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
                    onClick={handleDelete}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Delete link"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div >
        </div >
    );
}