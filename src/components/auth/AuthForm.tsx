
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Wallet, Mail, Loader2, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthFormProps {
  onWalletAuth: () => void;
}

const AuthForm = ({ onWalletAuth }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailAuthDisabled, setEmailAuthDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get the intended destination from location state
  const from = location.state?.from || '/dashboard';

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        if (error.message.includes("Email logins are disabled")) {
          setEmailAuthDisabled(true);
          throw new Error("Email authentication is currently disabled. Please use wallet authentication.");
        }
        throw error;
      }
      
      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "You've been successfully signed in",
        });
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast({
        title: "Error signing in",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        if (error.message.includes("Signups not allowed") || error.message.includes("disabled")) {
          setEmailAuthDisabled(true);
          throw new Error("Email signup is currently disabled. Please use wallet authentication.");
        }
        throw error;
      }
      
      if (data.user) {
        if (data.user.identities?.length === 0) {
          toast({
            title: "User already exists",
            description: "Please use the sign in option instead",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registration successful",
            description: "Account created successfully! You can now sign in.",
          });
          // Auto sign in after registration for better UX
          navigate(from, { replace: true });
        }
      }
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        title: "Error signing up",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Authentication</CardTitle>
        <CardDescription>Sign in to continue to your dashboard</CardDescription>
      </CardHeader>
      <Tabs defaultValue="wallet" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 mx-4">
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="email" disabled={emailAuthDisabled}>Email</TabsTrigger>
        </TabsList>
        
        <TabsContent value="wallet" className="p-0">
          <CardContent className="space-y-4 py-4">
            <div className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect with your Web3 wallet to authenticate instantly
              </p>
              
              <Alert className="bg-amber-50 border-amber-200">
                <Info className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-800">
                  Wallet authentication is the recommended method for this application.
                </AlertDescription>
              </Alert>
              
              <Button 
                className="w-full button-gradient text-white"
                onClick={onWalletAuth}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="email" className="p-0">
          <CardContent className="space-y-4 py-4">
            {emailAuthDisabled ? (
              <Alert className="bg-red-50 border-red-200">
                <Info className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-800">
                  Email authentication is currently disabled. Please use wallet authentication instead.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-blue-500 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </>
            )}
          </CardContent>
          {!emailAuthDisabled && (
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full"
                onClick={handleEmailSignIn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleEmailSignUp}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </CardFooter>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
