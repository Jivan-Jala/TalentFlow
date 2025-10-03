import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Briefcase, 
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  Award,
  Calendar,
  MapPin,
  Building,
  Star,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpeg';
import image7 from '../images/image7.jpeg';
import image8 from '../images/image8.jpg';

// Mock chart data generator
const generateChartData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  return {
    applications: months.map((month, index) => ({
      month,
      applications: Math.floor(Math.random() * 50) + 20,
      hires: Math.floor(Math.random() * 10) + 5,
      interviews: Math.floor(Math.random() * 25) + 10
    })),
    stageDistribution: [
      { stage: 'Applied', count: 450, percentage: 45, color: 'bg-blue-500' },
      { stage: 'Screening', count: 200, percentage: 20, color: 'bg-yellow-500' },
      { stage: 'Interview', count: 150, percentage: 15, color: 'bg-orange-500' },
      { stage: 'Offer', count: 100, percentage: 10, color: 'bg-green-500' },
      { stage: 'Hired', count: 100, percentage: 10, color: 'bg-purple-500' }
    ],
    topSkills: [
      { skill: 'React', count: 120, trend: 'up' },
      { skill: 'JavaScript', count: 95, trend: 'up' },
      { skill: 'Node.js', count: 80, trend: 'down' },
      { skill: 'Python', count: 75, trend: 'up' },
      { skill: 'TypeScript', count: 70, trend: 'up' },
      { skill: 'AWS', count: 65, trend: 'up' },
      { skill: 'Docker', count: 60, trend: 'down' },
      { skill: 'Kubernetes', count: 55, trend: 'up' }
    ],
    timeToHire: [
      { period: '0-7 days', count: 15, percentage: 15 },
      { period: '8-14 days', count: 25, percentage: 25 },
      { period: '15-30 days', count: 35, percentage: 35 },
      { period: '31-60 days', count: 20, percentage: 20 },
      { period: '60+ days', count: 5, percentage: 5 }
    ],
    sourceEffectiveness: [
      { source: 'LinkedIn', applications: 300, hires: 25, conversion: 8.3 },
      { source: 'Indeed', applications: 250, hires: 20, conversion: 8.0 },
      { source: 'Company Website', applications: 200, hires: 30, conversion: 15.0 },
      { source: 'Referrals', applications: 150, hires: 40, conversion: 26.7 },
      { source: 'Glassdoor', applications: 100, hires: 15, conversion: 15.0 }
    ]
  };
};

