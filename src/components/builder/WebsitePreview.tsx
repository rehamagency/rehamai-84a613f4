
import { useState, useEffect } from 'react';
import { Loader2, Smartphone, Tablet, Monitor, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type WebsitePreviewProps = {
  websiteData: {
    name: string;
    subdomain: string;
    template_id: string | null;
    sections?: any[];
    settings?: any;
  };
};

export const WebsitePreview = ({ websiteData }: WebsitePreviewProps) => {
  const [loading, setLoading] = useState(true);
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Simulate loading the preview
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [websiteData.template_id]);

  // When template changes, reset loading state
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [websiteData.template_id]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const getDeviceClass = () => {
    switch (deviceType) {
      case 'mobile':
        return 'max-w-[375px] h-[667px] mx-auto';
      case 'tablet':
        return 'max-w-[768px] h-[1024px] mx-auto';
      default:
        return 'w-full';
    }
  };

  const getDeviceFrame = () => {
    switch (deviceType) {
      case 'mobile':
        return 'rounded-[24px] border-8 border-gray-700 shadow-lg';
      case 'tablet':
        return 'rounded-[16px] border-[12px] border-gray-700 shadow-lg';
      default:
        return 'rounded-lg border border-gray-200';
    }
  };

  const renderPreviewContent = () => {
    if (!websiteData.template_id) {
      return (
        <div className="text-center">
          <h3 className="text-xl font-medium mb-3">No Template Selected</h3>
          <p className="text-gray-400 mb-6">
            Please select a template to see a preview of your website.
          </p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-400">Loading preview...</p>
        </div>
      );
    }

    return (
      <div className={`text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <h1 className="text-3xl font-bold mb-6">{websiteData.name || 'Your Website'}</h1>
        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          This is a preview of how your website will look.
          The final result will be based on the template and sections you select.
        </p>
        
        {websiteData.sections && websiteData.sections.length > 0 ? (
          <div className="space-y-4">
            {websiteData.sections.map((section, index) => (
              <div 
                key={index} 
                className={`p-4 border border-dashed rounded-md ${
                  darkMode 
                    ? 'border-gray-600 bg-gray-800/50' 
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                  {section.name} Section
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className={`p-8 border border-dashed rounded-md ${
            darkMode 
              ? 'border-gray-600 text-gray-500' 
              : 'border-gray-300 text-gray-400'
          }`}>
            Add sections to see them in the preview
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`rounded-lg shadow-sm h-full overflow-hidden flex flex-col ${
      darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className={`border-b px-4 py-2 flex items-center justify-between ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        
        <div className="flex-grow">
          <div className={`w-full max-w-md mx-auto text-xs text-center py-1 px-4 rounded-full ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-600'
          }`}>
            {websiteData.subdomain ? `${websiteData.subdomain}.reham.org` : 'your-site.reham.org'}
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRefresh} 
          className={darkMode ? 'text-gray-300' : ''}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className={`flex items-center justify-between px-4 py-2 ${
        darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-gray-50 border-b border-gray-200'
      }`}>
        <Tabs defaultValue={deviceType} onValueChange={(value) => setDeviceType(value as any)}>
          <TabsList className={darkMode ? 'bg-gray-700' : ''}>
            <TabsTrigger value="desktop">
              <Monitor className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Desktop</span>
            </TabsTrigger>
            <TabsTrigger value="tablet">
              <Tablet className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Tablet</span>
            </TabsTrigger>
            <TabsTrigger value="mobile">
              <Smartphone className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Mobile</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setDarkMode(!darkMode)}
          className={darkMode ? 'border-gray-700 text-gray-300' : ''}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
      
      <div className={`flex-grow overflow-auto p-4 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={`${getDeviceClass()} ${getDeviceFrame()} overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="h-full overflow-auto p-6">
            {renderPreviewContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
