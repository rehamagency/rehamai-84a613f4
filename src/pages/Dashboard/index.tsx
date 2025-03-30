
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { PlusCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader } from '@/components/ui/Loader';
import { useAuth } from '@/providers/AuthProvider';
import WebsitesList from './WebsitesList';
import AnalyticsTab from './AnalyticsTab';
import SubscriptionTab from './SubscriptionTab';
import SettingsTab from './SettingsTab';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [websites, setWebsites] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserWebsites(user.id);
    }
  }, [user]);

  const fetchUserWebsites = async (userId: string) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewWebsite = () => {
    navigate('/builder/new');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your Web3 websites and settings</p>
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
              <TabsTrigger value="websites">My Websites</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="websites">
              <WebsitesList 
                websites={websites} 
                loading={loading}
                onCreateNew={handleCreateNewWebsite}
              />
            </TabsContent>
            
            <TabsContent value="analytics">
              <AnalyticsTab />
            </TabsContent>
            
            <TabsContent value="subscription">
              <SubscriptionTab />
            </TabsContent>
            
            <TabsContent value="settings">
              <SettingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
