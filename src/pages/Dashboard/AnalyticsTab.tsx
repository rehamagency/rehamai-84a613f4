
import { Glass } from '@/components/ui/Glass';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

const AnalyticsTab = () => {
  return (
    <Glass className="p-8 text-center">
      <h3 className="text-xl font-medium mb-3">Analytics Dashboard</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Track performance and visitor engagement</p>
      <AnalyticsDashboard />
    </Glass>
  );
};

export default AnalyticsTab;
