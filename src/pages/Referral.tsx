
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { 
  Share2, Copy, Gift, Wallet, Users, ArrowRight, Check
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Glass } from '@/components/ui/Glass';
import { useToast } from '@/hooks/use-toast';

const Referral = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState([]);
  const [copied, setCopied] = useState(false);
  
  // Generate a dummy referral link
  const referralLink = session?.user ? 
    `https://reham.org/ref/${session.user.id.substring(0, 8)}` : 
    'https://reham.org/ref/demo';

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchReferrals(session.user.id);
      }
      setLoading(false);
    });

    // Setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchReferrals(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchReferrals = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReferrals(data || []);
    } catch (error) {
      console.error('Error fetching referrals:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      toast({
        title: 'Referral Link Copied',
        description: 'Your referral link has been copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-t-web3-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  const referralSteps = [
    {
      icon: <Share2 className="h-6 w-6 text-web3-blue" />,
      title: 'Share Your Link',
      description: 'Send your unique referral link to friends and the crypto community.'
    },
    {
      icon: <Gift className="h-6 w-6 text-web3-pink" />,
      title: 'Friends Sign Up',
      description: 'When they sign up using your link, they get 10% off their first purchase.'
    },
    {
      icon: <Wallet className="h-6 w-6 text-web3-green" />,
      title: 'Earn Rewards',
      description: 'Receive 10% SOL commission for each referred subscription purchase.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Web3 <span className="text-gradient">Referral Program</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Earn SOL rewards by referring friends and community members to our platform. Blockchain-powered referral tracking ensures transparency.
              </p>
            </div>

            <Glass className="mb-12" variant="card">
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-6">Your Referral Link</h2>
                <div className="flex flex-col md:flex-row gap-3">
                  <Input
                    value={referralLink}
                    readOnly
                    className="flex-grow font-mono text-sm bg-gray-50"
                  />
                  <Button 
                    onClick={copyToClipboard}
                    className={copied ? "bg-green-500 hover:bg-green-600" : "button-gradient"}
                  >
                    {copied ? (
                      <><Check className="mr-2 h-4 w-4" /> Copied</>
                    ) : (
                      <><Copy className="mr-2 h-4 w-4" /> Copy Link</>
                    )}
                  </Button>
                </div>
                {!session && (
                  <p className="mt-4 text-amber-600 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Connect your wallet to get your personal referral link
                  </p>
                )}
              </div>
            </Glass>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {referralSteps.map((step, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="mb-2">{step.icon}</div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {session ? (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Your Referrals</h2>
                {referrals.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Commission
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {referrals.map((referral: any) => (
                          <tr key={referral.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {referral.referred_id.substring(0, 6)}...{referral.referred_id.substring(referral.referred_id.length - 4)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {new Date(referral.created_at).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                referral.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : referral.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {referral.commission_amount} {referral.commission_currency}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center p-12 border border-dashed border-gray-300 rounded-md bg-white">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No referrals yet</h3>
                    <p className="text-gray-500 mb-6">
                      Share your referral link to start earning rewards
                    </p>
                    <Button onClick={copyToClipboard}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Referral Link
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-12 mb-12 border border-dashed border-gray-300 rounded-md bg-white">
                <h3 className="text-lg font-medium mb-2">Connect Wallet to See Your Referrals</h3>
                <p className="text-gray-500 mb-6">
                  You need to connect your wallet to access your referral dashboard
                </p>
                <Button 
                  className="button-gradient text-white"
                  onClick={() => navigate('/auth')}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Ready to Start Earning?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join our referral program and start earning crypto rewards for every friend who signs up through your link.
              </p>
              {!session ? (
                <Button 
                  className="button-gradient text-white text-lg py-6 px-10"
                  onClick={() => navigate('/auth')}
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect Wallet to Get Started
                </Button>
              ) : (
                <Button onClick={copyToClipboard} className="text-lg py-6 px-10">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Your Referral Link
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Referral;
