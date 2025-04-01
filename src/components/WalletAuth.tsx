
import { useEffect, useState } from 'react';
import { X, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { Glass } from './ui/Glass';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { LoaderIcon } from '@/components/ui/Loader';

interface WalletAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletAuth = ({ isOpen, onClose }: WalletAuthProps) => {
  const [mounted, setMounted] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [currentWallet, setCurrentWallet] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleConnect = async (walletId: string) => {
    try {
      setConnecting(true);
      setCurrentWallet(walletId);
      console.log(`Connecting to ${walletId}`);
      
      // For demo purposes, we'll use password auth instead of OTP since email OTP is disabled
      // In a real implementation, this would connect to the actual wallet
      
      // Generate a pseudo-random password for demo purposes
      const demoEmail = `demo-${walletId}@reham.org`;
      const demoPassword = `Demo${Math.random().toString(36).substring(2, 10)}!`;
      
      // Check if user exists first
      const { data: userExists, error: checkError } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword,
      });
      
      // If user doesn't exist, create one
      if (checkError && checkError.message.includes('Invalid login credentials')) {
        const { data, error } = await supabase.auth.signUp({
          email: demoEmail,
          password: demoPassword,
          options: {
            data: {
              wallet_type: walletId,
              wallet_address: `0x${Math.random().toString(36).substring(2, 38)}`,
            }
          }
        });
        
        if (error) throw error;
        
        // After creating user, sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: demoEmail,
          password: demoPassword,
        });
        
        if (signInError) throw signInError;
      }
      
      toast({
        title: "Success",
        description: `Connected with ${walletId}!`,
      });
      
      // Close modal and redirect to dashboard
      setTimeout(() => {
        onClose();
        navigate('/dashboard');
      }, 1000);
      
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive"
      });
      setCurrentWallet(null);
    } finally {
      setTimeout(() => {
        setConnecting(false);
      }, 1000);
    }
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
            disabled={connecting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => !wallet.comingSoon && !connecting && handleConnect(wallet.id)}
              disabled={wallet.comingSoon || connecting}
              className={`flex items-center w-full p-4 rounded-xl transition-all duration-200 ${
                wallet.comingSoon 
                  ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                  : connecting && currentWallet === wallet.id
                    ? 'bg-gray-50 border-blue-200 shadow-sm'
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
              ) : connecting && currentWallet === wallet.id ? (
                connecting ? (
                  <div className="flex items-center">
                    <LoaderIcon size="sm" className="text-blue-500" />
                    <span className="ml-2 text-sm text-blue-600">Connecting...</span>
                  </div>
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )
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
