import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  CheckCircle,
  Users,
  Briefcase,
  BarChart3,
  Shield,
  Zap,
  Star,
  Award,
  TrendingUp,
  Target,
  Clock,
  Globe,
  Heart,
  MessageCircle,
  Play,
  ChevronRight,
  ChevronLeft,
  Quote,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Eye,
  Sparkles,
  Rocket,
  Crown,
  Gem,
  Flame,
  Sun,
  Moon,
  Activity,
  PieChart,
  LineChart,
  Settings,
  Bell,
  Database,
  Palette,
  Lock,
  Key,
  RefreshCw,
  Plus,
  Search,
  Filter,
  Calendar,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  Flag,
  AlertCircle,
  Info,
  HelpCircle,
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
  Download as DownloadIcon,
  Link as LinkIcon,
  Unlink,
  Lock as LockIcon,
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
  Frost as FrostIcon,
  // Enhanced icons for better visual appeal
  Brain,
  Cpu,
  Database as DatabaseIcon,
  Layers as LayersIcon,
  Workflow,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  GitCompare,
  GitBranch as GitBranchIcon,
  GitCommit as GitCommitIcon,
  GitMerge as GitMergeIcon,
  GitPullRequest as GitPullRequestIcon,
  GitCompare as GitCompareIcon,
  Code,
  Code2,
  Terminal,
  Command,
  Keyboard,
  MousePointer,
  MousePointer2,
  Touchpad,
  Touchpad2,
  Gamepad2,
  Joystick,
  Headphones,
  HeadphonesIcon,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Camera,
  CameraOff,
  Webcam,
  WebcamOff,
  Monitor as MonitorIcon,
  MonitorSpeaker,
  MonitorSpeakerOff,
  Tv as TvIcon,
  Tv2,
  Radio as RadioIcon,
  RadioReceiver,
  RadioTransmitter,
  Satellite,
  SatelliteDish,
  Antenna,
  AntennaBars,
  Signal as SignalIcon,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SignalZero as SignalZeroIcon,
  SignalOne as SignalOneIcon,
  SignalTwo as SignalTwoIcon,
  SignalThree as SignalThreeIcon,
  SignalFour as SignalFourIcon,
  SignalFive as SignalFiveIcon,
  Wifi as WifiIcon2,
  WifiOff as WifiOffIcon,
  Bluetooth as BluetoothIcon,
  BluetoothOff as BluetoothOffIcon,
  Nfc,
  NfcOff,
  QrCode,
  QrCodeOff,
  Barcode,
  BarcodeOff,
  Scanner,
  ScannerOff,
  Printer,
  PrinterOff,
  Fax,
  FaxOff,
  Copier,
  CopierOff,
  Scanner as ScannerIcon,
  ScannerOff as ScannerOffIcon,
  Printer as PrinterIcon,
  PrinterOff as PrinterOffIcon,
  Fax as FaxIcon,
  FaxOff as FaxOffIcon,
  Copier as CopierIcon,
  CopierOff as CopierOffIcon
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

