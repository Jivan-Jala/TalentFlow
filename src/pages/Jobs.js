import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Archive, 
  Eye,
  MapPin,
  Clock,
  Users,
  Sparkles,
  Target,
  Briefcase,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/ui/Toast';

// Import images for enhanced design
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpeg';
import image7 from '../images/image7.jpeg';
import image8 from '../images/image8.jpg';

export function Jobs() {
  const { jobs, dispatch, ActionTypes } = useApp();
  const { success, error } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
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

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleArchiveJob = (jobId) => {
    dispatch({ type: ActionTypes.ARCHIVE_JOB, payload: { id: jobId } });
    success('Job archived successfully');
    setShowArchiveModal(false);
    setSelectedJob(null);
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'success', text: 'Active' },
      archived: { variant: 'secondary', text: 'Archived' }
    };
    return variants[status] || { variant: 'secondary', text: status };
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
                    <Briefcase className="w-8 h-8 text-white relative z-10 group-hover:animate-pulse" />
                    <img 
                      src={image1} 
                      alt="Jobs background" 
                      className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl"></div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                      Job Management
                    </h1>
                    <p className="text-lg text-black/70 font-medium">
                      Manage your job postings and applications with ease
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-semibold text-orange-800">{jobs.length} Total Jobs</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">{jobs.filter(j => j.status === 'active').length} Active</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">{jobs.reduce((sum, job) => sum + job.applicants, 0)} Total Applicants</span>
                  </div>
                </div>
              </div>
              
              <Link to="/dashboard/jobs/new">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1 gap-3">
                  <Plus className="w-6 h-6" />
                  Post New Job
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
                Search & Filter Jobs
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500 group-hover:text-orange-600 transition-colors duration-300" />
                    <Input
                      placeholder="Search jobs by title, company, or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 py-4 text-lg rounded-2xl border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 hover:shadow-lg"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-6 py-4 text-lg rounded-2xl border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-300 hover:shadow-lg bg-white font-semibold text-black"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active Jobs</option>
                      <option value="archived">Archived Jobs</option>
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

        {/* Enhanced Jobs Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              Available Jobs ({filteredJobs.length})
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredJobs.map((job, index) => {
              const statusInfo = getStatusBadge(job.status);
              return (
                <div 
                  key={job.id} 
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
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                              <Briefcase className="w-6 h-6 text-white relative z-10 group-hover:animate-pulse" />
                              <img 
                                src={[image1, image2, image3, image4, image5, image6][index % 6]} 
                                alt="Job background" 
                                className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl"></div>
                            </div>
                            <div>
                              <CardTitle className="text-xl font-bold text-black group-hover:text-orange-600 transition-colors duration-300">{job.title}</CardTitle>
                              <p className="text-black/70 font-semibold">{job.company}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={statusInfo.variant} 
                              className="text-sm font-semibold px-3 py-1 rounded-xl"
                            >
                              {statusInfo.text}
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
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-black/70">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-black/70">
                          <Users className="w-4 h-4 text-green-500" />
                          <span className="font-medium">{job.applicants} applicants</span>
                        </div>
                        
                        <div className="pt-4 border-t border-orange-200">
                          <p className="text-lg font-bold text-black flex items-center gap-1">
                            <span className="text-orange-600 font-bold">₹</span> {job.salary}
                          </p>
                          <p className="text-sm text-black/70 flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" /> Posted {job.postedDate}
                          </p>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                          <Link to={`/dashboard/jobs/${job.id}`} className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-2">
                              <Eye className="w-4 h-4" />
                              View Details
                            </Button>
                          </Link>
                          <Link to={`/dashboard/jobs/${job.id}/edit`}>
                            <Button variant="ghost" className="px-4 py-2 text-black hover:bg-orange-100 transition-colors duration-300 rounded-xl gap-2">
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                          </Link>
                          {job.status === 'active' && (
                            <Button 
                              variant="ghost" 
                              className="px-4 py-2 text-orange-600 hover:text-orange-700 hover:bg-orange-100 transition-colors duration-300 rounded-xl gap-2"
                              onClick={() => {
                                setSelectedJob(job);
                                setShowArchiveModal(true);
                              }}
                            >
                              <Archive className="w-4 h-4" />
                              Archive
                            </Button>
                          )}
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

        {filteredJobs.length === 0 && (
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <Card className="relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-16 text-center relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <Plus className="w-12 h-12 text-white relative z-10 group-hover:animate-pulse" />
                  <img 
                    src={image8} 
                    alt="Empty state background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">No jobs found</h3>
                <p className="text-lg text-black/70 mb-8 max-w-md mx-auto">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters to find the perfect match'
                    : 'Get started by posting your first job and begin building your team'
                  }
                </p>
                <Link to="/dashboard/jobs/new">
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1 gap-3">
                    <Plus className="w-6 h-6" />
                    Post New Job
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

        {/* Enhanced Archive Confirmation Modal */}
        <Modal
          isOpen={showArchiveModal}
          onClose={() => {
            setShowArchiveModal(false);
            setSelectedJob(null);
          }}
          title="Archive Job"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <Archive className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-black text-lg">{selectedJob?.title}</h3>
                <p className="text-black/70">{selectedJob?.company}</p>
              </div>
            </div>
            
            <p className="text-lg text-black/70">
              Are you sure you want to archive this job? This will hide it from active job listings and move it to the archived section.
            </p>
            
            <div className="flex gap-4 justify-end">
              <Button 
                variant="secondary" 
                onClick={() => {
                  setShowArchiveModal(false);
                  setSelectedJob(null);
                }}
                className="px-6 py-3 text-lg font-semibold rounded-xl"
              >
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-2"
                onClick={() => handleArchiveJob(selectedJob?.id)}
              >
                <Archive className="w-5 h-5" />
                Archive Job
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
