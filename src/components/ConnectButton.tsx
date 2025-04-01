
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
import { useToast } from '@/hooks/use-toast';
import { LoaderIcon } from '@/components/ui/Loader';
import { useAuth } from '@/providers/AuthProvider';

export const ConnectButton = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign out failed",
        description: "There was an issue signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Button className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 bg-gray-100 text-gray-400 font-medium">
        <LoaderIcon size="sm" className="mr-2" />
        Loading...
      </Button>
    );
  }

  if (user) {
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
          <DropdownMenuItem onClick={() => navigate('/templates')}>
            Templates
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/settings')}>
            Settings
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
