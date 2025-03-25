
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, User, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import WalletAuth from './WalletAuth';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ConnectButton = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <Button className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 bg-gray-100 text-gray-400 font-medium">
        <div className="w-4 h-4 border-2 border-t-gray-500 rounded-full animate-spin mr-2"></div>
        Loading...
      </Button>
    );
  }

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 button-gradient text-white font-medium transition-all duration-300 hover:shadow-lg">
            <User className="mr-2 h-4 w-4" />
            Account
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/dashboard')}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/builder/new')}>
            Create Website
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/referral')}>
            Referral Program
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowWalletModal(true)}
        className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 button-gradient text-white font-medium transition-all duration-300 hover:shadow-lg"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>

      <WalletAuth 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />
    </>
  );
};
