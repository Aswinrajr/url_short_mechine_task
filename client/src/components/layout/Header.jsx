import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, LinkIcon, HeartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                                <LinkIcon className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                TinyLink
                            </h1>
                            <p className="text-xs text-gray-500 -mt-1">URL Shortener</p>
                        </div>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <nav className="flex space-x-1">
                            <Link
                                to="/"
                                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive('/')
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <HomeIcon className="h-5 w-5 mr-2" />
                                Dashboard
                            </Link>
                            <Link
                                to="/healthz"
                                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive('/healthz')
                                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/50'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <HeartIcon className="h-5 w-5 mr-2" />
                                Health
                            </Link>
                        </nav>

                        <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                            <UserCircleIcon className="h-6 w-6 text-blue-600" />
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-medium">Candidate ID</span>
                                <span className="text-sm font-bold text-gray-900">Naukri1125</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}