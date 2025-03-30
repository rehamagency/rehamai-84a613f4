
import { Glass } from '@/components/ui/Glass';
import { Button } from '@/components/ui/button';

const SubscriptionTab = () => {
  return (
    <Glass className="p-8">
      <h3 className="text-xl font-medium mb-6">Your Subscription</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <h4 className="text-lg font-medium mb-2">Current Plan</h4>
          <p className="text-3xl font-bold text-gradient mb-4">Free</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-2">✓</span> 1 Website
            </li>
            <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-2">✓</span> Basic Templates
            </li>
            <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-2">✓</span> Subdomain Only
            </li>
          </ul>
          <Button className="w-full button-gradient text-white">
            Upgrade to PRO
          </Button>
        </div>
        
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <h4 className="text-lg font-medium mb-2">PRO Plan</h4>
          <div className="flex items-end mb-4">
            <p className="text-3xl font-bold">100</p>
            <p className="text-xl ml-1 mb-0.5">USDC</p>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-2">✓</span> Unlimited Websites
            </li>
            <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-2">✓</span> Premium Templates
            </li>
            <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-2">✓</span> Custom Domain Support
            </li>
            <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-2">✓</span> ENS Domain Integration
            </li>
            <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-2">✓</span> Advanced Analytics
            </li>
          </ul>
        </div>
      </div>
    </Glass>
  );
};

export default SubscriptionTab;
