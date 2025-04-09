
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { LoaderIcon } from '@/components/ui/Loader';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Only check auth status when the auth loading state is complete
    if (!loading) {
      if (!user) {
        // Redirect to auth page if no user is found, preserving the intended destination
        navigate('/auth', { 
          replace: true,
          state: { from: location.pathname } 
        });
      }
      setIsVerifying(false);
    }
  }, [user, loading, navigate, location]);

  // Show a loading indicator while we're verifying auth status
  if (loading || isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
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