// Simple chart components
const CustomBarChart = ({ data, title, color = 'bg-orange-500' }) => {
  const maxValue = Math.max(...data.map(item => item.applications || item.count));
  
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-black">{title}</h4>
      <div className="space-y-2">
        {data.slice(0, 6).map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-20 text-sm text-black truncate">{item.month || item.source || item.skill}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
              <div 
                className={`h-full ${color} rounded-full transition-all duration-500`}
                style={{ 
                  width: `${((item.applications || item.count) / maxValue) * 100}%` 
                }}
              />
            </div>
            <div className="w-12 text-sm text-black text-right">
              {item.applications || item.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomPieChart = ({ data, title }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-black">{title}</h4>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm text-black">{item.stage}</span>
            </div>
            <div className="text-sm text-black">
              {item.count} ({item.percentage}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomLineChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(item => item.applications));
  
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-black">{title}</h4>
      <div className="h-32 flex items-end gap-1">
        {data.slice(-6).map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1">
            <div 
              className="w-full bg-orange-500 rounded-t transition-all duration-500"
              style={{ height: `${(item.applications / maxValue) * 100}%` }}
            />
            <div className="text-xs text-black">{item.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function Analytics() {
  const { jobs, candidates } = useApp();
  const [chartData, setChartData] = useState(null);
  const [timeRange, setTimeRange] = useState('6months');
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Animation and visibility effects
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mobile detection and performance optimization
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Skip animations on mobile or when user prefers reduced motion
    if (isMobile || prefersReducedMotion) {
      return;
    }

    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  // Generate chart data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setChartData(generateChartData());
      setIsLoading(false);
    };
    
    loadData();
  }, [timeRange]);

  // Calculate analytics metrics
  const analytics = useMemo(() => {
    if (!candidates || !jobs) return null;

    const activeJobs = jobs.filter(job => job.status === 'active');
    const totalCandidates = candidates.length;
    const hiredCandidates = candidates.filter(c => c.currentStage === '5').length;
    const inProgressCandidates = candidates.filter(c => ['2', '3', '4'].includes(c.currentStage)).length;
    
    // Calculate conversion rates
    const applicationRate = totalCandidates > 0 ? ((hiredCandidates / totalCandidates) * 100).toFixed(1) : 0;
    const interviewRate = totalCandidates > 0 ? ((inProgressCandidates / totalCandidates) * 100).toFixed(1) : 0;
    
    // Calculate average time to hire (mock data)
    const avgTimeToHire = 18; // days
    const timeToHireTrend = '+2'; // days vs last month
    
    // Calculate cost per hire (mock data)
    const costPerHire = 3500; // USD
    const costTrend = '-5%'; // vs last month
    
    // Calculate source effectiveness
    const linkedinHires = Math.floor(hiredCandidates * 0.3);
    const referralHires = Math.floor(hiredCandidates * 0.25);
    const websiteHires = Math.floor(hiredCandidates * 0.2);
    const otherHires = hiredCandidates - linkedinHires - referralHires - websiteHires;

    return {
      totalCandidates,
      hiredCandidates,
      inProgressCandidates,
      activeJobs: activeJobs.length,
      applicationRate,
      interviewRate,
      avgTimeToHire,
      timeToHireTrend,
      costPerHire,
      costTrend,
      sourceBreakdown: {
        linkedin: linkedinHires,
        referrals: referralHires,
        website: websiteHires,
        other: otherHires
      }
    };
  }, [jobs, candidates]);

  const timeRangeOptions = [
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' }
  ];

  if (isLoading) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-black">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics || !chartData) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-black mb-2">No Analytics Data</h3>
          <p className="text-black">Analytics data is not available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden">
      {/* Enhanced Background with Parallax */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${image7})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
        }}
      />
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className={`relative z-10 space-y-8 ${isMobile ? 'p-4 space-y-6' : 'p-6'}`}>
        {/* Enhanced Header Section */}
        <div className={`bg-white rounded-3xl text-black relative overflow-hidden border-2 border-orange-200 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${isMobile ? 'p-4' : 'p-8'}`}>
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url(${image8})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5"></div>
          
          <div className="relative z-10">
            <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between ${isMobile ? 'gap-4' : 'gap-6'}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} ${isMobile ? 'transition-transform duration-300' : 'group hover:scale-110 transition-all duration-500'}`}>
                    <BarChart3 className={`text-white relative z-10 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'} ${isMobile ? '' : 'group-hover:animate-pulse'}`} />
                    <img 
                      src={image1} 
                      alt="Analytics background" 
                      className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl"></div>
                  </div>
                  <div>
                    <h1 className={`font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent ${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl lg:text-5xl'}`}>
                      Analytics Dashboard
                    </h1>
                    <p className={`text-black/70 font-medium ${isMobile ? 'text-sm' : 'text-lg'}`}>
                      {isMobile ? 'Hiring insights & performance' : 'Comprehensive insights into your hiring performance'}
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Stats - Mobile Optimized */}
                <div className={`grid gap-2 ${isMobile ? 'grid-cols-2' : 'flex flex-wrap gap-4'}`}>
                  <div className={`flex items-center gap-1 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg ${isMobile ? 'px-2 py-1' : 'px-4 py-2 rounded-xl'}`}>
                    <BarChart3 className="w-3 h-3 text-orange-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-orange-800 truncate">Real-time Analytics</span>
                  </div>
                  <div className={`flex items-center gap-1 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg ${isMobile ? 'px-2 py-1' : 'px-4 py-2 rounded-xl'}`}>
                    <TrendingUp className="w-3 h-3 text-blue-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-blue-800 truncate">Performance</span>
                  </div>
                  <div className={`flex items-center gap-1 bg-gradient-to-r from-green-100 to-green-200 rounded-lg ${isMobile ? 'px-2 py-1' : 'px-4 py-2 rounded-xl'}`}>
                    <Target className="w-3 h-3 text-green-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-green-800 truncate">Goals</span>
                  </div>
                  <div className={`flex items-center gap-1 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg ${isMobile ? 'px-2 py-1' : 'px-4 py-2 rounded-xl'}`}>
                    <Activity className="w-3 h-3 text-purple-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-purple-800 truncate">Insights</span>
                  </div>
                </div>
              </div>
              
              <div className={`flex gap-3 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                <Button className={`bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-3 ${isMobile ? 'px-3 py-2 text-sm' : 'px-6 py-3 text-lg'}`}>
                  <Download className="w-4 h-4" />
                  {isMobile ? 'Export' : 'Export Data'}
                </Button>
                <Button className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-3 ${isMobile ? 'px-3 py-2 text-sm' : 'px-6 py-3 text-lg'}`}>
                  <RefreshCw className="w-4 h-4" />
                  {isMobile ? 'Refresh' : 'Refresh'}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-12 translate-x-12 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-8 -translate-x-8 opacity-20"></div>
        </div>

        {/* Enhanced Time Range Selector */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <Card className={`relative group border-0 shadow-lg bg-white/90 backdrop-blur-sm ${isMobile ? 'hover:shadow-lg transition-shadow duration-300' : 'hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'}`}>
            <CardHeader className="relative z-10">
              <CardTitle className={`flex items-center gap-3 font-bold text-black ${isMobile ? 'text-lg' : 'text-xl'}`}>
                <div className={`bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
                  <Filter className={`text-white ${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`} />
                </div>
                Analytics Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className={`flex flex-col ${isMobile ? 'gap-4' : 'sm:flex-row sm:items-center sm:justify-between gap-6'}`}>
                <div className={`flex items-center gap-3 ${isMobile ? 'flex-col items-start' : 'gap-4'}`}>
                  <span className={`font-semibold text-black ${isMobile ? 'text-sm' : 'text-lg'}`}>Time Range:</span>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className={`rounded-2xl border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 hover:shadow-lg bg-white font-semibold text-black ${isMobile ? 'px-3 py-2 text-sm w-full' : 'px-6 py-3 text-lg'}`}
                  >
                    {timeRangeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={`flex gap-3 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                  <Button className={`bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-3 ${isMobile ? 'px-3 py-2 text-sm' : 'px-6 py-3 text-lg'}`}>
                    <Download className="w-4 h-4" />
                    {isMobile ? 'Export' : 'Export Data'}
                  </Button>
                  <Button className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-3 ${isMobile ? 'px-3 py-2 text-sm' : 'px-6 py-3 text-lg'}`}>
                    <RefreshCw className="w-4 h-4" />
                    {isMobile ? 'Refresh' : 'Refresh'}
                  </Button>
                </div>
              </div>
            </CardContent>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-12 translate-x-12 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
          </Card>
        </div>

        {/* Key Metrics */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'}`}>
          {[
            {
              title: 'Total Candidates',
              value: analytics.totalCandidates,
              icon: Users,
              color: 'text-blue-600',
              bgColor: 'bg-blue-50',
              change: '+12% vs last month',
              trend: 'up'
            },
            {
              title: 'Hired Candidates',
              value: analytics.hiredCandidates,
              icon: CheckCircle,
              color: 'text-green-600',
              bgColor: 'bg-green-50',
              change: '+8% vs last month',
              trend: 'up'
            },
            {
              title: 'Conversion Rate',
              value: `${analytics.applicationRate}%`,
              icon: Target,
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
              change: '+2.1% vs last month',
              trend: 'up'
            },
            {
              title: 'Avg Time to Hire',
              value: `${analytics.avgTimeToHire} days`,
              icon: Clock,
              color: 'text-orange-600',
              bgColor: 'bg-orange-50',
              change: `${analytics.timeToHireTrend} days vs last month`,
              trend: analytics.timeToHireTrend.startsWith('+') ? 'down' : 'up'
            }
          ].map((metric, index) => (
            <Card key={index} className={`transition-shadow relative overflow-hidden ${isMobile ? 'hover:shadow-md' : 'hover:shadow-md'}`}>
              <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                <div className={`flex items-center justify-between ${isMobile ? 'flex-col items-start gap-3' : ''}`}>
                  <div className={`${isMobile ? 'w-full' : ''}`}>
                    <p className={`font-medium text-black ${isMobile ? 'text-xs' : 'text-sm'}`}>{metric.title}</p>
                    <p className={`font-bold text-black ${isMobile ? 'text-xl' : 'text-2xl'}`}>{metric.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="w-3 h-3 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 text-red-600" />
                      )}
                      <p className={`text-green-600 ${isMobile ? 'text-xs' : 'text-xs'}`}>{metric.change}</p>
                    </div>
                  </div>
                  <div className={`${metric.bgColor} rounded-lg flex items-center justify-center relative overflow-hidden ${isMobile ? 'w-10 h-10' : 'w-12 h-12'}`}>
                    <metric.icon className={`${metric.color} relative z-10 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                    <img 
                      src={[image1, image2, image3, image4][index % 4]} 
                      alt="Background" 
                      className="absolute inset-0 w-full h-full object-cover opacity-10 rounded-lg"
                    />
                  </div>
                </div>
                <div className={`absolute top-0 right-0 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full opacity-30 ${isMobile ? 'w-12 h-12 -translate-y-6 translate-x-6' : 'w-16 h-16 -translate-y-8 translate-x-8'}`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 gap-6'}`}>
          {/* Applications Over Time */}
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <BarChart3 className={`text-orange-600 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                {isMobile ? 'Applications Over Time' : 'Applications Over Time'}
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'p-4' : ''}>
              <CustomLineChart data={chartData.applications} title="" />
            </CardContent>
            <div className={`absolute top-0 right-0 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full opacity-20 ${isMobile ? 'w-16 h-16 -translate-y-8 translate-x-8' : 'w-24 h-24 -translate-y-12 translate-x-12'}`}></div>
          </Card>

          {/* Stage Distribution */}
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <PieChart className={`text-orange-600 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                {isMobile ? 'Stage Distribution' : 'Candidate Stage Distribution'}
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'p-4' : ''}>
              <CustomPieChart data={chartData.stageDistribution} title="" />
            </CardContent>
            <div className={`absolute top-0 right-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-20 ${isMobile ? 'w-16 h-16 -translate-y-8 translate-x-8' : 'w-24 h-24 -translate-y-12 translate-x-12'}`}></div>
          </Card>

          {/* Top Skills */}
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <BarChart3 className={`text-orange-600 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                {isMobile ? 'Top Skills' : 'Top Skills in Demand'}
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'p-4' : ''}>
              <CustomBarChart data={chartData.topSkills} title="" color="bg-green-500" />
            </CardContent>
            <div className={`absolute top-0 right-0 bg-gradient-to-br from-green-100 to-green-200 rounded-full opacity-20 ${isMobile ? 'w-16 h-16 -translate-y-8 translate-x-8' : 'w-24 h-24 -translate-y-12 translate-x-12'}`}></div>
          </Card>

          {/* Time to Hire Distribution */}
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <Clock className={`text-orange-600 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                {isMobile ? 'Time to Hire' : 'Time to Hire Distribution'}
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'p-4' : ''}>
              <CustomBarChart data={chartData.timeToHire} title="" color="bg-purple-500" />
            </CardContent>
            <div className={`absolute top-0 right-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full opacity-20 ${isMobile ? 'w-16 h-16 -translate-y-8 translate-x-8' : 'w-24 h-24 -translate-y-12 translate-x-12'}`}></div>
          </Card>
        </div>

        {/* Source Effectiveness */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <Activity className={`text-orange-600 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
              {isMobile ? 'Source Effectiveness' : 'Source Effectiveness'}
            </CardTitle>
          </CardHeader>
          <CardContent className={isMobile ? 'p-4' : ''}>
            <div className={`space-y-3 ${isMobile ? 'space-y-2' : 'space-y-4'}`}>
              {chartData.sourceEffectiveness.map((source, index) => (
                <div key={index} className={`flex items-center justify-between bg-orange-50 rounded-lg relative overflow-hidden ${isMobile ? 'p-3' : 'p-4'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`bg-orange-100 rounded-lg flex items-center justify-center relative overflow-hidden ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
                      <Building className={`text-orange-600 relative z-10 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                      <img 
                        src={[image1, image2, image3, image4, image5, image6][index % 6]} 
                        alt="Source background" 
                        className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className={`font-medium text-black ${isMobile ? 'text-sm' : ''}`}>{source.source}</h3>
                      <p className={`text-black ${isMobile ? 'text-xs' : 'text-sm'}`}>{source.applications} applications</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-black ${isMobile ? 'text-sm' : 'text-lg'}`}>{source.hires} hires</div>
                    <div className={`text-green-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>{source.conversion}% conversion</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className={`absolute top-0 right-0 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full opacity-10 ${isMobile ? 'w-20 h-20 -translate-y-10 translate-x-10' : 'w-32 h-32 -translate-y-16 translate-x-16'}`}></div>
        </Card>

        {/* Performance Insights */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3 gap-6'}`}>
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <TrendingUp className={`text-orange-600 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'p-4' : ''}>
              <div className={`space-y-3 ${isMobile ? 'space-y-2' : 'space-y-4'}`}>
                <div className={`bg-green-50 rounded-lg ${isMobile ? 'p-2' : 'p-3'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className={`text-green-600 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    <span className={`font-medium text-green-800 ${isMobile ? 'text-xs' : 'text-sm'}`}>High Performance</span>
                  </div>
                  <p className={`text-green-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>Referral hires have 26.7% conversion rate</p>
                </div>
                <div className={`bg-blue-50 rounded-lg ${isMobile ? 'p-2' : 'p-3'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Target className={`text-blue-600 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    <span className={`font-medium text-blue-800 ${isMobile ? 'text-xs' : 'text-sm'}`}>Opportunity</span>
                  </div>
                  <p className={`text-blue-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>LinkedIn applications are high but conversion is low</p>
                </div>
                <div className={`bg-orange-50 rounded-lg ${isMobile ? 'p-2' : 'p-3'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className={`text-orange-600 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    <span className={`font-medium text-orange-800 ${isMobile ? 'text-xs' : 'text-sm'}`}>Trend</span>
                  </div>
                  <p className={`text-orange-700 ${isMobile ? 'text-xs' : 'text-sm'}`}>Time to hire increased by 2 days this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <Award className={`text-orange-600 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                Goals & Targets
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'p-4' : ''}>
              <div className={`space-y-3 ${isMobile ? 'space-y-2' : 'space-y-4'}`}>
                <div className="space-y-2">
                  <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <span className="text-black">Monthly Hires Target</span>
                    <span className="text-black">{analytics.hiredCandidates}/25</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(analytics.hiredCandidates / 25) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <span className="text-black">Conversion Rate Goal</span>
                    <span className="text-black">{analytics.applicationRate}%/15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(analytics.applicationRate / 15) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={`flex justify-between ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <span className="text-black">Time to Hire Goal</span>
                    <span className="text-black">{analytics.avgTimeToHire} days/14 days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((14 / analytics.avgTimeToHire) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
                <Zap className={`text-orange-600 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'p-4' : ''}>
              <div className={`space-y-2 ${isMobile ? 'space-y-2' : 'space-y-3'}`}>
                <Link to="/jobs/new">
                  <Button variant="secondary" className={`w-full gap-2 ${isMobile ? 'py-2 text-sm' : ''}`}>
                    <Briefcase className="w-4 h-4" />
                    {isMobile ? 'Post Job' : 'Post New Job'}
                  </Button>
                </Link>
                <Link to="/candidates">
                  <Button variant="secondary" className={`w-full gap-2 ${isMobile ? 'py-2 text-sm' : ''}`}>
                    <Users className="w-4 h-4" />
                    {isMobile ? 'Candidates' : 'View Candidates'}
                  </Button>
                </Link>
                <Button variant="secondary" className={`w-full gap-2 ${isMobile ? 'py-2 text-sm' : ''}`}>
                  <Download className="w-4 h-4" />
                  {isMobile ? 'Export' : 'Export Report'}
                </Button>
                <Button variant="secondary" className={`w-full gap-2 ${isMobile ? 'py-2 text-sm' : ''}`}>
                  <RefreshCw className="w-4 h-4" />
                  {isMobile ? 'Refresh' : 'Refresh Data'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
