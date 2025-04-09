
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Glass } from '@/components/ui/Glass';
import { Button } from '@/components/ui/button';
import { WebsiteActions } from '@/components/dashboard/WebsiteActions';

interface Website {
  id: string;
  name: string;
  subdomain: string;
  custom_domain?: string;
  created_at: string;
  published: boolean;
}

interface WebsitesListProps {
  websites: Website[];
  userId: string;
  onWebsitesChange: (websites: Website[]) => void;
}

export const WebsitesList = ({ websites, userId, onWebsitesChange }: WebsitesListProps) => {
  const navigate = useNavigate();

  const handleDeleteWebsite = (websiteId: string) => {
    const updatedWebsites = websites.filter(website => website.id !== websiteId);
    onWebsitesChange(updatedWebsites);
  };

  const handleDuplicateWebsite = (newWebsite: Website) => {
    const updatedWebsites = [...websites, newWebsite];
    onWebsitesChange(updatedWebsites);
  };

  const handleCreateNewWebsite = () => {
    navigate('/builder/new');
  };

  if (websites.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {websites.map((website) => (
        <Card key={website.id} className="overflow-hidden flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="truncate">{website.name}</CardTitle>
            <CardDescription className="flex items-center">
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
          <CardContent className="pb-4 flex-grow">
            <div className="h-32 mb-4 bg-gray-100 rounded-md overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                {website.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <p className="text-sm text-gray-500 truncate mb-1">
              {website.subdomain}.reham.org
            </p>
            {website.custom_domain && (
              <p className="text-sm text-gray-500 truncate">
                {website.custom_domain}
              </p>
            )}
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <WebsiteActions 
              website={website}
              userId={userId}
              onDelete={() => handleDeleteWebsite(website.id)}
              onDuplicate={handleDuplicateWebsite}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
