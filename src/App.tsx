import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { SwapInterface } from './components/SwapInterface';
import { TokenList } from './components/TokenList';

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: 'YOUR_PROJECT_ID', // Get this from WalletConnect
      },
    }),
  ],
  publicClient,
});

function App() {
  return (
    <WagmiConfig config={config}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="swap" element={<SwapInterface tokens={[]} onSwap={() => {}} />} />
            <Route path="markets" element={<TokenList tokens={[]} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WagmiConfig>
  );
}

export default App;