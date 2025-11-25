import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
    CheckCircleIcon,
    XCircleIcon,
    ArrowLeftIcon,
    ServerIcon,
    CircleStackIcon,
    ClockIcon,
    CodeBracketIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function HealthCheck() {
    const [health, setHealth] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchHealth = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/healthz`);
            const data = await response.json();
            setHealth(data);
        } catch (err) {
            setError('Failed to fetch health status');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHealth();
        const interval = setInterval(fetchHealth, 30000);
        return () => clearInterval(interval);
    }, []);

    const formatUptime = (seconds) => {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (days > 0) return `${days}d ${hours}h ${minutes}m`;
        if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
        if (minutes > 0) return `${minutes}m ${secs}s`;
        return `${secs}s`;
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    if (loading && !health) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
                    <LoadingSpinner text="Checking system health..." />
                </div>
            </div>
        );
    }

    const isHealthy = health?.ok && health?.status === 'healthy' && health?.mongoStatus === 'connected';

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <Link
                    to="/"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium group"
                >
                    <ArrowLeftIcon className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>
                <button
                    onClick={fetchHealth}
                    disabled={loading}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    <ArrowPathIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    <span className="text-sm font-medium">Refresh</span>
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className={`px-8 py-6 ${isHealthy
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                        : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                {isHealthy ? (
                                    <CheckCircleIcon className="h-10 w-10 text-white" />
                                ) : (
                                    <XCircleIcon className="h-10 w-10 text-white" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">System Health</h1>
                                <p className="text-white/90 mt-1">Real-time system status and metrics</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${isHealthy ? 'bg-green-400/30' : 'bg-red-400/30'
                                }`}>
                                <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-white animate-pulse' : 'bg-white'
                                    }`}></div>
                                <span className="text-white font-semibold text-sm uppercase">
                                    {health?.status || 'Unknown'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {error ? (
                    <div className="p-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <XCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-3" />
                            <p className="text-red-800 font-medium">{error}</p>
                            <button
                                onClick={fetchHealth}
                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-blue-500 p-3 rounded-lg">
                                        <ServerIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-blue-900">Server Status</p>
                                        <p className="text-xs text-blue-700">API Health Check</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-blue-800 font-medium">Status:</span>
                                    <div className="flex items-center space-x-2">
                                        {health?.ok ? (
                                            <>
                                                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                                <span className="text-green-700 font-semibold">Online</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircleIcon className="h-5 w-5 text-red-600" />
                                                <span className="text-red-700 font-semibold">Offline</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-purple-500 p-3 rounded-lg">
                                        <CircleStackIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-purple-900">Database Status</p>
                                        <p className="text-xs text-purple-700">MongoDB Connection</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-purple-800 font-medium">Status:</span>
                                    <div className="flex items-center space-x-2">
                                        {health?.mongoStatus === 'connected' ? (
                                            <>
                                                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                                <span className="text-green-700 font-semibold">Connected</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircleIcon className="h-5 w-5 text-red-600" />
                                                <span className="text-red-700 font-semibold">Disconnected</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-emerald-500 p-3 rounded-lg">
                                        <ClockIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-emerald-900">System Uptime</p>
                                        <p className="text-xs text-emerald-700">Time Since Start</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-emerald-700">
                                        {formatUptime(health?.uptime || 0)}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-orange-500 p-3 rounded-lg">
                                        <CodeBracketIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-orange-900">API Version</p>
                                        <p className="text-xs text-orange-700">Current Release</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-orange-700">
                                        v{health?.version || '1.0'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-3"></span>
                                System Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-700">Last Check Time</span>
                                    <span className="text-sm text-gray-900 font-mono">
                                        {formatTimestamp(health?.timestamp)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-700">Server Status</span>
                                    <span className={`text-sm font-semibold ${health?.ok ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {health?.ok ? 'Operational' : 'Down'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <span className="text-sm font-medium text-gray-700">Database Connection</span>
                                    <span className={`text-sm font-semibold ${health?.mongoStatus === 'connected' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {health?.mongoStatus || 'Unknown'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-sm font-medium text-gray-700">Overall Health</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isHealthy
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {health?.status?.toUpperCase() || 'UNKNOWN'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            Auto-refreshes every 30 seconds
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}