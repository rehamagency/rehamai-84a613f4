
import { useState } from 'react';
import { Check, Copy, Globe, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { publishWebsite } from '@/services/templateService';

interface WebsitePublishProps {
  websiteId: string;
  isPublished: boolean;
  subdomain: string;
  onPublishStatusChange: (published: boolean) => void;
}

export const WebsitePublish = ({
  websiteId,
  isPublished,
  subdomain,
  onPublishStatusChange
}: WebsitePublishProps) => {
  const [publishing, setPublishing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handlePublishChange = async (isPublishing: boolean) => {
    try {
      setPublishing(true);
      await publishWebsite(websiteId, isPublishing);
      onPublishStatusChange(isPublishing);
      
      toast({
        title: isPublishing ? "Website Published!" : "Website Unpublished",
        description: isPublishing 
          ? "Your website is now live and accessible to the public"
          : "Your website is now offline",
      });
    } catch (error) {
      console.error('Error publishing website:', error);
      toast({
        title: "Publish Failed",
        description: "There was an error publishing your website. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPublishing(false);
    }
  };

  const copyToClipboard = () => {
    const url = `https://${subdomain}.reham.org`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={isPublished ? "default" : "outline"}>
          <Globe className="h-4 w-4 mr-2" />
          {isPublished ? "Published" : "Publish"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Publish Website</DialogTitle>
          <DialogDescription>
            Make your website live and accessible to everyone
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Switch 
                id="publish-switch" 
                checked={isPublished} 
                onCheckedChange={handlePublishChange}
                disabled={publishing}
              />
              <Label htmlFor="publish-switch">
                {isPublished ? "Published" : "Unpublished"}
              </Label>
            </div>
            {publishing && (
              <div className="w-5 h-5 border-2 border-t-web3-blue rounded-full animate-spin"></div>
            )}
          </div>
          
          {isPublished && (
            <>
              <div className="mb-6">
                <Label htmlFor="website-url">Your Website URL</Label>
                <div className="flex mt-1.5">
                  <Input 
                    id="website-url"
                    readOnly
                    value={`https://${subdomain}.reham.org`}
                    className="rounded-r-none"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-l-none"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="bg-blue-50 text-blue-800 p-3 rounded-md flex">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm">
                  Your website is now live! Share your URL with others to view your site.
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
