import React, { useState } from 'react';
import { TokenData, ChartData } from '../types';
import { ArrowUpDown } from 'lucide-react';
import { TokenChart } from './TokenChart';
import { getTokenPriceHistory } from '../services/api';

interface TokenListProps {
  tokens: TokenData[];
}

export const TokenList: React.FC<TokenListProps> = ({ tokens }) => {
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const handleTokenClick = async (token: TokenData) => {
    try {
      const priceHistory = await getTokenPriceHistory(token.id);
      // Ensure data is serializable by creating a new array with plain objects
      const serializedData = priceHistory.map(point => ({
        time: point.time,
        value: point.value
      }));
      setChartData(serializedData);
      setSelectedToken(token);
    } catch (error) {
      console.error('Error loading price history:', error);
      // Handle error gracefully
      setChartData([]);
    }
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tokens.map((token) => (
              <tr 
                key={token.id} 
                className="hover:bg-gray-50 cursor-pointer" 
                onClick={() => handleTokenClick(token)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src={token.image} alt={token.name} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{token.name}</div>
                      <div className="text-sm text-gray-500">{token.symbol.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${token.current_price.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    token.price_change_percentage_24h >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {token.price_change_percentage_24h >= 0 ? '↑' : '↓'}
                    {Math.abs(token.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${token.total_volume.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${token.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedToken && chartData.length > 0 && (
        <TokenChart 
          token={selectedToken}
          priceData={chartData}
          onClose={() => {
            setSelectedToken(null);
            setChartData([]);
          }}
        />
      )}
    </>
  );
};