
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Glass } from '@/components/ui/Glass';
import { Loader } from '@/components/ui/Loader';

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
  loading: boolean;
  onCreateNew: () => void;
}

const WebsitesList = ({ websites, loading, onCreateNew }: WebsitesListProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="py-12 flex justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (websites.length === 0) {
    return (
      <Glass className="p-8 text-center">
        <h3 className="text-xl font-medium mb-3">No Websites Yet</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Create your first Web3 website to get started</p>
        <Button 
          className="button-gradient text-white"
          onClick={onCreateNew}
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
        <Card key={website.id} className="border dark:border-gray-700">
          <CardHeader>
            <CardTitle>{website.name}</CardTitle>
            <CardDescription>
              {website.published ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  Published
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  Draft
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {website.subdomain}.reham.org
            </p>
            {website.custom_domain && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
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
  );
};

export default WebsitesList;
