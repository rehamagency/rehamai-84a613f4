
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

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

  const renderPreviewContent = () => {
    if (!websiteData.template_id) {
      return (
        <div className="text-center">
          <h3 className="text-xl font-medium mb-3">No Template Selected</h3>
          <p className="text-gray-600 mb-6">
            Please select a template to see a preview of your website.
          </p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading preview...</p>
        </div>
      );
    }

    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">{websiteData.name || 'Your Website'}</h1>
        <p className="text-gray-600 mb-6">
          This is a preview of how your website will look.
          The final result will be based on the template and sections you select.
        </p>
        
        {websiteData.sections && websiteData.sections.length > 0 ? (
          <div className="space-y-4">
            {websiteData.sections.map((section, index) => (
              <div key={index} className="p-4 border border-dashed border-gray-300 rounded-md">
                <p className="text-gray-500">{section.name} Section</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 border border-dashed border-gray-300 rounded-md text-gray-400">
            Add sections to see them in the preview
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full overflow-hidden flex flex-col">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-grow">
          <div className="w-full max-w-md mx-auto bg-white text-gray-600 text-xs text-center py-1 px-4 rounded-full">
            {websiteData.subdomain ? `${websiteData.subdomain}.reham.org` : 'your-site.reham.org'}
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-6">
        {renderPreviewContent()}
      </div>
    </div>
  );
};
