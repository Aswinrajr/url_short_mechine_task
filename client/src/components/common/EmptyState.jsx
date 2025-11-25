import { LinkIcon } from '@heroicons/react/24/outline';

export default function EmptyState({ title, description, icon: Icon = LinkIcon }) {
    return (
        <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6">
                <Icon className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 max-w-sm mx-auto">{description}</p>
        </div>
    );
}