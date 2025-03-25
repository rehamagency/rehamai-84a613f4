import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { PlusCircle, LayoutTemplate, BarChart3, Settings, CreditCard } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Glass } from '@/components/ui/Glass';
import { useToast } from '@/hooks/use-toast';

interface Website {
  id: string;
  name: string;
  subdomain: string;
  custom_domain?: string;
  created_at: string;
  published: boolean;
}

const Dashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [websites, setWebsites] = useState<Website[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/auth');
      } else {
        fetchUserWebsites(session.user.id);
      }
      setLoading(false);
    });

    // Setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserWebsites = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWebsites(data || []);
    } catch (error) {
      console.error('Error fetching websites:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your websites. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCreateNewWebsite = () => {
    navigate('/builder/new');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-t-web3-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your Web3 websites and settings</p>
            </div>
            <Button 
              className="button-gradient text-white mt-4 md:mt-0"
              onClick={handleCreateNewWebsite}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Website
            </Button>
          </div>

          <Tabs defaultValue="websites" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="websites" className="px-4 py-2">
                <LayoutTemplate className="mr-2 h-4 w-4" />
                My Websites
              </TabsTrigger>
              <TabsTrigger value="analytics" className="px-4 py-2">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="subscription" className="px-4 py-2">
                <CreditCard className="mr-2 h-4 w-4" />
                Subscription
              </TabsTrigger>
              <TabsTrigger value="settings" className="px-4 py-2">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="websites" className="space-y-6">
              {websites.length === 0 ? (
                <Glass className="p-8 text-center">
                  <h3 className="text-xl font-medium mb-3">No Websites Yet</h3>
                  <p className="text-gray-600 mb-6">Create your first Web3 website to get started</p>
                  <Button 
                    className="button-gradient text-white"
                    onClick={handleCreateNewWebsite}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Website
                  </Button>
                </Glass>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {websites.map((website) => (
                    <Card key={website.id}>
                      <CardHeader>
                        <CardTitle>{website.name}</CardTitle>
                        <CardDescription>
                          {website.published ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Draft
                            </span>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 mb-2">
                          {website.subdomain}.reham.org
                        </p>
                        {website.custom_domain && (
                          <p className="text-sm text-gray-500">
                            {website.custom_domain}
                          </p>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => navigate(`/builder/${website.id}`)}>
                          Edit
                        </Button>
                        <Button onClick={() => navigate(`/website/${website.id}/preview`)}>
                          View
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="analytics">
              <Glass className="p-8 text-center">
                <h3 className="text-xl font-medium mb-3">Analytics Dashboard</h3>
                <p className="text-gray-600 mb-6">Track performance and visitor engagement</p>
                <div className="p-12 border border-dashed border-gray-300 rounded-md text-gray-400">
                  Analytics coming soon
                </div>
              </Glass>
            </TabsContent>
            
            <TabsContent value="subscription">
              <Glass className="p-8">
                <h3 className="text-xl font-medium mb-6">Your Subscription</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 border border-gray-200 rounded-lg bg-white">
                    <h4 className="text-lg font-medium mb-2">Current Plan</h4>
                    <p className="text-3xl font-bold text-gradient mb-4">Free</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">✓</span> 1 Website
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">✓</span> Basic Templates
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">✓</span> Subdomain Only
                      </li>
                    </ul>
                    <Button className="w-full button-gradient text-white">
                      Upgrade to PRO
                    </Button>
                  </div>
                  
                  <div className="p-6 border border-gray-200 rounded-lg bg-white">
                    <h4 className="text-lg font-medium mb-2">PRO Plan</h4>
                    <div className="flex items-end mb-4">
                      <p className="text-3xl font-bold">100</p>
                      <p className="text-xl ml-1 mb-0.5">USDC</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">✓</span> Unlimited Websites
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">✓</span> Premium Templates
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">✓</span> Custom Domain Support
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">✓</span> ENS Domain Integration
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">✓</span> Advanced Analytics
                      </li>
                    </ul>
                  </div>
                </div>
              </Glass>
            </TabsContent>
            
            <TabsContent value="settings">
              <Glass className="p-8">
                <h3 className="text-xl font-medium mb-6">Account Settings</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium mb-4">Connected Wallet</h4>
                    <p className="text-gray-600 mb-2">
                      {session?.user?.id ? (
                        <>
                          <span className="font-mono">{session.user.id.substring(0, 6)}...{session.user.id.substring(session.user.id.length - 4)}</span>
                        </>
                      ) : (
                        'No wallet connected'
                      )}
                    </p>
                    <Button variant="outline" onClick={() => supabase.auth.signOut()}>
                      Disconnect
                    </Button>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-medium mb-4">Notification Preferences</h4>
                    <p className="text-gray-600 mb-4">
                      Configure how and when you receive notifications
                    </p>
                    <div className="p-12 border border-dashed border-gray-300 rounded-md text-gray-400 text-center">
                      Notification settings coming soon
                    </div>
                  </div>
                </div>
              </Glass>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
