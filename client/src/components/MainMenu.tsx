import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineSwitchHorizontal, HiOutlineChartBar } from 'react-icons/hi';

const menuItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <HiOutlineViewGrid className="w-8 h-8 mb-2" />,
    bg: 'bg-indigo-50',
    hover: 'hover:bg-indigo-100',
  },
  {
    label: 'Transactions',
    path: '/transactions',
    icon: <HiOutlineSwitchHorizontal className="w-8 h-8 mb-2" />,
    bg: 'bg-green-50',
    hover: 'hover:bg-green-100',
  },
  {
    label: 'Holdings',
    path: '/holdings',
    icon: <HiOutlineChartBar className="w-8 h-8 mb-2" />,
    bg: 'bg-yellow-50',
    hover: 'hover:bg-yellow-100',
  },
];

const MainMenu: React.FC = () => {
  const location = useLocation();
  return (
    <div className="flex justify-center mt-8 mb-10">
      <div className="flex gap-8">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center w-40 h-40 rounded-2xl shadow-md transition-all duration-200 ${item.bg} ${item.hover} ${
              location.pathname === item.path ? 'ring-4 ring-indigo-300 scale-105' : ''
            }`}
            style={{ textDecoration: 'none' }}
          >
            {item.icon}
            <span className="text-lg font-semibold text-gray-800">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainMenu; 