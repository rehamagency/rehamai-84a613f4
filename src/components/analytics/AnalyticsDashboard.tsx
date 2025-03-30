
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Glass } from '@/components/ui/Glass';
import { CalendarDays, Users, MousePointerClick, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Sample data for demonstration
const visitorsData = [
  { name: 'Mon', visitors: 230 },
  { name: 'Tue', visitors: 280 },
  { name: 'Wed', visitors: 410 },
  { name: 'Thu', visitors: 520 },
  { name: 'Fri', visitors: 630 },
  { name: 'Sat', visitors: 310 },
  { name: 'Sun', visitors: 320 },
];

const pageViewsData = [
  { name: 'Mon', views: 450 },
  { name: 'Tue', views: 520 },
  { name: 'Wed', views: 800 },
  { name: 'Thu', views: 950 },
  { name: 'Fri', views: 1100 },
  { name: 'Sat', views: 580 },
  { name: 'Sun', views: 610 },
];

const trafficSourceData = [
  { name: 'Direct', value: 40 },
  { name: 'Social', value: 30 },
  { name: 'Search', value: 20 },
  { name: 'Referral', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface AnalyticsDashboardProps {
  darkMode?: boolean;
  websiteId?: string;
  compact?: boolean;
}

const AnalyticsDashboard = ({ darkMode = true, websiteId, compact = false }: AnalyticsDashboardProps) => {
  const [timeRange, setTimeRange] = useState('week');

  const statsCards = [
    {
      title: 'Total Visitors',
      value: '2,370',
      change: '+14%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Page Views',
      value: '4,420',
      change: '+18%',
      trend: 'up',
      icon: MousePointerClick,
    },
    {
      title: 'Avg. Session',
      value: '2m 45s',
      change: '-5%',
      trend: 'down',
      icon: Clock,
    },
    {
      title: 'Bounce Rate',
      value: '42%',
      change: '-7%',
      trend: 'up',
      icon: CalendarDays,
    },
  ];

  return (
    <div className={compact ? 'space-y-4' : 'space-y-8'}>
      {!compact && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
          <Tabs defaultValue={timeRange} onValueChange={setTimeRange} className="mt-4 sm:mt-0">
            <TabsList className={darkMode ? 'bg-gray-800' : ''}>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, i) => (
          <Card key={i} className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <card.icon className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`flex items-center text-sm ${
                  card.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {card.change} 
                  {card.trend === 'up' ? <ArrowUpRight className="h-3 w-3 ml-1" /> : <ArrowDownRight className="h-3 w-3 ml-1" />}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{card.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Glass className="p-6" variant={darkMode ? 'dark' : 'default'}>
          <h3 className="text-lg font-medium mb-4">Visitors</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={visitorsData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#eee"} />
                <XAxis dataKey="name" stroke={darkMode ? "#999" : "#666"} />
                <YAxis stroke={darkMode ? "#999" : "#666"} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#1f2937' : '#fff',
                    borderColor: darkMode ? '#374151' : '#e5e7eb',
                    color: darkMode ? '#fff' : '#000' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Glass>

        <Glass className="p-6" variant={darkMode ? 'dark' : 'default'}>
          <h3 className="text-lg font-medium mb-4">Page Views</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={pageViewsData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#eee"} />
                <XAxis dataKey="name" stroke={darkMode ? "#999" : "#666"} />
                <YAxis stroke={darkMode ? "#999" : "#666"} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#1f2937' : '#fff',
                    borderColor: darkMode ? '#374151' : '#e5e7eb',
                    color: darkMode ? '#fff' : '#000' 
                  }} 
                />
                <Bar dataKey="views" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Glass>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Glass className="p-6 lg:col-span-2" variant={darkMode ? 'dark' : 'default'}>
          <h3 className="text-lg font-medium mb-4">Popular Pages</h3>
          <div className={`overflow-x-auto -mx-6 px-6 ${darkMode ? 'scrollbar-dark' : 'scrollbar-light'}`}>
            <table className="w-full min-w-full">
              <thead>
                <tr className={darkMode ? 'border-b border-gray-700' : 'border-b'}>
                  <th className="text-left py-3 px-4">Page</th>
                  <th className="text-right py-3 px-4">Views</th>
                  <th className="text-right py-3 px-4">Avg. Time</th>
                  <th className="text-right py-3 px-4">Bounce Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className={darkMode ? 'border-b border-gray-700' : 'border-b'}>
                  <td className="py-3 px-4">/</td>
                  <td className="text-right py-3 px-4">1,235</td>
                  <td className="text-right py-3 px-4">1m 23s</td>
                  <td className="text-right py-3 px-4">32%</td>
                </tr>
                <tr className={darkMode ? 'border-b border-gray-700' : 'border-b'}>
                  <td className="py-3 px-4">/about</td>
                  <td className="text-right py-3 px-4">865</td>
                  <td className="text-right py-3 px-4">2m 12s</td>
                  <td className="text-right py-3 px-4">21%</td>
                </tr>
                <tr className={darkMode ? 'border-b border-gray-700' : 'border-b'}>
                  <td className="py-3 px-4">/templates</td>
                  <td className="text-right py-3 px-4">752</td>
                  <td className="text-right py-3 px-4">3m 40s</td>
                  <td className="text-right py-3 px-4">18%</td>
                </tr>
                <tr className={darkMode ? 'border-b border-gray-700' : 'border-b'}>
                  <td className="py-3 px-4">/builder</td>
                  <td className="text-right py-3 px-4">524</td>
                  <td className="text-right py-3 px-4">8m 15s</td>
                  <td className="text-right py-3 px-4">7%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">/dashboard</td>
                  <td className="text-right py-3 px-4">412</td>
                  <td className="text-right py-3 px-4">5m 37s</td>
                  <td className="text-right py-3 px-4">11%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Glass>

        <Glass className="p-6" variant={darkMode ? 'dark' : 'default'}>
          <h3 className="text-lg font-medium mb-4">Traffic Sources</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#1f2937' : '#fff',
                    borderColor: darkMode ? '#374151' : '#e5e7eb',
                    color: darkMode ? '#fff' : '#000' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Glass>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
