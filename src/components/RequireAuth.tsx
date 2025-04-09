
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { LoaderIcon } from '@/components/ui/Loader';
import { useToast } from '@/hooks/use-toast';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Only check auth status when the auth loading state is complete
    if (!loading) {
      if (!user) {
        // Redirect to auth page if no user is found, preserving the intended destination
        console.log("No authenticated user found, redirecting to auth page");
        navigate('/auth', { 
          replace: true,
          state: { from: location.pathname } 
        });

        // Show toast notification for better UX
        toast({
          title: "Authentication Required",
          description: "Please log in to access this page",
          variant: "default",
        });
      }
      setIsVerifying(false);
    }
  }, [user, loading, navigate, location, toast]);

  // Show a loading indicator while we're verifying auth status
  if (loading || isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <LoaderIcon 
          size="lg" 
          className="text-web3-blue" 
          text="Verifying authentication..." 
        />
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default RequireAuth;
