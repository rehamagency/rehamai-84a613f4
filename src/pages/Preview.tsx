
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Edit, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [website, setWebsite] = useState<any>(null);

  useEffect(() => {
    if (id && id !== 'preview') {
      fetchWebsite(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchWebsite = async (websiteId: string) => {
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('id', websiteId)
        .single();

      if (error) throw error;
      setWebsite(data);
    } catch (error) {
      console.error('Error fetching website:', error);
      toast({
        title: 'Error',
        description: 'Failed to load website preview. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
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
                <Button 
                  size="sm" 
                  className="button-gradient text-white"
                  onClick={() => navigate(`/builder/${id}`)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Website
                </Button>
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
                <div className="flex-grow bg-white rounded-b-lg flex items-center justify-center p-6">
                  {website.template_id ? (
                    <div className="text-center max-w-lg">
                      <h1 className="text-3xl font-bold mb-6">{website.name}</h1>
                      <p className="text-gray-600 mb-6">
                        This is a preview of your website. The content is based on your selected template and settings.
                      </p>
                      <div className="p-12 border border-dashed border-gray-300 rounded-md text-gray-400">
                        Full website preview coming soon
                      </div>
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
