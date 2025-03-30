
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Glass } from '@/components/ui/Glass';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SettingsTab = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [disconnecting, setDisconnecting] = useState(false);

  const handleDisconnect = async () => {
    try {
      setDisconnecting(true);
      await signOut();
      toast({
        title: "Wallet disconnected",
        description: "You have been signed out successfully",
      });
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      toast({
        title: "Error",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDisconnecting(false);
    }
  };

  return (
    <Glass className="p-8">
      <h3 className="text-xl font-medium mb-6">Account Settings</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-medium mb-4">Connected Wallet</h4>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {user?.id ? (
              <>
                <span className="font-mono">{user.id.substring(0, 6)}...{user.id.substring(user.id.length - 4)}</span>
              </>
            ) : (
              'No wallet connected'
            )}
          </p>
          <Button 
            variant="outline" 
            onClick={handleDisconnect}
            disabled={disconnecting}
          >
            {disconnecting ? 'Disconnecting...' : 'Disconnect'}
          </Button>
        </div>
        
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-medium mb-4">Notification Preferences</h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Configure how and when you receive notifications
          </p>
          <div className="p-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-md text-gray-400 text-center">
            Notification settings coming soon
          </div>
        </div>
      </div>
    </Glass>
  );
};

export default SettingsTab;
