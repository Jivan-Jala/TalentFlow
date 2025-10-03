import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  Lock,
  Key,
  Users,
  Briefcase,
  BarChart3,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Edit,
  Plus,
  X,
  ChevronRight,
  Sun,
  Moon,
  Monitor,
  Zap,
  Target,
  Award,
  Activity,
  TrendingUp,
  Star,
  Heart,
  MessageCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input, Label, Textarea, Select } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';

// Import images for enhanced design
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpeg';
import image7 from '../images/image7.jpeg';
import image8 from '../images/image8.jpg';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/ui/Toast';

export function Settings() {
  const { success, error } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Profile settings
  const [profile, setProfile] = useState({
    name: 'HR Team',
    email: 'admin@talentflow.com',
    phone: '+1 (555) 123-4567',
    role: 'HR Manager',
    department: 'Human Resources',
    location: 'San Francisco, CA',
    bio: 'Experienced HR professional with expertise in talent acquisition and employee management.',
    avatar: null
  });

  // Company settings
  const [company, setCompany] = useState({
    name: 'TalentFlow Inc.',
    website: 'https://talentflow.com',
    industry: 'Technology',
    size: '50-200 employees',
    founded: '2020',
    description: 'Leading HR technology company focused on streamlining the hiring process.',
    logo: null
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: {
      newApplications: true,
      interviewScheduled: true,
      candidateUpdates: true,
      systemAlerts: true,
      weeklyReports: false
    },
    push: {
      urgentAlerts: true,
      newMessages: true,
      deadlineReminders: true
    },
    sms: {
      criticalAlerts: true,
      interviewReminders: false
    }
  });

  // Security settings
  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAlerts: true,
    ipWhitelist: false,
    allowedIPs: []
  });

  // Theme settings
  const [theme, setTheme] = useState({
    mode: 'light',
    primaryColor: 'orange',
    accentColor: 'blue',
    fontSize: 'medium',
    compactMode: false
  });

  // Data settings
  const [dataSettings, setDataSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: 365,
    exportFormat: 'csv',
    dataSharing: false
  });

  // Form handlers
  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleCompanyChange = (field, value) => {
    setCompany(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (category, setting, value) => {
    setNotifications(prev => ({
      ...prev,
      [category]: { ...prev[category], [setting]: value }
    }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  };

  const handleThemeChange = (field, value) => {
    setTheme(prev => ({ ...prev, [field]: value }));
  };

  const handleDataChange = (field, value) => {
    setDataSettings(prev => ({ ...prev, [field]: value }));
  };

  // Save handlers
  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Profile updated successfully');
    } catch (err) {
      error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCompany = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Company settings updated successfully');
    } catch (err) {
      error('Failed to update company settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Notification preferences updated successfully');
    } catch (err) {
      error('Failed to update notification settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSecurity = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Security settings updated successfully');
    } catch (err) {
      error('Failed to update security settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTheme = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Theme settings updated successfully');
    } catch (err) {
      error('Failed to update theme settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Data settings updated successfully');
    } catch (err) {
      error('Failed to update data settings');
    } finally {
      setIsLoading(false);
    }
  };

  // Export data
  const handleExportData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      success('Data exported successfully');
      setShowExportModal(false);
    } catch (err) {
      error('Failed to export data');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      success('Account deleted successfully');
      setShowDeleteModal(false);
    } catch (err) {
      error('Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'company', label: 'Company', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'data', label: 'Data', icon: Database }
  ];

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
                    <SettingsIcon className={`text-white relative z-10 ${isMobile ? 'w-6 h-6' : 'w-8 h-8'} ${isMobile ? '' : 'group-hover:animate-pulse'}`} />
                    <img 
                      src={image1} 
                      alt="Settings background" 
                      className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl"></div>
                  </div>
                  <div>
                    <h1 className={`font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent ${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl lg:text-5xl'}`}>
                      Settings & Preferences
                    </h1>
                    <p className={`text-black/70 font-medium ${isMobile ? 'text-sm' : 'text-lg'}`}>
                      {isMobile ? 'Customize your experience' : 'Customize your TalentFlow experience'}
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Stats - Mobile Optimized */}
                <div className={`grid gap-2 ${isMobile ? 'grid-cols-2' : 'flex flex-wrap gap-4'}`}>
                  <div className={`flex items-center gap-1 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg ${isMobile ? 'px-2 py-1' : 'px-4 py-2 rounded-xl'}`}>
                    <SettingsIcon className="w-3 h-3 text-orange-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-orange-800 truncate">System Config</span>
                  </div>
                  <div className={`flex items-center gap-1 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg ${isMobile ? 'px-2 py-1' : 'px-4 py-2 rounded-xl'}`}>
                    <Shield className="w-3 h-3 text-blue-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-blue-800 truncate">Security</span>
                  </div>
                  <div className={`flex items-center gap-1 bg-gradient-to-r from-green-100 to-green-200 rounded-lg ${isMobile ? 'px-2 py-1' : 'px-4 py-2 rounded-xl'}`}>
                    <Palette className="w-3 h-3 text-green-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-green-800 truncate">Customize</span>
                  </div>
                  <div className={`flex items-center gap-1 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg ${isMobile ? 'px-2 py-1' : 'px-4 py-2 rounded-xl'}`}>
                    <Database className="w-3 h-3 text-purple-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-purple-800 truncate">Data</span>
                  </div>
                </div>
              </div>
              
              <div className={`flex gap-3 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                <Button className={`bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-3 ${isMobile ? 'px-3 py-2 text-sm' : 'px-6 py-3 text-lg'}`}>
                  <Save className="w-4 h-4" />
                  {isMobile ? 'Save All' : 'Save All'}
                </Button>
                <Button className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-3 ${isMobile ? 'px-3 py-2 text-sm' : 'px-6 py-3 text-lg'}`}>
                  <RefreshCw className="w-4 h-4" />
                  {isMobile ? 'Reset' : 'Reset'}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-12 translate-x-12 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-8 -translate-x-8 opacity-20"></div>
        </div>

        {/* Enhanced Settings Navigation */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <Card className={`relative group border-0 shadow-lg bg-white/90 backdrop-blur-sm ${isMobile ? 'hover:shadow-lg transition-shadow duration-300' : 'hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'}`}>
            <CardHeader className="relative z-10">
              <CardTitle className={`flex items-center gap-3 font-bold text-black ${isMobile ? 'text-lg' : 'text-xl'}`}>
                <div className={`bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
                  <SettingsIcon className={`text-white ${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`} />
                </div>
                Settings Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className={`flex gap-2 ${isMobile ? 'flex-wrap' : 'flex-wrap gap-3'}`}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 rounded-lg font-medium transition-colors ${isMobile ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-sm'} ${
                      activeTab === tab.id
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'text-black hover:bg-orange-50'
                    }`}
                  >
                    <Icon className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    {isMobile ? tab.label.split(' ')[0] : tab.label}
                  </button>
                );
              })}
            </div>
          </CardContent>
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-12 translate-x-12 opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
        </Card>
      </div>

        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center relative overflow-hidden">
                    <User className="w-10 h-10 text-orange-600 relative z-10" />
                    <img 
                      src={image1} 
                      alt="Profile" 
                      className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-full"
                    />
                  </div>
                  <div>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Change Avatar
                    </Button>
                    <p className="text-sm text-black mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>

                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Job Title</Label>
                    <Input
                      id="role"
                      value={profile.role}
                      onChange={(e) => handleProfileChange('role', e.target.value)}
                    />
                  </div>
                </div>

                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profile.department}
                      onChange={(e) => handleProfileChange('department', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <Button variant="secondary">Cancel</Button>
                  <Button onClick={handleSaveProfile} disabled={isLoading} className="gap-2">
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Company Settings */}
        {activeTab === 'company' && (
          <div className="space-y-6">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-orange-600" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <Building className="w-10 h-10 text-orange-600 relative z-10" />
                    <img 
                      src={image2} 
                      alt="Company" 
                      className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg"
                    />
                  </div>
                  <div>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Change Logo
                    </Button>
                    <p className="text-sm text-black mt-1">SVG, PNG up to 5MB</p>
                  </div>
                </div>

                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={company.name}
                      onChange={(e) => handleCompanyChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={company.website}
                      onChange={(e) => handleCompanyChange('website', e.target.value)}
                    />
                  </div>
                </div>

                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      id="industry"
                      value={company.industry}
                      onChange={(e) => handleCompanyChange('industry', e.target.value)}
                    >
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="size">Company Size</Label>
                    <Select
                      id="size"
                      value={company.size}
                      onChange={(e) => handleCompanyChange('size', e.target.value)}
                    >
                      <option value="1-10 employees">1-10 employees</option>
                      <option value="11-50 employees">11-50 employees</option>
                      <option value="51-200 employees">51-200 employees</option>
                      <option value="201-1000 employees">201-1000 employees</option>
                      <option value="1000+ employees">1000+ employees</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    value={company.description}
                    onChange={(e) => handleCompanyChange('description', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <Button variant="secondary">Cancel</Button>
                  <Button onClick={handleSaveCompany} disabled={isLoading} className="gap-2">
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Company
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-600" />
                  Email Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notifications.email).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-black">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <p className="text-sm text-black">
                        {key === 'newApplications' && 'Get notified when new candidates apply'}
                        {key === 'interviewScheduled' && 'Receive alerts for scheduled interviews'}
                        {key === 'candidateUpdates' && 'Updates on candidate status changes'}
                        {key === 'systemAlerts' && 'Important system notifications'}
                        {key === 'weeklyReports' && 'Weekly hiring performance reports'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleNotificationChange('email', key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-600" />
                  Push Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notifications.push).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-black">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <p className="text-sm text-black">
                        {key === 'urgentAlerts' && 'Critical system alerts'}
                        {key === 'newMessages' && 'New messages and comments'}
                        {key === 'deadlineReminders' && 'Upcoming deadline reminders'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleNotificationChange('push', key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-end">
              <Button variant="secondary">Reset to Default</Button>
              <Button onClick={handleSaveNotifications} disabled={isLoading} className="gap-2">
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Notifications
              </Button>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-black">Two-Factor Authentication</h4>
                      <p className="text-sm text-black">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={security.twoFactorAuth}
                        onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>

                  <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                    <div>
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={security.sessionTimeout}
                        onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                      <Input
                        id="passwordExpiry"
                        type="number"
                        value={security.passwordExpiry}
                        onChange={(e) => handleSecurityChange('passwordExpiry', parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-black">Login Alerts</h4>
                      <p className="text-sm text-black">Get notified of new login attempts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={security.loginAlerts}
                        onChange={(e) => handleSecurityChange('loginAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <Button variant="secondary">Change Password</Button>
                  <Button onClick={handleSaveSecurity} disabled={isLoading} className="gap-2">
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Security
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Theme Settings */}
        {activeTab === 'theme' && (
          <div className="space-y-6">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-orange-600" />
                  Theme & Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  <div>
                    <Label>Theme Mode</Label>
                    <div className={`flex gap-2 mt-2 ${isMobile ? 'flex-wrap' : ''}`}>
                      {[
                        { value: 'light', label: 'Light', icon: Sun },
                        { value: 'dark', label: 'Dark', icon: Moon },
                        { value: 'auto', label: 'Auto', icon: Monitor }
                      ].map((mode) => {
                        const Icon = mode.icon;
                        return (
                          <button
                            key={mode.value}
                            onClick={() => handleThemeChange('mode', mode.value)}
                            className={`flex items-center gap-2 rounded-lg border transition-colors ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'} ${
                              theme.mode === mode.value
                                ? 'bg-orange-100 border-orange-200 text-orange-700'
                                : 'border-gray-200 text-black hover:bg-gray-50'
                            }`}
                          >
                            <Icon className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                            {mode.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <Label>Primary Color</Label>
                    <div className={`flex gap-2 mt-2 ${isMobile ? 'flex-wrap' : ''}`}>
                      {[
                        { value: 'orange', color: 'bg-orange-500' },
                        { value: 'blue', color: 'bg-blue-500' },
                        { value: 'green', color: 'bg-green-500' },
                        { value: 'purple', color: 'bg-purple-500' }
                      ].map((color) => (
                        <button
                          key={color.value}
                          onClick={() => handleThemeChange('primaryColor', color.value)}
                          className={`rounded-full border-2 ${color.color} ${isMobile ? 'w-6 h-6' : 'w-8 h-8'} ${
                            theme.primaryColor === color.value ? 'border-black' : 'border-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  <div>
                    <Label>Font Size</Label>
                    <Select
                      value={theme.fontSize}
                      onChange={(e) => handleThemeChange('fontSize', e.target.value)}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-black">Compact Mode</h4>
                      <p className="text-sm text-black">Reduce spacing for more content</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={theme.compactMode}
                        onChange={(e) => handleThemeChange('compactMode', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <Button variant="secondary">Reset Theme</Button>
                  <Button onClick={handleSaveTheme} disabled={isLoading} className="gap-2">
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Theme
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Data Settings */}
        {activeTab === 'data' && (
          <div className="space-y-6">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-orange-600" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-black">Auto Backup</h4>
                      <p className="text-sm text-black">Automatically backup your data</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dataSettings.autoBackup}
                        onChange={(e) => handleDataChange('autoBackup', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                    </label>
                  </div>

                  <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                    <div>
                      <Label htmlFor="backupFrequency">Backup Frequency</Label>
                      <Select
                        id="backupFrequency"
                        value={dataSettings.backupFrequency}
                        onChange={(e) => handleDataChange('backupFrequency', e.target.value)}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="retentionPeriod">Retention Period (days)</Label>
                      <Input
                        id="retentionPeriod"
                        type="number"
                        value={dataSettings.retentionPeriod}
                        onChange={(e) => handleDataChange('retentionPeriod', parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                    <div>
                      <Label htmlFor="exportFormat">Export Format</Label>
                      <Select
                        id="exportFormat"
                        value={dataSettings.exportFormat}
                        onChange={(e) => handleDataChange('exportFormat', e.target.value)}
                      >
                        <option value="csv">CSV</option>
                        <option value="json">JSON</option>
                        <option value="xlsx">Excel</option>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-black">Data Sharing</h4>
                        <p className="text-sm text-black">Allow anonymous usage data</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={dataSettings.dataSharing}
                          onChange={(e) => handleDataChange('dataSharing', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <Button variant="secondary" onClick={() => setShowExportModal(true)} className="gap-2">
                    <Download className="w-4 h-4" />
                    Export Data
                  </Button>
                  <Button onClick={handleSaveData} disabled={isLoading} className="gap-2">
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                  <p className="text-sm text-red-700 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button 
                    variant="warning" 
                    onClick={() => setShowDeleteModal(true)}
                    className="gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Export Modal */}
        <Modal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          title="Export Data"
        >
          <div className="space-y-4">
            <p className="text-black">
              Choose what data you'd like to export from your TalentFlow account.
            </p>
            <div className="space-y-3">
              {[
                { id: 'jobs', label: 'Job Postings', description: 'All job postings and their details' },
                { id: 'candidates', label: 'Candidates', description: 'All candidate information and applications' },
                { id: 'assessments', label: 'Assessments', description: 'Assessment questions and responses' },
                { id: 'notes', label: 'Notes', description: 'All candidate notes and comments' }
              ].map((option) => (
                <label key={option.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" className="mt-1" defaultChecked />
                  <div>
                    <h4 className="font-medium text-black">{option.label}</h4>
                    <p className="text-sm text-black">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setShowExportModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleExportData} disabled={isLoading} className="gap-2">
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                Export Data
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Account Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Account"
        >
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h4 className="font-medium text-red-800">Warning</h4>
              </div>
              <p className="text-sm text-red-700">
                This action will permanently delete your account and all associated data. 
                This cannot be undone.
              </p>
            </div>
            <div>
              <Label htmlFor="confirmDelete">Type "DELETE" to confirm</Label>
              <Input
                id="confirmDelete"
                placeholder="DELETE"
                className="mt-1"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="warning" 
                onClick={handleDeleteAccount} 
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Delete Account
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
