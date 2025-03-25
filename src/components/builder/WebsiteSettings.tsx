
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

type WebsiteSettingsProps = {
  website: {
    name: string;
    subdomain: string;
    custom_domain?: string | null;
    ens_domain?: string | null;
    settings?: any;
  };
  onChange: (updates: any) => void;
  onCheckSubdomain?: (subdomain: string) => Promise<boolean>;
};

export const WebsiteSettings = ({ 
  website, 
  onChange, 
  onCheckSubdomain 
}: WebsiteSettingsProps) => {
  const [isCheckingSubdomain, setIsCheckingSubdomain] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ 
      ...website, 
      [name]: value,
      // Auto-generate subdomain from name if subdomain field is empty
      ...(name === 'name' && !website.subdomain ? {
        subdomain: value.toLowerCase().replace(/[^a-z0-9]/g, '-')
      } : {})
    });

    // Reset subdomain availability state when subdomain changes
    if (name === 'subdomain') {
      setSubdomainAvailable(null);
    }
  };

  const checkSubdomainAvailability = async () => {
    if (!onCheckSubdomain || !website.subdomain) return;
    
    setIsCheckingSubdomain(true);
    try {
      const isAvailable = await onCheckSubdomain(website.subdomain);
      setSubdomainAvailable(isAvailable);
    } catch (error) {
      console.error("Error checking subdomain:", error);
      setSubdomainAvailable(null);
    } finally {
      setIsCheckingSubdomain(false);
    }
  };

  const handleSettingsChange = (key: string, value: any) => {
    onChange({
      ...website,
      settings: {
        ...(website.settings || {}),
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Website Name</Label>
          <Input
            id="name"
            name="name"
            value={website.name}
            onChange={handleInputChange}
            placeholder="My Crypto Project"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="subdomain">Subdomain</Label>
          <div className="flex mt-1">
            <div className="relative flex-grow">
              <Input
                id="subdomain"
                name="subdomain"
                value={website.subdomain}
                onChange={handleInputChange}
                placeholder="my-project"
                className="rounded-r-none pr-10"
              />
              {subdomainAvailable !== null && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {subdomainAvailable ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            <div className="bg-gray-100 px-3 py-2 border border-l-0 border-input rounded-r-md text-sm text-gray-500 flex items-center">
              .reham.org
            </div>
            {onCheckSubdomain && (
              <Button 
                type="button"
                variant="outline"
                size="sm"
                onClick={checkSubdomainAvailability}
                disabled={isCheckingSubdomain || !website.subdomain}
                className="ml-2"
              >
                {isCheckingSubdomain ? "Checking..." : "Check"}
              </Button>
            )}
          </div>
          {subdomainAvailable === false && (
            <p className="text-sm text-red-500 mt-1">
              This subdomain is already taken.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <Label>Theme Color</Label>
            <div className="mt-2 flex space-x-3">
              {['#3B82F6', '#10B981', '#6366F1', '#EC4899', '#F59E0B'].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    website.settings?.themeColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : 'border border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleSettingsChange('themeColor', color)}
                  type="button"
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="font">Font</Label>
            <select 
              id="font"
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2"
              value={website.settings?.font || 'Inter'}
              onChange={(e) => handleSettingsChange('font', e.target.value)}
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Open Sans">Open Sans</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="darkMode" 
              checked={website.settings?.darkMode || false}
              onCheckedChange={(checked) => handleSettingsChange('darkMode', checked)}
            />
            <Label htmlFor="darkMode" className="cursor-pointer">Enable Dark Mode</Label>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-4">Domain Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="custom_domain">Custom Domain</Label>
            <Input
              id="custom_domain"
              name="custom_domain"
              value={website.custom_domain || ''}
              onChange={handleInputChange}
              placeholder="mydomain.com"
              className="mt-1"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Available on PRO plan</p>
          </div>
          <div>
            <Label htmlFor="ens_domain">ENS Domain</Label>
            <Input
              id="ens_domain"
              name="ens_domain"
              value={website.ens_domain || ''}
              onChange={handleInputChange}
              placeholder="myproject.eth"
              className="mt-1"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Available on PRO plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};
