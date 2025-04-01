
import { useState } from 'react';
import { Glass } from '@/components/ui/Glass';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Share2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

const AnalyticsTab = () => {
  const [exportLoading, setExportLoading] = useState(false);
  
  const handleExportData = () => {
    setExportLoading(true);
    
    // Simulate export process
    setTimeout(() => {
      setExportLoading(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Track performance and engagement metrics</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <div className="p-3">
                <h3 className="font-medium">Select Date Range</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose a preset or custom range</p>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button variant="ghost" size="sm" className="justify-start">Last 7 days</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Last 30 days</Button>
                  <Button variant="ghost" size="sm" className="justify-start">This month</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Last month</Button>
                  <Button variant="ghost" size="sm" className="justify-start">This quarter</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Custom range</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" size="sm" onClick={handleExportData} disabled={exportLoading} className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            {exportLoading ? 'Exporting...' : 'Export Data'}
          </Button>
          
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
      
      <Glass className="p-6">
        <AnalyticsDashboard />
      </Glass>
    </div>
  );
};

export default AnalyticsTab;
