import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { WalletIcon } from 'lucide-react';

export const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
    >
      <WalletIcon className="h-4 w-4 mr-2" />
      Connect Wallet
    </button>
  );
};