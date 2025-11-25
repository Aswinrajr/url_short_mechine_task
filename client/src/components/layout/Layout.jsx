import Header from './Header';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 py-8 sm:px-0">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}