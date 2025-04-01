
import { useState, useEffect } from 'react';
import { Glass } from '@/components/ui/Glass';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import { Button } from '@/components/ui/button';
import { 
  Calendar, Download, Share2, Filter, RefreshCw, 
  BarChart3, LineChart, PieChart, User, Globe, Clock 
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoaderIcon } from '@/components/ui/Loader';
import { useToast } from '@/hooks/use-toast';

const AnalyticsTab = () => {
  const [exportLoading, setExportLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState("overview");
  const { toast } = useToast();
  
  const handleExportData = () => {
    setExportLoading(true);
    
    // Simulate export process
    setTimeout(() => {
      setExportLoading(false);
      toast({
        title: "Export completed",
        description: "Analytics data has been exported successfully",
      });
    }, 1500);
  };
  
  const handleRefreshData = () => {
    setRefreshing(true);
    
    // Simulate refresh process
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Data refreshed",
        description: "Analytics data has been updated",
      });
    }, 1200);
  };
  
  // Simulated analytics data
  const analyticsData = {
    visitors: { 
      total: 12458, 
      change: 8.3,
      data: [340, 390, 410, 395, 480, 520, 550]
    },
    pageviews: { 
      total: 38254, 
      change: 12.5,
      data: [1200, 1300, 1400, 1350, 1500, 1600, 1700]
    },
    bounceRate: { 
      total: 42.8, 
      change: -3.2,
      data: [45, 44, 43, 44, 43, 42, 42]
    },
    avgSessionTime: { 
      total: 3.2, 
      change: 5.4,
      data: [2.8, 2.9, 3.0, 3.1, 3.2, 3.2, 3.2]
    }
  };
  
  // Top pages data
  const topPages = [
    { path: "/", views: 15230, bounce: 38 },
    { path: "/templates", views: 8460, bounce: 42 },
    { path: "/pricing", views: 6245, bounce: 45 },
    { path: "/about", views: 4120, bounce: 36 },
    { path: "/referral", views: 2890, bounce: 50 },
  ];
  
  return (
    <div className="space-y-6">
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
            <PopoverContent className="p-0 w-auto" align="end">
              <div className="p-3">
                <h3 className="font-medium">Select Date Range</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose a preset or custom range</p>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button variant="ghost" size="sm" className="justify-start">Last 7 days</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Last 30 days</Button>
                  <Button variant="ghost" size="sm" className="justify-start">This month</Button>
                  <Button variant="ghost" size="sm" className="justify-start">Last month</Button>
                  <Button variant="ghost" size="sm" className="justify-start">This quarter</Button>
                </div>
                
                <Separator className="my-3" />
                
                <div className="mt-3 flex justify-center">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefreshData} 
            disabled={refreshing}
            className="w-full sm:w-auto"
          >
            {refreshing ? (
              <LoaderIcon size="sm" className="mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportData} 
            disabled={exportLoading} 
            className="w-full sm:w-auto"
          >
            <Download className="h-4 w-4 mr-2" />
            {exportLoading ? 'Exporting...' : 'Export Data'}
          </Button>
          
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue={selectedView} onValueChange={setSelectedView} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="traffic">
            <Globe className="h-4 w-4 mr-2" />
            Traffic
          </TabsTrigger>
          <TabsTrigger value="audience">
            <User className="h-4 w-4 mr-2" />
            Audience
          </TabsTrigger>
          <TabsTrigger value="behavior">
            <Clock className="h-4 w-4 mr-2" />
            Behavior
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-bold">{analyticsData.visitors.total.toLocaleString()}</div>
                  <div className={`text-xs ${analyticsData.visitors.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {analyticsData.visitors.change >= 0 ? '+' : ''}{analyticsData.visitors.change}%
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-bold">{analyticsData.pageviews.total.toLocaleString()}</div>
                  <div className={`text-xs ${analyticsData.pageviews.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {analyticsData.pageviews.change >= 0 ? '+' : ''}{analyticsData.pageviews.change}%
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-bold">{analyticsData.bounceRate.total}%</div>
                  <div className={`text-xs ${analyticsData.bounceRate.change < 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {analyticsData.bounceRate.change >= 0 ? '+' : ''}{analyticsData.bounceRate.change}%
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-bold">{analyticsData.avgSessionTime.total} min</div>
                  <div className={`text-xs ${analyticsData.avgSessionTime.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {analyticsData.avgSessionTime.change >= 0 ? '+' : ''}{analyticsData.avgSessionTime.change}%
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Glass className="p-6 lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Website Traffic</h3>
                <p className="text-sm text-gray-500">Visitor trends over time</p>
              </div>
              <AnalyticsDashboard />
            </Glass>
            
            <Glass className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Top Pages</h3>
                <p className="text-sm text-gray-500">Most visited pages</p>
              </div>
              
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{page.path}</div>
                      <div className="text-sm text-gray-500">{page.views.toLocaleString()} views</div>
                    </div>
                    <div className={`text-sm ${page.bounce < 40 ? 'text-green-500' : page.bounce > 45 ? 'text-red-500' : 'text-amber-500'}`}>
                      {page.bounce}% bounce
                    </div>
                  </div>
                ))}
              </div>
            </Glass>
          </div>
        </TabsContent>
        
        <TabsContent value="traffic">
          <Glass className="p-6">
            <div className="text-center py-8">
              <LineChart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Traffic Source Analytics</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Detailed traffic source analytics are available on the PRO plan. Upgrade to access comprehensive traffic insights.
              </p>
              <Button className="mt-4 button-gradient text-white">
                Upgrade to PRO
              </Button>
            </div>
          </Glass>
        </TabsContent>
        
        <TabsContent value="audience">
          <Glass className="p-6">
            <div className="text-center py-8">
              <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Audience Insights</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Audience demographics and behavior analytics are available on the PRO plan. Upgrade to access detailed audience insights.
              </p>
              <Button className="mt-4 button-gradient text-white">
                Upgrade to PRO
              </Button>
            </div>
          </Glass>
        </TabsContent>
        
        <TabsContent value="behavior">
          <Glass className="p-6">
            <div className="text-center py-8">
              <Clock className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">User Behavior Analysis</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Detailed user behavior analytics are available on the PRO plan. Upgrade to access comprehensive behavior insights.
              </p>
              <Button className="mt-4 button-gradient text-white">
                Upgrade to PRO
              </Button>
            </div>
          </Glass>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsTab;
