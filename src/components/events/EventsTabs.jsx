import { NavLink } from 'react-router-dom';

export default function EventsTabs() {
    const tabs = [
        { label: 'Overview', to: 'overview', end: true },
        { label: 'Prizes', to: 'prizes' },
        { label: 'Participants', to: 'participants' },
    ];

    const baseClasses = 'px-6 py-2 rounded-full transition-colors';
    const activeClasses = 'bg-purple-500 text-white';
    const inactiveClasses = 'text-gray-300 hover:bg-neutral-800';
    return (
        <div className="flex justify-start bg-black px-20">
            <div className="bg-neutral-900 rounded-full p-1 mt-4 flex gap-2">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.label}
                        to={tab.to}
                        end={tab.end}
                        className={({ isActive }) =>
                            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                        }>
                        {tab.label}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
