import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  ClipboardList, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  User,
  Mail,
  Star,
  Award,
  Activity,
  Building,
  MessageCircle,
  Eye,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Brain,
  Workflow,
  Shield,
  Globe,
  Rocket,
  Crown,
  Gem,
  Flame,
  Sun,
  Moon,
  Heart,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  Flag,
  Lightbulb,
  Wrench,
  Cog,
  Layers,
  Grid,
  List,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Copy,
  Scissors,
  Clipboard,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Trash2,
  Edit,
  Save,
  Send,
  Upload,
  Download,
  Link as LinkIcon,
  Unlink,
  Lock,
  Unlock,
  Eye as EyeIcon,
  EyeOff,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
  SignalZero,
  SignalOne,
  SignalTwo,
  SignalThree,
  SignalFour,
  SignalFive,
  Wifi as WifiIcon,
  Bluetooth,
  BluetoothOff,
  Radio,
  RadioOff,
  Tv,
  TvOff,
  Monitor,
  MonitorOff,
  Smartphone,
  SmartphoneOff,
  Tablet,
  TabletOff,
  Laptop,
  LaptopOff,
  Desktop,
  DesktopOff,
  Server,
  ServerOff,
  Cloud,
  CloudOff,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudHail,
  CloudFog,
  CloudSun,
  CloudMoon,
  Sun as SunIcon,
  Moon as MoonIcon,
  Sunrise,
  Sunset,
  Wind,
  Thermometer,
  Droplets,
  Snowflake,
  Umbrella,
  TreePine,
  TreeDeciduous,
  Flower,
  Leaf,
  Bug,
  Bird,
  Fish,
  Cat,
  Dog,
  Rabbit,
  Mouse,
  Squirrel,
  Whale,
  Dolphin,
  Shark,
  Octopus,
  Crab,
  Lobster,
  Shrimp,
  Fish as FishIcon,
  Carrot,
  Apple,
  Banana,
  Cherry,
  Grape,
  Lemon,
  Orange,
  Peach,
  Pear,
  Pineapple,
  Strawberry,
  Watermelon,
  Avocado,
  Broccoli,
  Corn,
  Eggplant,
  Mushroom,
  Onion,
  Pepper,
  Potato,
  Tomato,
  Wheat,
  Coffee,
  Tea,
  Milk,
  Beer,
  Wine,
  Cocktail,
  Soda,
  Juice,
  Water,
  Ice,
  Fire,
  Snow,
  Rain,
  Thunder,
  Lightning,
  Tornado,
  Hurricane,
  Earthquake,
  Volcano,
  Tsunami,
  Flood,
  Drought,
  Heat,
  Cold,
  Warm,
  Cool,
  Hot,
  Freeze,
  Melt,
  Boil,
  Steam,
  Smoke,
  Fog,
  Mist,
  Dew,
  Frost,
  Ice as IceIcon,
  Snow as SnowIcon,
  Rain as RainIcon,
  Thunder as ThunderIcon,
  Lightning as LightningIcon,
  Tornado as TornadoIcon,
  Hurricane as HurricaneIcon,
  Earthquake as EarthquakeIcon,
  Volcano as VolcanoIcon,
  Tsunami as TsunamiIcon,
  Flood as FloodIcon,
  Drought as DroughtIcon,
  Heat as HeatIcon,
  Cold as ColdIcon,
  Warm as WarmIcon,
  Cool as CoolIcon,
  Hot as HotIcon,
  Freeze as FreezeIcon,
  Melt as MeltIcon,
  Boil as BoilIcon,
  Steam as SteamIcon,
  Smoke as SmokeIcon,
  Fog as FogIcon,
  Mist as MistIcon,
  Dew as DewIcon,
  Frost as FrostIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpeg';
import image7 from '../images/image7.jpeg';
import logo from '../images/logo.png';

