import React from 'react';
import { NavLink } from 'react-router-dom';
import { Wallet, LayoutDashboard, ArrowLeftRight, LineChart } from 'lucide-react';
import { WalletConnect } from '../WalletConnect';

export const Navbar = () => {
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/swap', icon: ArrowLeftRight, label: 'Swap' },
    { path: '/markets', icon: LineChart, label: 'Markets' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Wallet className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">DeFi Hub</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map(({ path, icon: Icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
};