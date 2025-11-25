import ShortenForm from '../components/links/ShortenForm';
import LinkList from '../components/links/LinkList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useLinks } from '../hooks/useLinks';
import { LinkIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Dashboard({ showToast }) {
    const { links, loading, error, addLink, removeLink, refetch } = useLinks();

    const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
    const activeLinks = links.length;
    const recentLinks = links.filter(link => {
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return new Date(link.createdAt) > dayAgo;
    }).length;

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-black">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        TinyLink
                    </span>
                </h1>
                <p className="mt-3 max-w-2xl mx-auto text-base text-gray-600">
                    Transform your long URLs into memorable short links. Track performance, manage all your links, and share with confidence.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <ShortenForm onSuccess={addLink} showToast={showToast} />
                </div>

                {!loading && !error && activeLinks > 0 && (
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <LinkIcon className="h-6 w-6" />
                                    <span className="text-sm font-medium">Active Links</span>
                                </div>
                                <span className="text-2xl font-bold">{activeLinks}</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <ChartBarIcon className="h-6 w-6" />
                                    <span className="text-sm font-medium">Total Clicks</span>
                                </div>
                                <span className="text-2xl font-bold">{totalClicks}</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <ClockIcon className="h-6 w-6" />
                                    <span className="text-sm font-medium">Created Today</span>
                                </div>
                                <span className="text-2xl font-bold">{recentLinks}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Your Links</h2>
                        <p className="text-gray-600 text-sm mt-1">Manage and track all your shortened URLs</p>
                    </div>
                </div>

                {loading ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
                        <LoadingSpinner text="Loading your links..." />
                    </div>
                ) : error ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
                        <ErrorMessage message={error} onRetry={refetch} />
                    </div>
                ) : (
                    <LinkList links={links} onDelete={removeLink} showToast={showToast} />
                )}
            </div>
        </>
    );
}