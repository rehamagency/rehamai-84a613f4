
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import WalletAuth from '@/components/WalletAuth';
import AuthForm from '@/components/auth/AuthForm';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/providers/AuthProvider';
import { Loader } from '@/components/ui/Loader';

const Auth = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get the intended destination from location state
  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    // If user is already logged in, redirect to intended destination
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const handleWalletAuth = () => {
    setShowWalletModal(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Loader size="lg" color="white" />
        <p className="mt-4 text-gray-300">Checking authentication status...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Reham Web3</h1>
            <p className="text-gray-300">The easiest way to build and deploy Web3 websites</p>
          </div>
          
          <AuthForm onWalletAuth={handleWalletAuth} />
          
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>

      <WalletAuth 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />
    </div>
  );
};

export default Auth;
