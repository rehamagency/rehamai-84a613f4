
import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';
import { 
  ArrowUpRight, ArrowDownRight, Users, Globe, 
  MousePointerClick, Clock, RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader } from '@/components/ui/Loader';

// Sample data - in a real app, this would come from an API
const pageViewsData = [
  { name: 'Mon', views: 120 },
  { name: 'Tue', views: 150 },
  { name: 'Wed', views: 180 },
  { name: 'Thu', views: 145 },
  { name: 'Fri', views: 190 },
  { name: 'Sat', views: 90 },
  { name: 'Sun', views: 85 },
];

const visitorSourceData = [
  { name: 'Direct', value: 45 },
  { name: 'Social', value: 25 },
  { name: 'Search', value: 20 },
  { name: 'Referral', value: 10 },
];

const deviceData = [
  { name: 'Desktop', value: 60 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 5 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('7days');
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [timeframe]);
  
  const handleRefresh = () => {
    setLoading(true);
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader size="lg" />
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading analytics data...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs
          value={timeframe}
          onValueChange={setTimeframe}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-3 w-full sm:w-auto">
            <TabsTrigger value="7days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="90days">90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="w-full sm:w-auto"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Visitors</p>
                <h4 className="text-2xl font-bold mt-1">1,247</h4>
              </div>
              <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-500">+12.5%</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Page Views</p>
                <h4 className="text-2xl font-bold mt-1">3,962</h4>
              </div>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-500">+8.2%</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Click Rate</p>
                <h4 className="text-2xl font-bold mt-1">2.3%</h4>
              </div>
              <div className="h-12 w-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                <MousePointerClick className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-sm font-medium text-red-500">-1.1%</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Time on Page</p>
                <h4 className="text-2xl font-bold mt-1">1:42</h4>
              </div>
              <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-500">+0.3%</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Visitors Overview</CardTitle>
            <CardDescription>Daily visitor count over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={pageViewsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff', borderRadius: '8px', border: 'none' }} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="views"
                    name="Page Views"
                    stroke="#8b5cf6"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex flex-col md:flex-row items-center justify-center">
              <div className="w-full md:w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visitorSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {visitorSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <ul className="space-y-2">
                  {visitorSourceData.map((source, index) => (
                    <li key={index} className="flex items-center">
                      <span 
                        className="h-3 w-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{source.name}: </span>
                      <span className="text-sm font-medium ml-1">{source.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages on your site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Home Page</span>
                  <span className="font-medium">863 views</span>
                </div>
                <Progress value={86} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>About Page</span>
                  <span className="font-medium">453 views</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Features Page</span>
                  <span className="font-medium">375 views</span>
                </div>
                <Progress value={37} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pricing Page</span>
                  <span className="font-medium">268 views</span>
                </div>
                <Progress value={27} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Contact Page</span>
                  <span className="font-medium">184 views</span>
                </div>
                <Progress value={18} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>Visitors by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={deviceData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Percentage" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {deviceData.map((device, index) => (
                <div key={index} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-sm font-medium">{device.name}</p>
                  <p className="text-lg font-bold mt-1">{device.value}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
