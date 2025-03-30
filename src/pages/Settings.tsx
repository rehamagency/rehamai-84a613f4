
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Settings as SettingsIcon, CreditCard, Bell, Globe, Shield, Wallet } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import DarkModeToggle from '@/components/DarkModeToggle';
import { useToast } from '@/hooks/use-toast';
import { Glass } from '@/components/ui/Glass';

const Settings = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    notifications: {
      email: true,
      marketing: false,
      updates: true
    }
  });
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    return () => {
      document.body.classList.remove('dark');
    };
  }, [darkMode]);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/auth');
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

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-t-web3-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      
      <div className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage your account preferences and website settings
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex mb-8">
            <TabsList className="mx-auto">
              <TabsTrigger value="profile" className="px-4 py-2">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="account" className="px-4 py-2">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="billing" className="px-4 py-2">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="notifications" className="px-4 py-2">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="domains" className="px-4 py-2">
                <Globe className="mr-2 h-4 w-4" />
                Domains
              </TabsTrigger>
              <TabsTrigger value="security" className="px-4 py-2">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="profile">
            <Glass className="p-8 max-w-3xl mx-auto" variant={darkMode ? 'dark' : 'default'}>
              <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={profile.name} 
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className={`mt-1 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profile.email} 
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className={`mt-1 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="wallet">Connected Wallet</Label>
                  <div className="flex items-center mt-1 p-3 rounded-md bg-gray-800 border border-gray-700">
                    <Wallet className="h-5 w-5 mr-3 text-gray-400" />
                    <span className="font-mono text-sm">
                      {session?.user?.id ? (
                        <>
                          {session.user.id.substring(0, 10)}...{session.user.id.substring(session.user.id.length - 6)}
                        </>
                      ) : (
                        'No wallet connected'
                      )}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSaveProfile} className="button-gradient text-white">
                    Save Changes
                  </Button>
                </div>
              </div>
            </Glass>
          </TabsContent>
          
          <TabsContent value="account">
            <Glass className="p-8 max-w-3xl mx-auto" variant={darkMode ? 'dark' : 'default'}>
              <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Toggle between light and dark themes
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DarkModeToggle variant="toggle" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                  <div className="space-y-0.5">
                    <Label className="text-base">Time Zone</Label>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Your current time zone setting
                    </p>
                  </div>
                  <div>
                    <select 
                      className={`rounded-md p-2 ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <option>UTC-08:00 (Pacific Time)</option>
                      <option>UTC-05:00 (Eastern Time)</option>
                      <option>UTC+00:00 (GMT)</option>
                      <option>UTC+01:00 (Central European Time)</option>
                      <option>UTC+08:00 (Singapore/Hong Kong)</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                  <div className="space-y-0.5">
                    <Label className="text-base">Language</Label>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Site language preference
                    </p>
                  </div>
                  <div>
                    <select 
                      className={`rounded-md p-2 ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={() => supabase.auth.signOut()} variant="destructive">
                    Sign Out
                  </Button>
                </div>
              </div>
            </Glass>
          </TabsContent>
          
          <TabsContent value="billing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Glass className="p-8" variant={darkMode ? 'dark' : 'default'}>
                <h2 className="text-2xl font-semibold mb-6">Current Plan</h2>
                <Card className={`border ${darkMode ? 'border-gray-700 bg-gray-800' : ''}`}>
                  <CardHeader>
                    <CardTitle>Free Plan</CardTitle>
                    <CardDescription className={darkMode ? 'text-gray-400' : ''}>
                      Your current subscription
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold mb-4">
                      $0 <span className="text-sm font-normal text-gray-500">/month</span>
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>1 website</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Basic templates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Community support</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✗</span>
                        <span className="text-gray-500">Custom domain</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✗</span>
                        <span className="text-gray-500">Premium templates</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-6 button-gradient text-white">
                      Upgrade Plan
                    </Button>
                  </CardContent>
                </Card>
              </Glass>
              
              <Glass className="p-8" variant={darkMode ? 'dark' : 'default'}>
                <h2 className="text-2xl font-semibold mb-6">Payment Methods</h2>
                <div className="flex flex-col space-y-4">
                  <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200'}`}>
                    <p className="text-gray-500 text-center p-6">No payment methods added</p>
                    <Button className="w-full">Add Payment Method</Button>
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Billing History</h3>
                    <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200'}`}>
                      <p className="text-gray-500 text-center">No billing history available</p>
                    </div>
                  </div>
                </div>
              </Glass>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Glass className="p-8 max-w-3xl mx-auto" variant={darkMode ? 'dark' : 'default'}>
              <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Receive updates about your websites and account
                    </p>
                  </div>
                  <Switch 
                    checked={profile.notifications.email} 
                    onCheckedChange={(checked) => 
                      setProfile({
                        ...profile, 
                        notifications: {
                          ...profile.notifications,
                          email: checked
                        }
                      })}
                  />
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketing Emails</Label>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Receive information about new features and offers
                    </p>
                  </div>
                  <Switch 
                    checked={profile.notifications.marketing} 
                    onCheckedChange={(checked) => 
                      setProfile({
                        ...profile, 
                        notifications: {
                          ...profile.notifications,
                          marketing: checked
                        }
                      })}
                  />
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                  <div className="space-y-0.5">
                    <Label className="text-base">Product Updates</Label>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Receive notifications about new features and updates
                    </p>
                  </div>
                  <Switch 
                    checked={profile.notifications.updates} 
                    onCheckedChange={(checked) => 
                      setProfile({
                        ...profile, 
                        notifications: {
                          ...profile.notifications,
                          updates: checked
                        }
                      })}
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleSaveProfile} className="button-gradient text-white">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Glass>
          </TabsContent>
          
          <TabsContent value="domains">
            <Glass className="p-8 max-w-3xl mx-auto" variant={darkMode ? 'dark' : 'default'}>
              <h2 className="text-2xl font-semibold mb-6">Domain Management</h2>
              <div className="space-y-6">
                <div className="border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Default Subdomain</h3>
                  <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your website is accessible via this subdomain
                  </p>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value="yourwebsite"
                      disabled
                      className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}
                    />
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      .reham.org
                    </span>
                  </div>
                </div>
                
                <div className="border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Custom Domain</h3>
                  <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Connect your custom domain to your website
                  </p>
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="example.com"
                      className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}
                    />
                    <Button>Connect</Button>
                  </div>
                  <p className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Custom domains are available on Pro and higher plans
                  </p>
                </div>
                
                <div className="border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">ENS Domain</h3>
                  <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Connect your Ethereum Name Service domain
                  </p>
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="yourname.eth"
                      className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}
                    />
                    <Button>Verify</Button>
                  </div>
                  <p className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    ENS domains are available on Pro and higher plans
                  </p>
                </div>
              </div>
            </Glass>
          </TabsContent>
          
          <TabsContent value="security">
            <Glass className="p-8 max-w-3xl mx-auto" variant={darkMode ? 'dark' : 'default'}>
              <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                  <div className="space-y-0.5">
                    <Label className="text-base">Session Management</Label>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Manage your active sessions
                    </p>
                  </div>
                  <Button variant="outline">View Sessions</Button>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                  <div className="space-y-0.5">
                    <Label className="text-base">Password</Label>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Update your password
                    </p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
                
                <div className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
                  <div className="border border-red-600 rounded-lg p-4">
                    <h4 className="text-red-500 font-medium mb-2">Delete Account</h4>
                    <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Permanently delete your account and all associated data
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </div>
            </Glass>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
