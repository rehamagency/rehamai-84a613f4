
import { useState } from 'react';
import { Wallet } from 'lucide-react';
import WalletAuth from './WalletAuth';

export const ConnectButton = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowWalletModal(true)}
        className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 button-gradient text-white font-medium transition-all duration-300 hover:shadow-lg"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </button>

      <WalletAuth 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />
    </>
  );
};
