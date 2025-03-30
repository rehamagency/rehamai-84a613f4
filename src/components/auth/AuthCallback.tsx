
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader } from '@/components/ui/Loader';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        setError(error.message);
        toast({
          title: 'Authentication Error',
          description: error.message,
          variant: 'destructive',
        });
        setTimeout(() => navigate('/auth'), 3000);
        return;
      }
      
      if (data.session) {
        toast({
          title: 'Success',
          description: 'You have been successfully authenticated',
        });
        navigate('/dashboard');
      } else {
        navigate('/auth');
      }
    };
    
    handleAuthCallback();
  }, [navigate, toast]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Authentication Error</h1>
          <p className="text-gray-600">{error}</p>
          <p className="text-gray-500 mt-4">Redirecting you back to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Completing Authentication</h1>
        <Loader size="lg" className="mx-auto" />
        <p className="text-gray-600 mt-4">Please wait while we verify your credentials...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
