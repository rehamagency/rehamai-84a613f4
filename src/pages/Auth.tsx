
import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { DiscordIcon } from '@/components/ui/custom-icons';
import { ArrowRight, Mail, Github, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Glass } from '@/components/ui/Glass';
import WalletAuth from '@/components/WalletAuth';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    // Setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!email.trim()) {
        throw new Error('Please enter your email address');
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: window.location.origin + '/dashboard',
        },
      });

      if (error) throw error;

      setMessage({
        type: 'success',
        text: 'Check your email for the login link!',
      });

      toast({
        title: "Magic link sent",
        description: "Check your email for the login link!",
      });
    } catch (error: any) {
      console.error('Auth error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'An error occurred during the sign in process.',
      });

      toast({
        title: "Authentication error",
        description: error.message || 'An error occurred during the sign in process.',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-lg font-bold text-gradient">
          reham.org
        </Link>
      </div>

      <Glass variant="card" className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Sign In / Register</h1>
          <p className="text-gray-600">Access your Web3 website dashboard</p>
        </div>

        <div className="space-y-4 mb-8">
          <button
            onClick={() => setShowWalletModal(true)}
            className="w-full button-gradient text-white font-medium rounded-lg px-4 py-3 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 7H5C3.89543 7 3 7.89543 3 9V15C3 16.1046 3.89543 17 5 17H19C20.1046 17 21 16.1046 21 15V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 14C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12C15.4477 12 15 12.4477 15 13C15 13.5523 15.4477 14 16 14Z" fill="currentColor"/>
            </svg>
            Connect Wallet
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full button-gradient text-white"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Sign in with Email
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 flex items-start ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{message.text}</p>
          </div>
        )}

        <div className="text-center text-sm text-gray-500 mt-4">
          <p>
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-web3-blue hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-web3-blue hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </Glass>

      <WalletAuth 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />
    </div>
  );
};

export default Auth;
