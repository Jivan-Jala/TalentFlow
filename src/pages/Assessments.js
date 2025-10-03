import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Eye,
  Clock,
  ClipboardList,
  Users,
  Briefcase,
  Sparkles,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpeg';
import image7 from '../images/image7.jpeg';
import image8 from '../images/image8.jpg';

export function Assessments() {
  const { assessments, jobs } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Debug logging
  useEffect(() => {
    console.log('Assessments data:', { assessments, jobs });
  }, [assessments, jobs]);

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

  // Mouse and touch tracking for parallax effects
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

    const handleTouchMove = (e) => {
      if (containerRef.current && e.touches.length > 0) {
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        setMousePosition({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [isMobile]);

  const filteredAssessments = (assessments || []).filter(assessment => {
    const job = (jobs || []).find(j => j.id === assessment.jobId);
    const matchesSearch = assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (job && job.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesJob = jobFilter === 'all' || assessment.jobId === jobFilter;
    return matchesSearch && matchesJob;
  });

  const getJobTitle = (jobId) => {
    const job = (jobs || []).find(j => j.id === jobId);
    return job ? job.title : 'Unknown Job';
  };

  const getQuestionCount = (assessment) => {
    return assessment.questions ? assessment.questions.length : 0;
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
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center relative overflow-hidden group hover:scale-110 transition-all duration-500 shadow-lg">
                    <ClipboardList className="w-8 h-8 text-white relative z-10 group-hover:animate-pulse" />
                    <img 
                      src={image1} 
                      alt="Assessments background" 
                      className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl"></div>
                  </div>
                  <div>
                    <h1 className={`font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent ${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl lg:text-5xl'}`}>
                      Assessment Management
                    </h1>
                    <p className={`text-black/70 font-medium ${isMobile ? 'text-xs' : 'text-lg'}`}>
                      {isMobile ? 'Create and manage assessments' : 'Create and manage job-specific assessments'}
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Stats - Mobile Optimized */}
                <div className={`grid gap-2 ${isMobile ? 'grid-cols-2' : 'flex flex-wrap gap-4'}`}>
                  <div className={`flex items-center gap-1 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg ${isMobile ? 'px-2 py-1' : 'px-3 py-2'}`}>
                    <ClipboardList className="w-3 h-3 text-orange-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-orange-800 truncate">{(assessments || []).length} Assessments</span>
                  </div>
                  <div className={`flex items-center gap-1 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg ${isMobile ? 'px-2 py-1' : 'px-3 py-2'}`}>
                    <Briefcase className="w-3 h-3 text-blue-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-blue-800 truncate">{(jobs || []).length} Jobs</span>
                  </div>
                  <div className={`flex items-center gap-1 bg-gradient-to-r from-green-100 to-green-200 rounded-lg ${isMobile ? 'px-2 py-1' : 'px-3 py-2'}`}>
                    <Users className="w-3 h-3 text-green-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-green-800 truncate">Active</span>
                  </div>
                  <div className={`flex items-center gap-1 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg ${isMobile ? 'px-2 py-1' : 'px-3 py-2'}`}>
                    <Target className="w-3 h-3 text-purple-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-purple-800 truncate">{(assessments || []).reduce((sum, a) => sum + getQuestionCount(a), 0)} Qs</span>
                  </div>
                </div>
              </div>
              
              <Link to="/assessments/new">
                <Button className={`bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1 gap-3 ${isMobile ? 'px-4 py-3 text-base' : 'px-8 py-4 text-lg'}`}>
                  <Plus className="w-6 h-6" />
                  Create Assessment
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
                Search & Filter Assessments
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className={`flex flex-col sm:flex-row ${isMobile ? 'gap-4' : 'gap-6'}`}>
                <div className="flex-1">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500 group-hover:text-orange-600 transition-colors duration-300" />
                    <Input
                      placeholder={isMobile ? "Search assessments..." : "Search assessments by title or job..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`pl-12 rounded-2xl border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 hover:shadow-lg ${isMobile ? 'py-2 text-sm' : 'py-4 text-lg'}`}
                    />
                  </div>
                </div>
                <div className={`flex gap-3 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                  <div className="relative flex-1">
                    <select
                      value={jobFilter}
                      onChange={(e) => setJobFilter(e.target.value)}
                      className={`rounded-2xl border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 hover:shadow-lg bg-white font-semibold text-black ${isMobile ? 'px-3 py-2 text-sm w-full' : 'px-6 py-4 text-lg'}`}
                    >
                      <option value="all">All Jobs</option>
                      {(jobs || []).map(job => (
                        <option key={job.id} value={job.id}>{job.title}</option>
                      ))}
                    </select>
                  </div>
                  <Button className={`bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-3 ${isMobile ? 'px-3 py-2 text-sm' : 'px-6 py-4 text-lg'}`}>
                    <Filter className="w-4 h-4" />
                    {isMobile ? 'Filters' : 'Advanced Filters'}
                  </Button>
                </div>
              </div>
            </CardContent>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-12 translate-x-12 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full translate-y-8 -translate-x-8 opacity-10"></div>
          </Card>
        </div>

        {/* Enhanced Assessments Grid */}
        <div className={`space-y-6 ${isMobile ? 'space-y-4' : ''}`}>
          <div className="flex items-center justify-between">
            <h2 className={`font-bold text-black flex items-center gap-3 ${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-white" />
              </div>
              Assessment Library ({filteredAssessments.length})
            </h2>
          </div>
          
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'}`}>
            {filteredAssessments.map((assessment, index) => (
              <div 
                key={assessment.id} 
                className="group relative"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <Card className={`relative group border-0 shadow-lg bg-white/90 backdrop-blur-sm ${isMobile ? 'hover:shadow-lg transition-shadow duration-300' : 'hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'}`}>
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg ${isMobile ? 'transition-transform duration-300' : 'group-hover:scale-110 group-hover:rotate-12 transition-all duration-500'}`}>
                            <ClipboardList className={`w-6 h-6 text-white relative z-10 ${isMobile ? '' : 'group-hover:animate-pulse'}`} />
                            <img 
                              src={[image1, image2, image3, image4, image5, image6][index % 6]} 
                              alt="Assessment background" 
                              className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl"></div>
                          </div>
                          <div>
                            <CardTitle className={`font-bold text-black group-hover:text-orange-600 transition-colors duration-300 ${isMobile ? 'text-sm truncate' : 'text-xl'}`}>{assessment.title}</CardTitle>
                            <p className={`text-black/70 font-semibold ${isMobile ? 'text-xs truncate' : ''}`}>{getJobTitle(assessment.jobId)}</p>
                          </div>
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
                    <div className={`space-y-3 ${isMobile ? 'space-y-2' : 'space-y-4'}`}>
                      <div className={`flex items-center gap-3 text-sm text-black/70 ${isMobile ? 'flex-col items-start gap-2' : 'gap-4'}`}>
                        <div className="flex items-center gap-2">
                          <ClipboardList className="w-4 h-4 text-orange-500" />
                          <span className="font-medium text-xs">{getQuestionCount(assessment)} questions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-xs">{assessment.timeLimit} min</span>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <p className={`font-bold text-black mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Sample Questions:</p>
                        <div className={`space-y-2 ${isMobile ? 'space-y-1' : ''}`}>
                          {assessment.questions.slice(0, isMobile ? 1 : 2).map((question, questionIndex) => (
                            <div key={questionIndex} className={`text-black/70 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 ${isMobile ? 'text-xs p-2' : 'text-sm p-3'}`}>
                              {question.question.length > (isMobile ? 40 : 60) 
                                ? `${question.question.substring(0, isMobile ? 40 : 60)}...` 
                                : question.question
                              }
                            </div>
                          ))}
                          {/* {assessment.questions.length > (isMobile ? 1 : 2) && (
                            <p className="text-xs text-black/70 font-medium">
                              +{assessment.questions.length - (isMobile ? 1 : 2)} more questions
                            </p>
                          )} */}
                        </div>
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <Link to={`/assessments/${assessment.id}`} className="flex-1">
                          <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-2">
                            <Eye className="w-4 h-4" />
                            View Assessment
                          </Button>
                        </Link>
                        <Link to={`/assessments/${assessment.id}/edit`}>
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
            ))}
          </div>
        </div>

        {filteredAssessments.length === 0 && (
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-16 text-center relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <ClipboardList className="w-12 h-12 text-white relative z-10 group-hover:animate-pulse" />
                  <img 
                    src={image8} 
                    alt="Empty state background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-full"></div>
                </div>
                <h3 className={`font-bold text-black mb-4 ${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'}`}>No assessments found</h3>
                <p className={`text-black/70 mb-8 max-w-md mx-auto ${isMobile ? 'text-sm' : 'text-lg'}`}>
                  {searchQuery || jobFilter !== 'all' 
                    ? 'Try adjusting your search or filters to find the perfect assessments'
                    : 'Get started by creating your first assessment and begin evaluating candidates'
                  }
                </p>
                <Link to="/assessments/new">
                  <Button className={`bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1 gap-3 ${isMobile ? 'px-4 py-3 text-base' : 'px-8 py-4 text-lg'}`}>
                    <Plus className="w-6 h-6" />
                    Create Assessment
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