export function Dashboard() {
  const { jobs, candidates, assessments } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedStats, setAnimatedStats] = useState({
    activeJobs: 0,
    totalCandidates: 0,
    assessments: 0,
    hireRate: 0
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const dashboardRef = useRef(null);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated stats counter
  useEffect(() => {
    if (isVisible) {
      const animateStats = () => {
        const targetActiveJobs = jobs.filter(job => job.status === 'active').length;
        const targetTotalCandidates = candidates.length;
        const targetAssessments = assessments.length;
        const targetHireRate = 12;

        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          const easeOut = 1 - Math.pow(1 - progress, 3);

          setAnimatedStats({
            activeJobs: Math.floor(targetActiveJobs * easeOut),
            totalCandidates: Math.floor(targetTotalCandidates * easeOut),
            assessments: Math.floor(targetAssessments * easeOut),
            hireRate: Math.floor(targetHireRate * easeOut)
          });

          if (currentStep >= steps) {
            clearInterval(timer);
            setAnimatedStats({
              activeJobs: targetActiveJobs,
              totalCandidates: targetTotalCandidates,
              assessments: targetAssessments,
              hireRate: targetHireRate
            });
          }
        }, stepDuration);
      };

      const timer = setTimeout(animateStats, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, jobs, candidates, assessments]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const activeJobs = jobs.filter(job => job.status === 'active');
  const totalApplicants = candidates.length;
  const recentApplications = candidates.filter(candidate => 
    new Date(candidate.stages['1']?.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  // Additional static data for enhanced dashboard
  const additionalStats = [
    {
      title: 'Interviews Scheduled',
      value: '8',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+3 this week'
    },
    {
      title: 'Offers Extended',
      value: '3',
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+1 this week'
    },
    {
      title: 'Response Rate',
      value: '85%',
      icon: MessageCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+5% vs last month'
    },
    {
      title: 'Time to Hire',
      value: '12 days',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-2 days vs last month'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'application',
      message: 'New application received for Senior Frontend Developer',
      time: '2 minutes ago',
      icon: User,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'interview',
      message: 'Interview scheduled with Sarah Johnson',
      time: '1 hour ago',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'offer',
      message: 'Offer extended to John Smith',
      time: '3 hours ago',
      icon: Award,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'assessment',
      message: 'Assessment completed by 5 candidates',
      time: '5 hours ago',
      icon: ClipboardList,
      color: 'text-orange-600'
    }
  ];

  const stats = [
    {
      title: 'Active Jobs',
      value: animatedStats.activeJobs,
      icon: Briefcase,
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      gradient: 'from-orange-500 to-orange-600',
      change: '+2 this week',
      image: image1
    },
    {
      title: 'Total Candidates',
      value: animatedStats.totalCandidates,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      gradient: 'from-green-500 to-green-600',
      change: `+${recentApplications} this week`,
      image: image2
    },
    {
      title: 'Assessments',
      value: animatedStats.assessments,
      icon: ClipboardList,
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      gradient: 'from-yellow-500 to-yellow-600',
      change: '3 pending',
      image: image3
    },
    {
      title: 'Hire Rate',
      value: `${animatedStats.hireRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      gradient: 'from-purple-500 to-purple-600',
      change: '+2% vs last month',
      image: image4
    }
  ];

  const recentJobs = activeJobs.slice(0, 3);
  const recentCandidates = candidates.slice(0, 4);

  // Chart data
  const chartData = {
    applicationsOverTime: [
      { month: 'Jan', applications: 45, hires: 8 },
      { month: 'Feb', applications: 52, hires: 12 },
      { month: 'Mar', applications: 38, hires: 6 },
      { month: 'Apr', applications: 67, hires: 15 },
      { month: 'May', applications: 73, hires: 18 },
      { month: 'Jun', applications: 89, hires: 22 }
    ],
    jobStatusDistribution: [
      { status: 'Active', count: activeJobs.length, color: 'bg-orange-500' },
      { status: 'Draft', count: jobs.filter(job => job.status === 'draft').length, color: 'bg-blue-500' },
      { status: 'Closed', count: jobs.filter(job => job.status === 'closed').length, color: 'bg-gray-500' },
      { status: 'Paused', count: jobs.filter(job => job.status === 'paused').length, color: 'bg-yellow-500' }
    ],
    candidateStages: [
      { stage: 'Applied', count: candidates.filter(c => c.currentStage === '1').length, color: 'bg-blue-500' },
      { stage: 'Screening', count: candidates.filter(c => c.currentStage === '2').length, color: 'bg-yellow-500' },
      { stage: 'Interview', count: candidates.filter(c => c.currentStage === '3').length, color: 'bg-orange-500' },
      { stage: 'Offer', count: candidates.filter(c => c.currentStage === '4').length, color: 'bg-green-500' }
    ],
    hiringTrends: [
      { week: 'Week 1', applications: 12, interviews: 3, offers: 1 },
      { week: 'Week 2', applications: 18, interviews: 5, offers: 2 },
      { week: 'Week 3', applications: 15, interviews: 4, offers: 1 },
      { week: 'Week 4', applications: 22, interviews: 6, offers: 3 }
    ]
  };

  // Custom Chart Components
  const CustomBarChart = ({ data, title, color = 'bg-orange-500' }) => {
    const maxValue = Math.max(...data.map(item => item.applications || item.count));
    
    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-black">{title}</h4>
        <div className="space-y-3">
          {data.slice(0, 6).map((item, index) => (
            <div key={index} className="flex items-center gap-3 group">
              <div className="w-20 text-sm text-black truncate font-medium">{item.month || item.stage || item.week}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                <div 
                  className={`h-full ${color} rounded-full transition-all duration-1000 group-hover:scale-105`}
                  style={{ 
                    width: `${((item.applications || item.count) / maxValue) * 100}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                />
              </div>
              <div className="w-12 text-sm text-black text-right font-semibold">
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
            <div key={index} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-sm text-black font-medium">{item.status || item.stage}</span>
              </div>
              <div className="text-sm text-black font-semibold">
                {item.count}
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
        <div className="h-32 flex items-end gap-2">
          {data.slice(-4).map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
              <div 
                className="w-full bg-gradient-to-t from-orange-500 to-blue-500 rounded-t transition-all duration-1000 group-hover:scale-105"
                style={{ height: `${(item.applications / maxValue) * 100}%` }}
              />
              <div className="text-xs text-black font-medium">{item.month || item.week}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-orange-50 via-white to-blue-50" ref={dashboardRef}>
      <div className="space-y-8 p-6">
        {/* Enhanced Welcome Section */}
        <div className={`bg-white rounded-3xl p-8 text-black relative overflow-hidden border-2 border-orange-200 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(${image7})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-500/20"></div>
            {/* Floating Elements */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-orange-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-orange-600 animate-spin" />
                  <Badge className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-orange-300 px-4 py-2 text-sm font-semibold">
                    Dashboard Overview
                  </Badge>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-black">
                  Welcome to 
                  <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent"> TalentFlow</span>
                </h1>
                <p className="text-xl text-black/80">Manage your hiring pipeline with intelligent automation</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-black">25+</div>
                    <div className="text-sm text-black/70">Companies</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-black">1,000+</div>
                    <div className="text-sm text-black/70">Candidates</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-black">95%</div>
                    <div className="text-sm text-black/70">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="w-40 h-40 bg-gradient-to-br from-orange-500 to-blue-500 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl group hover:scale-110 transition-transform duration-500">
                <Briefcase className="w-20 h-20 text-white relative z-10 group-hover:rotate-12 transition-transform duration-500" />
                <img 
                  src={image3} 
                  alt="TalentFlow" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/50 to-blue-500/50 rounded-3xl"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

      {/* Enhanced Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="group relative"
            style={{
              animationDelay: `${index * 200}ms`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/5 to-blue-500/5 rounded-full blur-2xl"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-black/70">{stat.title}</p>
                    <p className="text-3xl font-bold text-black group-hover:text-orange-600 transition-colors duration-300">
                      {stat.value}
                    </p>
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                    <stat.icon className={`w-8 h-8 ${stat.color} relative z-10 group-hover:animate-pulse`} />
                    <img 
                      src={stat.image} 
                      alt="Background" 
                      className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl"></div>
                  </div>
                </div>
                <div className="mt-4 w-full h-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full group-hover:w-full transition-all duration-500"></div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Enhanced Additional Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {additionalStats.map((stat, index) => (
          <div 
            key={index} 
            className="group relative"
            style={{
              animationDelay: `${(index + 4) * 200}ms`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-black/70">{stat.title}</p>
                    <p className="text-3xl font-bold text-black group-hover:text-blue-600 transition-colors duration-300">
                      {stat.value}
                    </p>
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                    <stat.icon className={`w-8 h-8 ${stat.color} relative z-10 group-hover:animate-pulse`} />
                    <img 
                      src={[image5, image6, image1, image2][index % 4]} 
                      alt="Background" 
                      className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl"></div>
                  </div>
                </div>
                <div className="mt-4 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-500"></div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Enhanced Recent Activities Section */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-black">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                Recent Activities
              </CardTitle>
              <Link to="/activities" className="text-sm text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="group/activity flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 rounded-2xl"></div>
                  <div className={`w-12 h-12 ${activity.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center relative overflow-hidden group-hover/activity:scale-110 group-hover/activity:rotate-12 transition-all duration-500 shadow-lg`}>
                    <activity.icon className={`w-6 h-6 ${activity.color} relative z-10 group-hover/activity:animate-pulse`} />
                    <img 
                      src={[image1, image2, image3, image4, image5, image6][index % 6]} 
                      alt="Activity background" 
                      className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl"></div>
                  </div>
                  <div className="flex-1 relative z-10">
                    <p className="text-sm font-semibold text-black group-hover/activity:text-orange-600 transition-colors duration-300">{activity.message}</p>
                    <p className="text-xs text-black/70 font-medium flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 relative z-10">
                    <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center group-hover/activity:scale-110 transition-transform duration-300">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-8 translate-x-8 opacity-20 group-hover/activity:opacity-30 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </CardContent>
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-12 -translate-x-12 opacity-10"></div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Recent Jobs */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-black">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  Recent Jobs
                </CardTitle>
                <Link to="/jobs" className="text-sm text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                {recentJobs.map((job, index) => (
                  <div 
                    key={job.id} 
                    className="group/job flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 rounded-2xl"></div>
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover/job:scale-110 group-hover/job:rotate-12 transition-all duration-500 shadow-lg">
                        <Briefcase className="w-6 h-6 text-white relative z-10 group-hover/job:animate-pulse" />
                        <img 
                          src={[image1, image2, image3, image4, image5, image6][index % 6]} 
                          alt="Job background" 
                          className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-black group-hover/job:text-orange-600 transition-colors duration-300">{job.title}</h3>
                        <p className="text-sm text-black/70 flex items-center gap-2 mt-1">
                          <MapPin className="w-3 h-3" /> {job.company} • {job.location}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="primary" className="text-xs">{job.type}</Badge>
                          <span className="text-xs text-black/70 flex items-center gap-1">
                            <Users className="w-3 h-3" /> {job.applicants} applicants
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right relative z-10">
                      <p className="text-sm font-semibold text-black flex items-center gap-1">
                        <span className="text-orange-600 font-bold">₹</span> {job.salary}
                      </p>
                      <p className="text-xs text-black/70 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" /> Posted {job.postedDate}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-8 translate-x-8 opacity-20 group-hover/job:opacity-30 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </CardContent>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-12 translate-x-12 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
          </Card>
        </div>

        {/* Enhanced Recent Candidates */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-black">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  Recent Candidates
                </CardTitle>
                <Link to="/candidates" className="text-sm text-green-600 hover:text-green-700 font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                {recentCandidates.map((candidate, index) => (
                  <div 
                    key={candidate.id} 
                    className="group/candidate flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-purple-50 rounded-2xl relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-purple-500/5 rounded-2xl"></div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover/candidate:scale-110 group-hover/candidate:rotate-12 transition-all duration-500 shadow-lg">
                        <span className="text-sm font-bold text-white relative z-10">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                        <img 
                          src={[image1, image2, image3, image4, image5, image6][index % 6]} 
                          alt="Candidate background" 
                          className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-2xl"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-black group-hover/candidate:text-green-600 transition-colors duration-300">{candidate.name}</h3>
                        <p className="text-sm text-black/70 flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3" /> {candidate.email}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">{candidate.experience}</Badge>
                          <span className="text-xs text-black/70 flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {candidate.skills.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right relative z-10">
                      <div className="flex items-center gap-2">
                        {candidate.currentStage === '1' && <Clock className="w-4 h-4 text-orange-500" />}
                        {candidate.currentStage === '2' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                        {candidate.currentStage === '3' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        <span className="text-xs text-black font-medium">
                          Stage {candidate.currentStage}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full -translate-y-8 translate-x-8 opacity-20 group-hover/candidate:opacity-30 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </CardContent>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full -translate-y-12 translate-x-12 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications Over Time Chart */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-black">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                Applications Over Time
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <CustomBarChart 
                data={chartData.applicationsOverTime} 
                title="Monthly Applications" 
                color="bg-gradient-to-r from-orange-500 to-blue-500"
              />
            </CardContent>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-12 translate-x-12 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
          </Card>
        </div>

        {/* Job Status Distribution */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-black">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                Job Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <CustomPieChart 
                data={chartData.jobStatusDistribution} 
                title="Job Status Breakdown"
              />
            </CardContent>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -translate-y-12 translate-x-12 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
          </Card>
        </div>
      </div>

      {/* Additional Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidate Stages */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-yellow-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-black">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                Candidate Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <CustomBarChart 
                data={chartData.candidateStages} 
                title="Candidates by Stage" 
                color="bg-gradient-to-r from-green-500 to-yellow-500"
              />
            </CardContent>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full -translate-y-12 translate-x-12 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
          </Card>
        </div>

        {/* Hiring Trends */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-black">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <LineChart className="w-6 h-6 text-white" />
                </div>
                Weekly Hiring Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <CustomLineChart 
                data={chartData.hiringTrends} 
                title="Applications & Interviews"
              />
            </CardContent>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full -translate-y-12 translate-x-12 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
          </Card>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-black">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/jobs/new" 
                className="group/action flex items-center gap-4 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:rotate-1 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-500/10 rounded-2xl"></div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover/action:scale-110 group-hover/action:rotate-12 transition-all duration-500 shadow-lg">
                  <Briefcase className="w-6 h-6 text-white relative z-10 group-hover/action:animate-pulse" />
                  <img 
                    src={image1} 
                    alt="Job background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-500/30 rounded-2xl"></div>
                </div>
                <div className="flex-1 relative z-10">
                  <h3 className="font-semibold text-black group-hover/action:text-orange-600 transition-colors duration-300">Post New Job</h3>
                  <p className="text-sm text-black/70">Create a new job posting</p>
                </div>
                <ArrowRight className="w-5 h-5 text-orange-600 group-hover/action:translate-x-1 transition-transform duration-300" />
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-8 translate-x-8 opacity-20 group-hover/action:opacity-30 transition-opacity duration-300"></div>
              </Link>
              
              <Link 
                to="/candidates/new" 
                className="group/action flex items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:rotate-1 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-2xl"></div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover/action:scale-110 group-hover/action:rotate-12 transition-all duration-500 shadow-lg">
                  <Users className="w-6 h-6 text-white relative z-10 group-hover/action:animate-pulse" />
                  <img 
                    src={image2} 
                    alt="Candidate background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-500/30 rounded-2xl"></div>
                </div>
                <div className="flex-1 relative z-10">
                  <h3 className="font-semibold text-black group-hover/action:text-green-600 transition-colors duration-300">Add Candidate</h3>
                  <p className="text-sm text-black/70">Manually add a candidate</p>
                </div>
                <ArrowRight className="w-5 h-5 text-green-600 group-hover/action:translate-x-1 transition-transform duration-300" />
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full -translate-y-8 translate-x-8 opacity-20 group-hover/action:opacity-30 transition-opacity duration-300"></div>
              </Link>
              
              <Link 
                to="/assessments/new" 
                className="group/action flex items-center gap-4 p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:rotate-1 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-500/10 rounded-2xl"></div>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover/action:scale-110 group-hover/action:rotate-12 transition-all duration-500 shadow-lg">
                  <ClipboardList className="w-6 h-6 text-white relative z-10 group-hover/action:animate-pulse" />
                  <img 
                    src={image3} 
                    alt="Assessment background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-500/30 rounded-2xl"></div>
                </div>
                <div className="flex-1 relative z-10">
                  <h3 className="font-semibold text-black group-hover/action:text-yellow-600 transition-colors duration-300">Create Assessment</h3>
                  <p className="text-sm text-black/70">Design a new assessment</p>
                </div>
                <ArrowRight className="w-5 h-5 text-yellow-600 group-hover/action:translate-x-1 transition-transform duration-300" />
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full -translate-y-8 translate-x-8 opacity-20 group-hover/action:opacity-30 transition-opacity duration-300"></div>
              </Link>
            </div>
          </CardContent>
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-12 -translate-x-12 opacity-10"></div>
        </Card>
      </div>
      </div>
    </div>
  );
}
