
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { Loader } from '@/components/ui/Loader';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Only check auth status when the auth loading state is complete
    if (!loading) {
      if (!user) {
        // Redirect to auth page if no user is found
        navigate('/auth', { replace: true });
      }
      setIsVerifying(false);
    }
  }, [user, loading, navigate]);

  if (loading || isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader size="lg" />
        <p className="mt-4 text-gray-500 dark:text-gray-400">Verifying authentication...</p>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default RequireAuth;
