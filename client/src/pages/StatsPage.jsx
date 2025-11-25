import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLinkStats } from '../api/links.api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { formatDate, getShortUrl } from '../utils/formatters';
import {
    ArrowLeftIcon,
    ArrowTopRightOnSquareIcon,
    ChartBarIcon,
    ClockIcon,
    CalendarIcon,
    CursorArrowRaysIcon
} from '@heroicons/react/24/outline';

export default function StatsPage() {
    const { code } = useParams();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await getLinkStats(code);
                setStats(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [code]);

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
                <LoadingSpinner text="Loading statistics..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
                    <ErrorMessage message={error} />
                </div>
                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
                    >
                        <ArrowLeftIcon className="mr-2 h-5 w-5" />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium group"
                >
                    <ArrowLeftIcon className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-12">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="relative">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                <ChartBarIcon className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-white">Link Analytics</h1>
                                <p className="text-blue-100 mt-1">Detailed performance metrics</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <CursorArrowRaysIcon className="h-8 w-8 text-blue-600" />
                                </div>
                                <p className="text-sm font-medium text-blue-900 mb-2">Total Clicks</p>
                                <p className="text-5xl font-bold text-blue-600">{stats.clicks || 0}</p>
                            </div>
                        </div>

                        <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-purple-200 rounded-full opacity-20"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-3">
                                    <ClockIcon className="h-8 w-8 text-purple-600" />
                                </div>
                                <p className="text-sm font-medium text-purple-900 mb-2">Last Clicked</p>
                                <p className="text-xl font-semibold text-purple-600">
                                    {formatDate(stats.lastClicked)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-3"></span>
                            Link Details
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Short URL
                                </label>
                                <div className="flex items-center space-x-3">
                                    <a
                                        href={getShortUrl(code)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center space-x-2 text-lg font-mono font-semibold text-blue-600 hover:text-blue-700 bg-white px-4 py-3 rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-all group"
                                    >
                                        <span>{getShortUrl(code)}</span>
                                        <ArrowTopRightOnSquareIcon className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Original URL
                                </label>
                                <a
                                    href={stats.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 text-gray-900 hover:text-blue-600 break-all bg-white px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-blue-200 transition-all group"
                                >
                                    <span>{stats.url}</span>
                                    <ArrowTopRightOnSquareIcon className="h-4 w-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    <CalendarIcon className="inline-block h-5 w-5 mr-2" />
                                    Created
                                </label>
                                <p className="text-gray-900 font-medium bg-white px-4 py-3 rounded-lg border-2 border-gray-200">
                                    {formatDate(stats.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}