export default function LoadingSpinner({ size = 'medium', text = '' }) {
    const sizeClasses = {
        small: 'h-8 w-8',
        medium: 'h-16 w-16',
        large: 'h-24 w-24'
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
                <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-200`}></div>
                <div className={`${sizeClasses[size]} rounded-full border-4 border-blue-600 border-t-transparent absolute inset-0 animate-spin`}></div>
            </div>
            {text && <p className="mt-6 text-gray-600 font-medium animate-pulse">{text}</p>}
        </div>
    );
}