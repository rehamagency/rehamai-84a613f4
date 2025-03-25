
import { useEffect, useState } from 'react';
import { X, ExternalLink, AlertCircle } from 'lucide-react';
import { Glass } from './ui/Glass';

interface WalletAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletAuth = ({ isOpen, onClose }: WalletAuthProps) => {
  const [mounted, setMounted] = useState(false);

  // Handle animation when opening/closing
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  const wallets = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '/metamask.svg',
      description: 'Connect using Ethereum wallet',
      comingSoon: false
    },
    {
      id: 'phantom',
      name: 'Phantom',
      icon: '/phantom.svg',
      description: 'Connect using Solana wallet',
      comingSoon: false
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '/walletconnect.svg',
      description: 'Connect using mobile wallet',
      comingSoon: false
    },
    {
      id: 'coinbase',
      name: 'Coinbase',
      icon: '/coinbase.svg',
      description: 'Connect using Coinbase wallet',
      comingSoon: true
    }
  ];

  const handleConnect = (walletId: string) => {
    console.log(`Connecting to ${walletId}`);
    // Here you would implement actual wallet connection
    // For demo purposes, we'll just close the modal
    onClose();
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <Glass
        variant="card"
        className={`w-full max-w-md p-6 transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Connect Wallet</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => !wallet.comingSoon && handleConnect(wallet.id)}
              disabled={wallet.comingSoon}
              className={`flex items-center w-full p-4 rounded-xl transition-all duration-200 ${
                wallet.comingSoon 
                  ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                  : 'hover:shadow-md hover:bg-gray-50 hover:border-gray-300'
              } border border-gray-200`}
            >
              <div className="bg-gray-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                <img
                  src={wallet.icon}
                  alt={`${wallet.name} logo`}
                  className="h-6 w-6"
                  onError={(e) => {
                    // Fallback for missing images in demo
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/60x60?text=' + wallet.name[0];
                  }}
                />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{wallet.name}</div>
                <div className="text-sm text-gray-500">{wallet.description}</div>
              </div>
              {wallet.comingSoon ? (
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              ) : (
                <ExternalLink className="h-4 w-4 text-gray-400" />
              )}
            </button>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-start text-sm text-gray-500">
            <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
            <p>
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </Glass>
    </div>
  );
};

export default WalletAuth;
