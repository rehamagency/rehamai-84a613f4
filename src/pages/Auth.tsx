
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Wallet, ArrowRight, ChevronRight } from 'lucide-react';
import { Glass } from '@/components/ui/Glass';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import WalletAuth from '@/components/WalletAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Auth = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) {
        navigate('/dashboard');
      }
    });

    // Setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-t-web3-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  const benefits = [
    'Create stunning Web3 sites in minutes',
    'Multi-chain Ethereum & Solana support',
    'Custom domains & ENS integration',
    'Premium AI-powered templates',
    'Live website analytics',
    'Token analytics & price tickers',
    'Referral program with blockchain rewards'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  Connect Your Web3 <span className="text-gradient">Wallet</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Securely access your account with decentralized authentication. No email or password required.
                </p>
                <Button 
                  className="button-gradient w-full md:w-auto text-white"
                  onClick={() => setShowWalletModal(true)}
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect Wallet
                </Button>
              </div>
              
              <div>
                <Glass className="p-6 md:p-8 h-full" variant="card">
                  <h3 className="text-xl font-semibold mb-6">Why Connect Your Wallet?</h3>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-web3-blue shrink-0 mt-0.5" />
                        <span className="ml-2">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-500 text-sm">
                      Your wallet is only used for authentication. We never have access to your funds or private keys.
                    </p>
                  </div>
                </Glass>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <WalletAuth 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />
    </div>
  );
};

export default Auth;
