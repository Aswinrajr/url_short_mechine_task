import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import LinkItem from './LinkItem';
import EmptyState from '../common/EmptyState';

export default function LinkList({ links, onDelete, showToast }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('recent');

    let filteredLinks = links.filter(link =>
        link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'clicks') {
        filteredLinks = [...filteredLinks].sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    } else if (sortBy === 'recent') {
        filteredLinks = [...filteredLinks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (links.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
                <EmptyState
                    title="No links yet"
                    description="Get started by creating your first shortened URL above."
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by code or URL..."
                        className="block w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            <span className="text-xl">×</span>
                        </button>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white"
                    >
                        <option value="recent">Most Recent</option>
                        <option value="clicks">Most Clicks</option>
                    </select>
                </div>
            </div>

            {filteredLinks.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
                    <EmptyState
                        title="No results found"
                        description="Try adjusting your search term."
                    />
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredLinks.map((link) => (
                        <LinkItem
                            key={link._id}
                            link={link}
                            onDelete={onDelete}
                            showToast={showToast}
                        />
                    ))}
                </div>
            )}

            <div className="text-center py-4">
                <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-gray-700">{filteredLinks.length}</span> of <span className="font-semibold text-gray-700">{links.length}</span> links
                </p>
            </div>
        </div>
    );
}