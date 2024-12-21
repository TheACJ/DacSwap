import React, { useState } from 'react';
import { TokenData } from '../types';
import { ArrowDownUp } from 'lucide-react';

interface SwapInterfaceProps {
  tokens: TokenData[];
  onSwap: (fromToken: TokenData, toToken: TokenData, amount: string) => void;
}

export const SwapInterface: React.FC<SwapInterfaceProps> = ({ tokens, onSwap }) => {
  const [fromToken, setFromToken] = useState<TokenData | null>(null);
  const [toToken, setToToken] = useState<TokenData | null>(null);
  const [amount, setAmount] = useState('');

  const handleSwap = () => {
    if (fromToken && toToken && amount) {
      onSwap(fromToken, toToken, amount);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6">Swap Tokens</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">From</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md"
            value={fromToken?.id || ''}
            onChange={(e) => setFromToken(tokens.find(t => t.id === e.target.value) || null)}
          >
            <option value="">Select token</option>
            {tokens.map(token => (
              <option key={token.id} value={token.id}>
                {token.name} ({token.symbol.toUpperCase()})
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button
          className="mx-auto block p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={() => {
            const temp = fromToken;
            setFromToken(toToken);
            setToToken(temp);
          }}
        >
          <ArrowDownUp className="h-6 w-6" />
        </button>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">To</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-md"
            value={toToken?.id || ''}
            onChange={(e) => setToToken(tokens.find(t => t.id === e.target.value) || null)}
          >
            <option value="">Select token</option>
            {tokens.map(token => (
              <option key={token.id} value={token.id}>
                {token.name} ({token.symbol.toUpperCase()})
              </option>
            ))}
          </select>
          {fromToken && toToken && amount && (
            <div className="text-sm text-gray-500">
              Estimated output: {(Number(amount) * (toToken.current_price / fromToken.current_price)).toFixed(6)} {toToken.symbol.toUpperCase()}
            </div>
          )}
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          onClick={handleSwap}
          disabled={!fromToken || !toToken || !amount}
        >
          Swap
        </button>
      </div>
    </div>
  );
};