import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Eye,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Sparkles,
  Target,
  Users,
  Award,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';

// Import images for enhanced design
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpeg';
import image7 from '../images/image7.jpeg';
import image8 from '../images/image8.jpg';

export function Candidates() {
  const { candidates, jobs } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Animation and visibility effects
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mouse tracking for parallax effects
  useEffect(() => {
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
  }, []);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'all' || candidate.currentStage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const getStageInfo = (stage) => {
    const stages = {
      '1': { name: 'Applied', color: 'warning', icon: Clock },
      '2': { name: 'Screening', color: 'primary', icon: AlertCircle },
      '3': { name: 'Interview', color: 'primary', icon: AlertCircle },
      '4': { name: 'Offer', color: 'success', icon: CheckCircle },
      '5': { name: 'Hired', color: 'success', icon: CheckCircle }
    };
    return stages[stage] || { name: 'Unknown', color: 'secondary', icon: User };
  };

  const getJobTitle = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : 'Unknown Job';
  };

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
      
      <div className="relative z-10 space-y-8 p-6">
        {/* Enhanced Header Section */}
        <div className={`bg-white rounded-3xl p-8 text-black relative overflow-hidden border-2 border-orange-200 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center relative overflow-hidden group hover:scale-110 transition-all duration-500 shadow-lg">
                    <Users className="w-8 h-8 text-white relative z-10 group-hover:animate-pulse" />
                    <img 
                      src={image1} 
                      alt="Candidates background" 
                      className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl"></div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                      Candidate Management
                    </h1>
                    <p className="text-lg text-black/70 font-medium">
                      Manage candidate applications and track their progress
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl">
                    <Users className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-semibold text-orange-800">{candidates.length} Total Candidates</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">{candidates.filter(c => c.currentStage === '1').length} Applied</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">{candidates.filter(c => c.currentStage === '5').length} Hired</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-800">{candidates.filter(c => c.currentStage === '3').length} In Interview</span>
                  </div>
                </div>
              </div>
              
              <Link to="/candidates/new">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1 gap-3">
                  <Plus className="w-6 h-6" />
                  Add Candidate
                  <Sparkles className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-12 translate-x-12 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-8 -translate-x-8 opacity-20"></div>
        </div>

        {/* Enhanced Filters Section */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-black">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                Search & Filter Candidates
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500 group-hover:text-orange-600 transition-colors duration-300" />
                    <Input
                      placeholder="Search candidates by name, email, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 py-4 text-lg rounded-2xl border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 hover:shadow-lg"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <select
                      value={stageFilter}
                      onChange={(e) => setStageFilter(e.target.value)}
                      className="px-6 py-4 text-lg rounded-2xl border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 hover:shadow-lg bg-white font-semibold text-black"
                    >
                      <option value="all">All Stages</option>
                      <option value="1">Applied</option>
                      <option value="2">Screening</option>
                      <option value="3">Interview</option>
                      <option value="4">Offer</option>
                      <option value="5">Hired</option>
                    </select>
                  </div>
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-3">
                    <Filter className="w-5 h-5" />
                    Advanced Filters
                  </Button>
                </div>
              </div>
            </CardContent>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-12 translate-x-12 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
          </Card>
        </div>

        {/* Enhanced Candidates Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              Candidate Profiles ({filteredCandidates.length})
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredCandidates.map((candidate, index) => {
              const stageInfo = getStageInfo(candidate.currentStage);
              const StageIcon = stageInfo.icon;
              
              return (
                <div 
                  key={candidate.id} 
                  className="group relative"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                              <User className="w-8 h-8 text-white relative z-10 group-hover:animate-pulse" />
                              <img 
                                src={[image1, image2, image3, image4, image5, image6][index % 6]} 
                                alt="Candidate background" 
                                className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl"></div>
                            </div>
                            <div>
                              <CardTitle className="text-xl font-bold text-black group-hover:text-orange-600 transition-colors duration-300">{candidate.name}</CardTitle>
                              <p className="text-black/70 font-semibold">{candidate.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={stageInfo.color} 
                              className="text-sm font-semibold px-3 py-1 rounded-xl"
                            >
                              {stageInfo.name}
                            </Badge>
                          </div>
                        </div>
                        <div className="relative">
                          <Button variant="ghost" size="sm" className="p-2 hover:bg-orange-100 transition-colors duration-300">
                            <MoreVertical className="w-5 h-5 text-black/70" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-black/70">
                          <Phone className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{candidate.phone}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-black/70">
                          <Briefcase className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{candidate.experience} experience</span>
                        </div>
                        
                        <div className="pt-2">
                          <p className="text-sm font-bold text-black mb-1">Applied for:</p>
                          <p className="text-sm text-black/70 font-medium">
                            {getJobTitle(candidate.appliedJobs[0])}
                          </p>
                        </div>
                        
                        <div className="pt-2">
                          <p className="text-sm font-bold text-black mb-2">Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.slice(0, 3).map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="text-xs px-2 py-1 rounded-lg bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 font-semibold">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs px-2 py-1 rounded-lg bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-semibold">
                                +{candidate.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 pt-4 border-t border-orange-200">
                          <StageIcon className="w-5 h-5 text-orange-500" />
                          <span className="text-sm text-black/70 font-medium">
                            Stage {candidate.currentStage} of 5
                          </span>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                          <Link to={`/candidates/${candidate.id}`} className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-2">
                              <Eye className="w-4 h-4" />
                              View Profile
                            </Button>
                          </Link>
                          <Link to={`/candidates/${candidate.id}/edit`}>
                            <Button variant="ghost" className="px-4 py-2 text-black hover:bg-orange-100 transition-colors duration-300 rounded-xl gap-2">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                    {/* Background decorative elements */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-8 translate-x-8 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-6 -translate-x-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {filteredCandidates.length === 0 && (
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-16 text-center relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <User className="w-12 h-12 text-white relative z-10 group-hover:animate-pulse" />
                  <img 
                    src={image8} 
                    alt="Empty state background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">No candidates found</h3>
                <p className="text-lg text-black/70 mb-8 max-w-md mx-auto">
                  {searchQuery || stageFilter !== 'all' 
                    ? 'Try adjusting your search or filters to find the perfect candidates'
                    : 'Get started by adding your first candidate and begin building your team'
                  }
                </p>
                <Link to="/candidates/new">
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1 gap-3">
                    <Plus className="w-6 h-6" />
                    Add Candidate
                    <Sparkles className="w-5 h-5" />
                  </Button>
                </Link>
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-12 translate-x-12 opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-8 -translate-x-8 opacity-20"></div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
