
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Edit, Globe, Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { fetchWebsite, fetchWebsiteContent, fetchTemplate } from '@/services/templateService';

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [website, setWebsite] = useState<any>(null);
  const [content, setContent] = useState<any[]>([]);
  const [template, setTemplate] = useState<any>(null);

  useEffect(() => {
    if (id && id !== 'preview') {
      loadWebsiteData(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const loadWebsiteData = async (websiteId: string) => {
    try {
      setLoading(true);
      // Load website details
      const websiteData = await fetchWebsite(websiteId);
      if (websiteData) {
        setWebsite(websiteData);
        
        // Load website content
        const websiteContent = await fetchWebsiteContent(websiteId);
        setContent(websiteContent || []);
        
        // If website has a template, load template details
        if (websiteData.template_id) {
          const templateData = await fetchTemplate(websiteData.template_id);
          setTemplate(templateData);
        }
      }
    } catch (error) {
      console.error('Error loading website:', error);
      toast({
        title: 'Error',
        description: 'Failed to load website preview. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderSectionPreview = (section: any, index: number) => {
    const sectionTypes: Record<string, React.ReactNode> = {
      header: (
        <div className="bg-gray-100 p-6 rounded-md mb-4">
          <p className="text-center text-gray-600">Header Section</p>
          <div className="flex justify-between items-center mt-2">
            <div className="font-bold">{website?.name || 'Website Name'}</div>
            <div className="flex gap-2">
              <div className="bg-gray-200 w-12 h-4 rounded"></div>
              <div className="bg-gray-200 w-12 h-4 rounded"></div>
              <div className="bg-gray-200 w-12 h-4 rounded"></div>
            </div>
          </div>
        </div>
      ),
      hero: (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-md mb-4">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {website?.name || 'Welcome to Our Website'}
          </h1>
          <p className="text-center mb-6">
            This is a hero section placeholder. Your actual content will appear here.
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-white bg-opacity-20 w-24 h-10 rounded flex items-center justify-center">
              Button 1
            </div>
            <div className="bg-white bg-opacity-20 w-24 h-10 rounded flex items-center justify-center">
              Button 2
            </div>
          </div>
        </div>
      ),
      features: (
        <div className="bg-white p-6 rounded-md mb-4">
          <h2 className="text-xl font-bold mb-4 text-center">Features</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded">
              <div className="w-10 h-10 bg-blue-100 rounded-full mb-2"></div>
              <h3 className="font-medium">Feature 1</h3>
              <p className="text-gray-500 text-sm">Description here</p>
            </div>
            <div className="p-4 border border-gray-200 rounded">
              <div className="w-10 h-10 bg-green-100 rounded-full mb-2"></div>
              <h3 className="font-medium">Feature 2</h3>
              <p className="text-gray-500 text-sm">Description here</p>
            </div>
            <div className="p-4 border border-gray-200 rounded">
              <div className="w-10 h-10 bg-purple-100 rounded-full mb-2"></div>
              <h3 className="font-medium">Feature 3</h3>
              <p className="text-gray-500 text-sm">Description here</p>
            </div>
          </div>
        </div>
      ),
      pricing: (
        <div className="bg-gray-50 p-6 rounded-md mb-4">
          <h2 className="text-xl font-bold mb-4 text-center">Pricing</h2>
          <div className="flex justify-center gap-4">
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm w-48">
              <h3 className="font-bold mb-2">Basic</h3>
              <div className="text-2xl font-bold mb-4">$19</div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
              <div className="h-8 bg-blue-100 rounded"></div>
            </div>
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm w-48">
              <h3 className="font-bold mb-2">Pro</h3>
              <div className="text-2xl font-bold mb-4">$49</div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
              <div className="h-8 bg-blue-500 rounded"></div>
            </div>
          </div>
        </div>
      ),
      about: (
        <div className="bg-white p-6 rounded-md mb-4">
          <h2 className="text-xl font-bold mb-4 text-center">About Us</h2>
          <div className="flex gap-6">
            <div className="w-1/3 bg-gray-100 rounded-md h-40"></div>
            <div className="w-2/3">
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      ),
      roadmap: (
        <div className="bg-gray-50 p-6 rounded-md mb-4">
          <h2 className="text-xl font-bold mb-4 text-center">Roadmap</h2>
          <div className="flex justify-between">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 mx-auto mb-2"></div>
              <div className="font-medium">Phase 1</div>
              <div className="text-sm text-gray-500">Q1 2023</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mx-auto mb-2"></div>
              <div className="font-medium">Phase 2</div>
              <div className="text-sm text-gray-500">Q2 2023</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mx-auto mb-2"></div>
              <div className="font-medium">Phase 3</div>
              <div className="text-sm text-gray-500">Q3 2023</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mx-auto mb-2"></div>
              <div className="font-medium">Phase 4</div>
              <div className="text-sm text-gray-500">Q4 2023</div>
            </div>
          </div>
        </div>
      ),
      contact: (
        <div className="bg-white p-6 rounded-md mb-4">
          <h2 className="text-xl font-bold mb-4 text-center">Contact Us</h2>
          <div className="space-y-4">
            <div className="h-10 bg-gray-100 rounded w-full"></div>
            <div className="h-10 bg-gray-100 rounded w-full"></div>
            <div className="h-32 bg-gray-100 rounded w-full"></div>
            <div className="h-10 bg-blue-500 rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      ),
      footer: (
        <div className="bg-gray-800 text-white p-6 rounded-md">
          <div className="flex justify-between items-center">
            <div className="font-bold">{website?.name || 'Website Name'}</div>
            <div className="flex gap-4">
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-400 mt-4">
            © 2023 {website?.name || 'Website Name'}. All rights reserved.
          </div>
        </div>
      )
    };

    return (
      <div key={index}>
        {sectionTypes[section.content_type] || (
          <div className="bg-gray-100 p-6 rounded-md mb-4 text-center">
            <p className="text-gray-600">{section.content_type} Section</p>
          </div>
        )}
      </div>
    );
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
      {/* Preview Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(id && id !== 'preview' ? `/builder/${id}` : '/dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Editor
              </Button>
              {website && (
                <>
                  <div className="hidden md:block border-l border-gray-300 h-6"></div>
                  <div className="hidden md:flex items-center">
                    <Globe className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      {website.subdomain}.reham.org
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {website && (
                <>
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="hidden sm:flex"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="hidden sm:flex"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button 
                    size="sm" 
                    className="button-gradient text-white"
                    onClick={() => navigate(`/builder/${id}`)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Preview Frame */}
      <div className="flex-grow bg-gray-100">
        {website ? (
          <div className="h-full flex flex-col">
            <div className="flex-grow relative">
              <div className="absolute inset-0 p-4 flex flex-col">
                <div className="bg-gray-200 rounded-t-lg flex items-center px-4 py-2 space-x-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-grow">
                    <div className="w-full max-w-md mx-auto bg-white text-gray-600 text-xs text-center py-1 px-4 rounded-full">
                      {website.subdomain}.reham.org
                    </div>
                  </div>
                </div>
                <div className="flex-grow bg-white rounded-b-lg overflow-auto">
                  <div className="p-6">
                    {website.template_id ? (
                      <div className="max-w-4xl mx-auto">
                        {content && content.length > 0 ? (
                          <div className="space-y-1">
                            {content.map((section, index) => renderSectionPreview(section, index))}
                          </div>
                        ) : (
                          <div className="text-center max-w-lg mx-auto">
                            <h1 className="text-3xl font-bold mb-6">{website.name}</h1>
                            <p className="text-gray-600 mb-6">
                              This is a preview of your website. No content sections have been added yet.
                            </p>
                            <div className="p-12 border border-dashed border-gray-300 rounded-md text-gray-400">
                              Add sections in the builder to see them here
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center">
                        <h3 className="text-xl font-medium mb-3">No Template Selected</h3>
                        <p className="text-gray-600 mb-6">
                          Please select a template to see a preview of your website.
                        </p>
                        <Button 
                          onClick={() => navigate(`/builder/${id}`)}
                          className="button-gradient text-white"
                        >
                          Select Template
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <h2 className="text-2xl font-bold mb-4">No Preview Available</h2>
              <p className="text-gray-600 mb-6">
                Create a website first to see a preview.
              </p>
              <Button 
                onClick={() => navigate('/builder/new')}
                className="button-gradient text-white"
              >
                Create Website
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
