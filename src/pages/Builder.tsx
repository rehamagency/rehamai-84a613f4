
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Save, PlayCircle, Settings, Layout, 
  PlusCircle, Image, Type, Palette, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Glass } from '@/components/ui/Glass';

const Builder = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [website, setWebsite] = useState({
    name: '',
    subdomain: '',
    template_id: null as string | null,
    settings: {}
  });
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/auth');
      } else {
        if (!isNew && id) {
          fetchWebsite(id);
        }
        fetchTemplates();
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
  }, [id, isNew, navigate]);

  const fetchWebsite = async (websiteId: string) => {
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('id', websiteId)
        .single();

      if (error) throw error;
      if (data) setWebsite(data);
    } catch (error) {
      console.error('Error fetching website:', error);
      toast({
        title: 'Error',
        description: 'Failed to load website. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setTemplates(data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWebsite(prev => ({ 
      ...prev, 
      [name]: value,
      // Auto-generate subdomain from name if subdomain field is empty
      ...(name === 'name' && !prev.subdomain ? {
        subdomain: value.toLowerCase().replace(/[^a-z0-9]/g, '-')
      } : {})
    }));
  };

  const saveWebsite = async () => {
    if (!website.name || !website.subdomain) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a name and subdomain for your website.',
        variant: 'destructive',
      });
      return;
    }

    if (!session?.user?.id) {
      toast({
        title: 'Authentication Error',
        description: 'Please log in to save your website.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const websiteData = {
        ...website,
        user_id: session.user.id,
        published: false
      };

      let response;
      if (isNew) {
        // Create new website
        response = await supabase
          .from('websites')
          .insert(websiteData)
          .select()
          .single();
      } else {
        // Update existing website
        response = await supabase
          .from('websites')
          .update(websiteData)
          .eq('id', id)
          .select()
          .single();
      }

      if (response.error) throw response.error;

      toast({
        title: 'Success',
        description: isNew ? 'Website created successfully!' : 'Website updated successfully!',
      });

      if (isNew && response.data) {
        navigate(`/builder/${response.data.id}`);
      }
    } catch (error: any) {
      console.error('Error saving website:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save website. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
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
      {/* Builder Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="hidden md:block border-l border-gray-300 h-6"></div>
              <Input
                name="name"
                value={website.name}
                onChange={handleInputChange}
                placeholder="Website Name"
                className="border-none shadow-none text-lg font-medium focus-visible:ring-0 p-0 max-w-[200px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(`/website/${id || 'preview'}/preview`)}
                disabled={isNew}
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                size="sm" 
                className="button-gradient text-white"
                onClick={saveWebsite}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Builder Area */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-white p-4 hidden md:block">
          <Tabs defaultValue="blocks">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="blocks" className="w-1/2">Blocks</TabsTrigger>
              <TabsTrigger value="settings" className="w-1/2">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="blocks">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Layout className="h-4 w-4 mr-2" />
                  Header
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Image className="h-4 w-4 mr-2" />
                  Hero
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Type className="h-4 w-4 mr-2" />
                  Features
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Layout className="h-4 w-4 mr-2" />
                  Price Ticker
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Palette className="h-4 w-4 mr-2" />
                  About
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Layout className="h-4 w-4 mr-2" />
                  Roadmap
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Layout className="h-4 w-4 mr-2" />
                  Footer
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="general">
                  <AccordionTrigger>General Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Website Name</label>
                        <Input
                          name="name"
                          value={website.name}
                          onChange={handleInputChange}
                          placeholder="My Crypto Project"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Subdomain</label>
                        <div className="flex items-center mt-1">
                          <Input
                            name="subdomain"
                            value={website.subdomain}
                            onChange={handleInputChange}
                            placeholder="my-project"
                            className="rounded-r-none"
                          />
                          <div className="bg-gray-100 px-3 py-2 border border-l-0 border-input rounded-r-md text-sm text-gray-500">
                            .reham.org
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="appearance">
                  <AccordionTrigger>Appearance</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Theme Color</label>
                        <div className="mt-1 flex space-x-2">
                          {['#3B82F6', '#10B981', '#6366F1', '#EC4899', '#F59E0B'].map((color) => (
                            <button
                              key={color}
                              className="w-6 h-6 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Font</label>
                        <select className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option>Inter</option>
                          <option>Roboto</option>
                          <option>Montserrat</option>
                          <option>Open Sans</option>
                        </select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="domain">
                  <AccordionTrigger>Domain Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Custom Domain</label>
                        <Input
                          placeholder="mydomain.com"
                          className="mt-1"
                          disabled
                        />
                        <p className="text-xs text-gray-500 mt-1">Available on PRO plan</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">ENS Domain</label>
                        <Input
                          placeholder="myproject.eth"
                          className="mt-1"
                          disabled
                        />
                        <p className="text-xs text-gray-500 mt-1">Available on PRO plan</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Content Area */}
        <div className="flex-grow p-4 bg-gray-50 overflow-y-auto">
          {isNew ? (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-6">Choose a Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.length > 0 ? (
                  templates.map((template: any) => (
                    <Glass 
                      key={template.id} 
                      className="p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      variant="card"
                      onClick={() => setWebsite(prev => ({ ...prev, template_id: template.id }))}
                    >
                      <div className="relative">
                        <img 
                          src={template.thumbnail_url || 'https://via.placeholder.com/500x300?text=Template+Preview'} 
                          alt={template.name}
                          className="w-full h-48 object-cover"
                        />
                        {website.template_id === template.id && (
                          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                            <div className="bg-white rounded-full p-2">
                              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                        {template.is_premium && (
                          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            PRO
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                      </div>
                    </Glass>
                  ))
                ) : (
                  <div className="col-span-2 text-center p-12 border border-dashed border-gray-300 rounded-md">
                    <p className="text-gray-500">Loading templates...</p>
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button 
                  className="button-gradient text-white"
                  onClick={saveWebsite}
                  disabled={!website.name || !website.subdomain || saving}
                >
                  Create Website
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-3">Website Editor</h3>
                <p className="text-gray-600 mb-6">Drag and drop blocks to build your website</p>
                <div className="p-12 border border-dashed border-gray-300 rounded-md text-gray-400">
                  Website editor coming soon
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Builder;
