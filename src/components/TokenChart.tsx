import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { TokenData, ChartData } from '../types';

interface TokenChartProps {
  token: TokenData;
  priceData: ChartData[];
  onClose: () => void;
}

export const TokenChart: React.FC<TokenChartProps> = ({ token, priceData, onClose }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartContainerRef.current && priceData.length > 0) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: '#ffffff' },
          textColor: '#333',
        },
        grid: {
          vertLines: { color: '#f0f0f0' },
          horzLines: { color: '#f0f0f0' },
        },
        width: chartContainerRef.current.clientWidth,
        height: 400,
      });

      const lineSeries = chart.addLineSeries({
        color: '#2563eb',
        lineWidth: 2,
      });
      
      lineSeries.setData(priceData);
      chart.timeScale().fitContent();
      chartRef.current = chart;

      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [priceData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img src={token.image} alt={token.name} className="w-8 h-8 mr-2" />
            <h2 className="text-2xl font-bold">{token.name} Price Chart</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${token.current_price.toLocaleString()}
          </span>
          <span className={`ml-2 ${
            token.price_change_percentage_24h >= 0 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {token.price_change_percentage_24h >= 0 ? '↑' : '↓'}
            {Math.abs(token.price_change_percentage_24h).toFixed(2)}%
          </span>
        </div>
        <div ref={chartContainerRef} />
      </div>
    </div>
  );
};