export function Home() {
  const { jobs, candidates } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    jobs: 0,
    candidates: 0,
    successRate: 0,
    clients: 0
  });
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
        const targetJobs = jobs?.filter(job => job.status === 'active').length || 0;
        const targetCandidates = candidates?.length || 0;
        const targetSuccessRate = 95;
        const targetClients = 500;

        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          const easeOut = 1 - Math.pow(1 - progress, 3);

          setAnimatedStats({
            jobs: Math.floor(targetJobs * easeOut),
            candidates: Math.floor(targetCandidates * easeOut),
            successRate: Math.floor(targetSuccessRate * easeOut),
            clients: Math.floor(targetClients * easeOut)
          });

          if (currentStep >= steps) {
            clearInterval(timer);
            setAnimatedStats({
              jobs: targetJobs,
              candidates: targetCandidates,
              successRate: targetSuccessRate,
              clients: targetClients
            });
          }
        }, stepDuration);
      };

      const timer = setTimeout(animateStats, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, jobs, candidates]);

  const stats = [
    { label: 'Active Jobs', value: animatedStats.jobs, icon: Briefcase, color: 'from-orange-500 to-orange-600' },
    { label: 'Total Candidates', value: animatedStats.candidates, icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Success Rate', value: `${animatedStats.successRate}%`, icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { label: 'Happy Clients', value: `${animatedStats.clients}+`, icon: Heart, color: 'from-pink-500 to-pink-600' }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning algorithms for smart candidate matching and automated screening processes.',
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      gradient: 'from-blue-500 to-blue-600',
      animation: 'hover:scale-110 hover:rotate-3'
    },
    {
      icon: Workflow,
      title: 'Streamlined Workflows',
      description: 'Automated job posting, candidate tracking, and interview scheduling with intelligent workflow management.',
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      gradient: 'from-green-500 to-green-600',
      animation: 'hover:scale-110 hover:-rotate-3'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time insights and predictive analytics to optimize your hiring process and improve outcomes.',
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      gradient: 'from-purple-500 to-purple-600',
      animation: 'hover:scale-110 hover:rotate-3'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with GDPR compliance, end-to-end encryption, and role-based access control.',
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      gradient: 'from-orange-500 to-orange-600',
      animation: 'hover:scale-110 hover:-rotate-3'
    },
    {
      icon: Zap,
      title: 'Lightning Performance',
      description: 'Optimized for speed with real-time updates, instant search, and seamless multi-device synchronization.',
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      gradient: 'from-yellow-500 to-yellow-600',
      animation: 'hover:scale-110 hover:rotate-3'
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Multi-language support, timezone management, and international compliance for worldwide operations.',
      color: 'text-indigo-600',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      gradient: 'from-indigo-500 to-indigo-600',
      animation: 'hover:scale-110 hover:-rotate-3'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'HR Director',
      company: 'TechCorp',
      content: 'TalentFlow has revolutionized our hiring process. We\'ve reduced time-to-hire by 40% and improved candidate quality significantly.',
      avatar: image1,
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Talent Acquisition Manager',
      company: 'StartupXYZ',
      content: 'The analytics dashboard gives us insights we never had before. We can now make data-driven hiring decisions.',
      avatar: image2,
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'VP of People',
      company: 'InnovateCorp',
      content: 'The candidate experience is seamless, and our team loves the intuitive interface. It\'s been a game-changer.',
      avatar: image3,
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '₹2,900',
      period: '/month',
      description: 'Perfect for small teams',
      features: [
        'Up to 50 job postings',
        '500 candidate profiles',
        'Basic analytics',
        'Email support',
        'Standard templates'
      ],
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Professional',
      price: '₹7,900',
      period: '/month',
      description: 'Ideal for growing companies',
      features: [
        'Unlimited job postings',
        'Unlimited candidates',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
        'API access',
        'Team collaboration'
      ],
      popular: true,
      color: 'border-orange-500'
    },
    {
      name: 'Enterprise',
      price: '₹19,900',
      period: '/month',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security',
        'White-label solution',
        '24/7 phone support',
        'Custom training'
      ],
      popular: false,
      color: 'border-gray-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-transparent to-blue-500/30"></div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${image7})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          ></div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-orange-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-3000"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Badge className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-orange-300 px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Trusted by 500+ Companies
                  </Badge>
                  <div className="flex -space-x-2">
                    <img src={image1} alt="Company 1" className="w-8 h-8 rounded-full border-2 border-white shadow-lg" />
                    <img src={image2} alt="Company 2" className="w-8 h-8 rounded-full border-2 border-white shadow-lg" />
                    <img src={image3} alt="Company 3" className="w-8 h-8 rounded-full border-2 border-white shadow-lg" />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-orange-400 to-blue-400 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      +
                    </div>
                  </div>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-black leading-tight">
                  <span className="block">Streamline Your</span>
                  <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                    Hiring Process
                  </span>
                </h1>
                <p className="text-xl text-black/80 leading-relaxed max-w-2xl">
                  The all-in-one platform for modern HR teams. Manage candidates, track applications, 
                  and make data-driven hiring decisions with ease.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Rocket className="w-5 h-5 mr-2" />
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="secondary" size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-orange-200 hover:border-orange-300 transition-all duration-300">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-black font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-black font-medium">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-black font-medium">Cancel anytime</span>
                </div>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-blue-400 rounded-3xl blur-3xl opacity-30 transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-orange-200">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-black">Dashboard Overview</h3>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-orange-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-5 h-5 text-orange-600" />
                          <span className="text-sm font-medium text-black">Active Jobs</span>
                        </div>
                        <div className="text-2xl font-bold text-black">{stats[0].value}</div>
                        <div className="text-xs text-green-600">+12% this month</div>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-black">Candidates</span>
                        </div>
                        <div className="text-2xl font-bold text-black">{stats[1].value}</div>
                        <div className="text-xs text-green-600">+8% this month</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-black">New application received</div>
                          <div className="text-xs text-black">Senior Frontend Developer</div>
                        </div>
                        <div className="text-xs text-black">2m ago</div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-black">Interview scheduled</div>
                          <div className="text-xs text-black">Sarah Johnson - UX Designer</div>
                        </div>
                        <div className="text-xs text-black">1h ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center group relative"
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-5xl font-bold text-black mb-3 group-hover:text-orange-600 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-black/70 font-semibold text-lg">{stat.label}</div>
                    <div className="mt-4 w-12 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full group-hover:w-20 transition-all duration-300"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent"> Hire Better</span>
            </h2>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              Powerful features designed to streamline your hiring process and help you find the best talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="group relative"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-blue-500/5 rounded-full blur-2xl"></div>
                      <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-3xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg relative z-10`}>
                        <Icon className={`w-8 h-8 ${feature.color} group-hover:animate-pulse`} />
                      </div>
                      <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-orange-600 transition-colors duration-300">{feature.title}</h3>
                      <p className="text-black/70 leading-relaxed text-lg">{feature.description}</p>
                      <div className="mt-6 flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Loved by HR Teams
              <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent"> Worldwide</span>
            </h2>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              See what our customers are saying about TalentFlow.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`group relative transition-all duration-500 ${
                    index === currentSlide ? 'scale-105 z-10' : 'scale-100'
                  }`}
                  style={{
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Card className={`relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border-0 shadow-lg bg-white/90 backdrop-blur-sm ${
                    index === currentSlide ? 'ring-2 ring-orange-500' : ''
                  }`}>
                    <CardContent className="p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-full blur-xl"></div>
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                        ))}
                      </div>
                      <Quote className="w-10 h-10 text-orange-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
                      <p className="text-black/80 mb-8 leading-relaxed text-lg">"{testimonial.content}"</p>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-black text-lg">{testimonial.name}</div>
                          <div className="text-sm text-black/70 font-medium">{testimonial.role} at {testimonial.company}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Simple, Transparent
              <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent"> Pricing</span>
            </h2>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              Choose the plan that fits your team size and needs. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className="group relative"
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <Card className={`relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border-2 ${plan.color} ${plan.popular ? 'ring-2 ring-orange-500' : ''} bg-white/90 backdrop-blur-sm`}>
                  {plan.popular && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-6 py-3 text-sm font-bold shadow-lg animate-pulse">
                        <Crown className="w-5 h-5 mr-2" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/5 to-blue-500/5 rounded-full blur-2xl"></div>
                    <div className="text-center mb-8 relative z-10">
                      <h3 className="text-3xl font-bold text-black mb-3 group-hover:text-orange-600 transition-colors duration-300">{plan.name}</h3>
                      <p className="text-black/70 mb-6 text-lg">{plan.description}</p>
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-6xl font-bold text-black group-hover:text-orange-600 transition-colors duration-300">{plan.price}</span>
                        <span className="text-black/70 ml-2 text-xl">{plan.period}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-5 mb-8 relative z-10">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: `${featureIndex * 100}ms` }}>
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-black/80 text-lg font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full py-4 text-xl font-bold rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl' 
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-black shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {plan.popular ? 'Get Started' : 'Choose Plan'}
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-600/90 to-blue-600/90"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 animate-pulse">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of HR professionals who are already using TalentFlow to streamline their hiring process.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-1">
                  <Rocket className="w-6 h-6 mr-3 animate-bounce" />
                  Start Free Trial
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1">
                <MessageCircle className="w-6 h-6 mr-3" />
                Contact Sales
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-semibold">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-semibold">14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-semibold">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TalentFlow</span>
              </div>
              <p className="text-white/70">
                The modern hiring platform for forward-thinking HR teams.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/jobs" className="hover:text-white transition-colors">Job Management</Link></li>
                <li><Link to="/candidates" className="hover:text-white transition-colors">Candidate Tracking</Link></li>
                <li><Link to="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
                <li><Link to="/assessments" className="hover:text-white transition-colors">Assessments</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70">© 2024 TalentFlow. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-white/70 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
