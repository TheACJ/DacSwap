import React from 'react';
import { ArrowUpRight, TrendingUp, Wallet, Activity } from 'lucide-react';
import { useAccount } from 'wagmi';

export const Dashboard = () => {
  const { address } = useAccount();

  const stats = [
    { name: 'Total Value Locked', value: '$1.2B', icon: Wallet, change: '+12.5%' },
    { name: '24h Volume', value: '$458.6M', icon: Activity, change: '+8.2%' },
    { name: 'Active Users', value: '125.4K', icon: TrendingUp, change: '+14.1%' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to DeFi Hub</h2>
        {!address ? (
          <p className="text-gray-600">Connect your wallet to get started</p>
        ) : (
          <p className="text-gray-600">Connected: {address}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-blue-500 rounded-md p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {stat.change}
                  <ArrowUpRight className="h-4 w-4" />
                </p>
              </dd>
            </div>
          );
        })}
      </div>
    </div>
  );
};