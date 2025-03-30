
import { useState } from 'react';
import { Check, X, Loader2, Globe, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Glass } from '@/components/ui/Glass';

interface Domain {
  id: string;
  domain: string;
  status: 'pending' | 'active' | 'failed';
  type: 'custom' | 'ens' | 'subdomain';
  defaultDomain?: boolean;
}

interface DomainManagerProps {
  websiteId?: string;
  darkMode?: boolean;
  currentSubdomain?: string;
}

const DomainManager = ({ websiteId, darkMode = true, currentSubdomain = 'yourwebsite' }: DomainManagerProps) => {
  const [newCustomDomain, setNewCustomDomain] = useState('');
  const [newEnsDomain, setNewEnsDomain] = useState('');
  const [verifyingCustom, setVerifyingCustom] = useState(false);
  const [verifyingEns, setVerifyingEns] = useState(false);
  const { toast } = useToast();
  
  // Sample domains for demonstration
  const [domains, setDomains] = useState<Domain[]>([
    {
      id: '1',
      domain: `${currentSubdomain}.reham.org`,
      status: 'active',
      type: 'subdomain',
      defaultDomain: true
    }
  ]);

  const handleAddCustomDomain = async () => {
    if (!newCustomDomain.trim()) return;
    
    // Validate domain format
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;
    if (!domainRegex.test(newCustomDomain)) {
      toast({
        title: "Invalid domain format",
        description: "Please enter a valid domain (e.g., example.com)",
        variant: "destructive",
      });
      return;
    }
    
    setVerifyingCustom(true);
    
    // Simulate API call
    setTimeout(() => {
      const newDomain: Domain = {
        id: `custom-${Date.now()}`,
        domain: newCustomDomain,
        status: 'pending',
        type: 'custom'
      };
      
      setDomains([...domains, newDomain]);
      setNewCustomDomain('');
      setVerifyingCustom(false);
      
      toast({
        title: "Domain added",
        description: "Your domain has been added. Please configure DNS settings to activate it.",
      });
    }, 1500);
  };
  
  const handleAddEnsDomain = async () => {
    if (!newEnsDomain.trim()) return;
    
    // Validate ENS domain format
    if (!newEnsDomain.endsWith('.eth')) {
      toast({
        title: "Invalid ENS domain",
        description: "Please enter a valid ENS domain (e.g., name.eth)",
        variant: "destructive",
      });
      return;
    }
    
    setVerifyingEns(true);
    
    // Simulate API call
    setTimeout(() => {
      const newDomain: Domain = {
        id: `ens-${Date.now()}`,
        domain: newEnsDomain,
        status: 'pending',
        type: 'ens'
      };
      
      setDomains([...domains, newDomain]);
      setNewEnsDomain('');
      setVerifyingEns(false);
      
      toast({
        title: "ENS domain added",
        description: "Your ENS domain has been added. Please verify ownership to activate it.",
      });
    }, 1500);
  };
  
  const handleRemoveDomain = (id: string) => {
    setDomains(domains.filter(domain => domain.id !== id));
    toast({
      title: "Domain removed",
      description: "The domain has been removed from your website.",
    });
  };
  
  const handleSetDefault = (id: string) => {
    setDomains(domains.map(domain => ({
      ...domain,
      defaultDomain: domain.id === id
    })));
    
    toast({
      title: "Default domain updated",
      description: "Your default domain has been updated.",
    });
  };

  const getStatusBadge = (status: Domain['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <Check className="h-3 w-3 mr-1" /> Active
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" /> Pending
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            <X className="h-3 w-3 mr-1" /> Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Domain Management</h2>
      
      <Glass className="p-6" variant={darkMode ? 'dark' : 'default'}>
        <h3 className="text-lg font-medium mb-4">Your Domains</h3>
        
        <div className="space-y-4">
          {domains.map((domain) => (
            <Card key={domain.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Globe className={`h-4 w-4 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <CardTitle className="text-base">{domain.domain}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(domain.status)}
                    {domain.defaultDomain && (
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        Default
                      </span>
                    )}
                  </div>
                </div>
                <CardDescription className={darkMode ? 'text-gray-400' : ''}>
                  {domain.type === 'subdomain' ? 'Reham Subdomain' : domain.type === 'ens' ? 'ENS Domain' : 'Custom Domain'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {domain.status === 'pending' && domain.type === 'custom' && (
                  <Alert className={`mb-4 ${darkMode ? 'bg-yellow-900/20 text-yellow-200 border-yellow-900' : ''}`}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>DNS Configuration Required</AlertTitle>
                    <AlertDescription>
                      Add the following DNS records to your domain provider:
                      <div className={`mt-2 p-2 rounded text-xs font-mono ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                        Type: CNAME, Host: @, Value: reham-websites.vercel.app
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
                
                {domain.status === 'pending' && domain.type === 'ens' && (
                  <Alert className={`mb-4 ${darkMode ? 'bg-yellow-900/20 text-yellow-200 border-yellow-900' : ''}`}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>ENS Verification Required</AlertTitle>
                    <AlertDescription>
                      Set the Content Hash record of your ENS domain to verify ownership.
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    {!domain.defaultDomain && domain.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleSetDefault(domain.id)}
                        className={darkMode ? 'border-gray-700 hover:bg-gray-700' : ''}
                      >
                        Set as Default
                      </Button>
                    )}
                    {domain.status === 'active' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={darkMode ? 'border-gray-700 hover:bg-gray-700' : ''}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Visit
                      </Button>
                    )}
                  </div>
                  
                  {domain.type !== 'subdomain' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleRemoveDomain(domain.id)}
                      className={`text-red-500 ${darkMode ? 'border-gray-700 hover:bg-gray-700' : ''}`}
                    >
                      <X className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Glass>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Glass className="p-6" variant={darkMode ? 'dark' : 'default'}>
          <h3 className="text-lg font-medium mb-4">Add Custom Domain</h3>
          <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Connect your own domain to your website
          </p>
          
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="example.com"
              value={newCustomDomain}
              onChange={(e) => setNewCustomDomain(e.target.value)}
              className={darkMode ? 'bg-gray-800 border-gray-700' : ''}
            />
            <Button 
              onClick={handleAddCustomDomain} 
              disabled={verifyingCustom || !newCustomDomain.trim()}
            >
              {verifyingCustom ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : 'Add'}
            </Button>
          </div>
        </Glass>
        
        <Glass className="p-6" variant={darkMode ? 'dark' : 'default'}>
          <h3 className="text-lg font-medium mb-4">Add ENS Domain</h3>
          <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Connect your ENS domain to your website
          </p>
          
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="yourname.eth"
              value={newEnsDomain}
              onChange={(e) => setNewEnsDomain(e.target.value)}
              className={darkMode ? 'bg-gray-800 border-gray-700' : ''}
            />
            <Button 
              onClick={handleAddEnsDomain} 
              disabled={verifyingEns || !newEnsDomain.trim()}
            >
              {verifyingEns ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : 'Add'}
            </Button>
          </div>
        </Glass>
      </div>
    </div>
  );
};

export default DomainManager;
