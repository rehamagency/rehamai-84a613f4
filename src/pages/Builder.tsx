
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Save, PlayCircle, Settings, Layout, 
  PlusCircle, Image, Type, Palette, ChevronRight, Globe, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TemplateSelector } from '@/components/builder/TemplateSelector';
import { WebsiteSettings } from '@/components/builder/WebsiteSettings';
import { SectionControl } from '@/components/builder/SectionControl';
import { WebsitePreview } from '@/components/builder/WebsitePreview';
import { 
  fetchTemplates, 
  fetchContentBlocks, 
  checkSubdomainAvailability, 
  saveWebsite, 
  fetchWebsite, 
  fetchWebsiteContent, 
  saveWebsiteContent 
} from '@/services/templateService';
import type { Template, ContentBlock } from '@/services/templateService';

// Available section types
const defaultSections = [
  { id: 'header', type: 'header', name: 'Header' },
  { id: 'hero', type: 'hero', name: 'Hero' },
  { id: 'features', type: 'features', name: 'Features' },
  { id: 'pricing', type: 'pricing', name: 'Price Ticker' },
  { id: 'about', type: 'about', name: 'About' },
  { id: 'roadmap', type: 'roadmap', name: 'Roadmap' },
  { id: 'contact', type: 'contact', name: 'Contact' },
  { id: 'footer', type: 'footer', name: 'Footer' }
];

const Builder = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('design');
  const [website, setWebsite] = useState({
    name: '',
    subdomain: '',
    template_id: null as string | null,
    settings: {}
  });
  const [templates, setTemplates] = useState<Template[]>([]);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [availableSections, setAvailableSections] = useState(defaultSections);

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/auth');
      } else {
        if (!isNew && id) {
          loadWebsite(id);
        }
        loadTemplates();
        loadContentBlocks();
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

  const loadWebsite = async (websiteId: string) => {
    try {
      setLoading(true);
      
      // Fetch website data
      const websiteData = await fetchWebsite(websiteId);
      if (websiteData) {
        setWebsite(websiteData);
        
        // Fetch website content
        const content = await fetchWebsiteContent(websiteId);
        if (content && content.length > 0) {
          // Transform content to our section format
          const loadedSections = content.map((item: any) => ({
            id: `section-${item.id}`,
            type: item.content_type,
            name: defaultSections.find(s => s.type === item.content_type)?.name || item.content_type,
            content: item.content
          }));
          setSections(loadedSections);
        }
      }
    } catch (error) {
      console.error('Error loading website:', error);
      toast({
        title: 'Error',
        description: 'Failed to load website. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadTemplates = async () => {
    try {
      const data = await fetchTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
      toast({
        title: 'Error',
        description: 'Failed to load templates. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const loadContentBlocks = async () => {
    try {
      const data = await fetchContentBlocks();
      setContentBlocks(data);
      
      // Update available sections based on content blocks
      if (data.length > 0) {
        const blocksAsSections = data.map(block => ({
          id: block.id,
          type: block.type,
          name: block.name
        }));
        setAvailableSections([...defaultSections, ...blocksAsSections]);
      }
    } catch (error) {
      console.error('Error loading content blocks:', error);
    }
  };

  const handleSave = async () => {
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
      // Save the website data
      const savedWebsite = await saveWebsite(website, session.user.id, isNew);
      
      if (savedWebsite) {
        // If it's a new website, navigate to the edit page
        if (isNew) {
          navigate(`/builder/${savedWebsite.id}`);
        }
        
        // Save the website content (sections)
        await saveWebsiteContent(savedWebsite.id, sections);
        
        toast({
          title: 'Success',
          description: isNew ? 'Website created successfully!' : 'Website updated successfully!',
        });
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

  const handleWebsiteChange = (updatedWebsite: any) => {
    setWebsite(updatedWebsite);
  };

  const handleTemplateSelect = (templateId: string) => {
    setWebsite({
      ...website,
      template_id: templateId
    });
    
    // If we have no sections yet, add default sections based on the template
    if (sections.length === 0) {
      const defaultTemplateSections = [
        {
          id: `section-${Date.now()}-1`,
          type: 'header',
          name: 'Header',
          content: {}
        },
        {
          id: `section-${Date.now()}-2`,
          type: 'hero',
          name: 'Hero',
          content: {}
        },
        {
          id: `section-${Date.now()}-3`,
          type: 'features',
          name: 'Features',
          content: {}
        },
        {
          id: `section-${Date.now()}-4`,
          type: 'footer',
          name: 'Footer',
          content: {}
        }
      ];
      setSections(defaultTemplateSections);
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
                value={website.name}
                onChange={(e) => setWebsite({ ...website, name: e.target.value })}
                placeholder="Website Name"
                className="border-none shadow-none text-lg font-medium focus-visible:ring-0 p-0 max-w-[200px]"
              />
              {!isNew && website.subdomain && (
                <div className="hidden md:flex items-center text-sm text-gray-500">
                  <Globe className="h-3 w-3 mr-1" />
                  {website.subdomain}.reham.org
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {!isNew && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate(`/website/${id}/preview`)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              )}
              <Button 
                size="sm" 
                className="button-gradient text-white"
                onClick={handleSave}
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
      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Left Panel - Controls */}
        <div className="w-full lg:w-1/3 xl:w-1/4 border-r border-gray-200 bg-white p-4 overflow-y-auto">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="design" className="w-1/3">Design</TabsTrigger>
              <TabsTrigger value="sections" className="w-1/3">Sections</TabsTrigger>
              <TabsTrigger value="settings" className="w-1/3">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="design">
              <h3 className="text-lg font-medium mb-4">Choose a Template</h3>
              <TemplateSelector 
                templates={templates} 
                selectedTemplate={website.template_id}
                onSelectTemplate={handleTemplateSelect}
              />
            </TabsContent>
            
            <TabsContent value="sections">
              <SectionControl 
                sections={sections}
                onSectionsChange={setSections}
                availableSections={availableSections}
              />
            </TabsContent>
            
            <TabsContent value="settings">
              <WebsiteSettings 
                website={website}
                onChange={handleWebsiteChange}
                onCheckSubdomain={checkSubdomainAvailability}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Panel - Preview */}
        <div className="flex-grow p-4 bg-gray-50 overflow-y-auto">
          {isNew && activeTab === 'design' && !website.template_id ? (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-6">Select a Template to Start</h2>
              <p className="text-gray-600 mb-4">
                Choose a template from the left panel to start building your website. 
                You can customize it later.
              </p>
              
              <div className="mt-8 flex justify-end">
                <Button 
                  className="button-gradient text-white"
                  onClick={handleSave}
                  disabled={!website.name || !website.subdomain || saving}
                >
                  Create Website
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full">
              <WebsitePreview websiteData={{
                ...website,
                sections: sections
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Builder;
