import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import StatsPage from './pages/StatsPage';
import RedirectHandler from './pages/RedirectHandler';
import HealthCheck from './pages/HealthCheck';
import { useToast } from './hooks/useToast';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

function App() {
    const { toast, showToast } = useToast();

    return (
        <Router>
            <Layout>
                {toast.show && (
                    <div className="fixed top-4 right-4 z-50 animate-slide-in">
                        <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-2xl border ${toast.type === 'success'
                                ? 'bg-white border-green-200'
                                : 'bg-white border-red-200'
                            }`}>
                            {toast.type === 'success' ? (
                                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                            ) : (
                                <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                            )}
                            <span className={`font-medium ${toast.type === 'success' ? 'text-green-900' : 'text-red-900'
                                }`}>
                                {toast.message}
                            </span>
                        </div>
                    </div>
                )}

                <Routes>
                    <Route path="/" element={<Dashboard showToast={showToast} />} />
                    <Route path="/code/:code" element={<StatsPage />} />
                    <Route path="/healthz" element={<HealthCheck />} />
                    <Route path="/:code" element={<RedirectHandler />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;