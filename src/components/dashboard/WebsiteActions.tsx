
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Trash2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteWebsite, duplicateWebsite } from '@/services/templateService';

interface WebsiteActionsProps {
  website: {
    id: string;
    name: string;
    subdomain: string;
    published?: boolean;
  };
  userId: string;
  onDelete: () => void;
  onDuplicate: (website: any) => void;
}

export const WebsiteActions = ({
  website,
  userId,
  onDelete,
  onDuplicate
}: WebsiteActionsProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOpenInBuilder = () => {
    navigate(`/builder/${website.id}`);
  };

  const handlePreviewWebsite = () => {
    navigate(`/website/${website.id}/preview`);
  };

  const handleDeleteWebsite = async () => {
    try {
      setIsDeleting(true);
      await deleteWebsite(website.id);
      toast({
        title: "Website Deleted",
        description: "The website has been successfully deleted",
      });
      onDelete();
    } catch (error) {
      console.error('Error deleting website:', error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteAlert(false);
    }
  };

  const handleDuplicateWebsite = async () => {
    try {
      setIsDuplicating(true);
      const duplicatedWebsite = await duplicateWebsite(website.id, userId);
      toast({
        title: "Website Duplicated",
        description: "A copy of the website has been created",
      });
      onDuplicate(duplicatedWebsite);
    } catch (error) {
      console.error('Error duplicating website:', error);
      toast({
        title: "Duplication Failed",
        description: "There was an error creating a copy of the website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDuplicating(false);
    }
  };

  const handleVisitWebsite = () => {
    const url = `https://${website.subdomain}.reham.org`;
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={handleOpenInBuilder}>
          Edit
        </Button>
        
        {website.published ? (
          <Button onClick={handleVisitWebsite}>
            <Globe className="h-4 w-4 mr-2" />
            Visit
          </Button>
        ) : (
          <Button onClick={handlePreviewWebsite}>
            Preview
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="px-2">
              <span className="sr-only">Open actions menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={handleDuplicateWebsite}
              disabled={isDuplicating}
              className="cursor-pointer"
            >
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setShowDeleteAlert(true)}
              className="text-red-600 cursor-pointer focus:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this website?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the website
              "{website.name}" and all its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteWebsite}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
