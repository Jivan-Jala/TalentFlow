import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Eye,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
  Tag,
  FileText,
  ExternalLink,
  Star,
  Award,
  Target,
  TrendingUp,
  Calendar,
  Building,
  Briefcase,
  Activity,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Label, Textarea, Select } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/ui/Toast';
import { generateCandidates } from '../utils/generateCandidates';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpeg';
import image7 from '../images/image7.jpeg';
import image8 from '../images/image8.jpg';

// Virtualized candidate row component
const CandidateRow = ({ index, style, data }) => {
  const { candidates, jobs, onCandidateClick } = data;
  const candidate = candidates[index];
  const appliedJob = jobs.find(j => j.id === candidate.appliedJobs[0]);

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

  const stageInfo = getStageInfo(candidate.currentStage);
  const StageIcon = stageInfo.icon;

  return (
    <div style={style} className="px-2 py-1">
      <Card 
        className="hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => onCandidateClick(candidate.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <span className="text-sm font-medium text-orange-700 relative z-10">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </span>
                <img 
                  src={[image1, image2, image3, image4, image5, image6, image7, image8][index % 8]} 
                  alt="Candidate background" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-full"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-black truncate">{candidate.name}</h3>
                  <Badge variant={stageInfo.color} className="text-xs">
                    {stageInfo.name}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-black">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{candidate.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{candidate.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{candidate.experience}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-black">
                    Applied for: {appliedJob?.title || 'Unknown Job'}
                  </span>
                  <div className="flex items-center gap-1">
                    <StageIcon className="w-3 h-3 text-black" />
                    <span className="text-xs text-black">
                      Stage {candidate.currentStage}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex flex-wrap gap-1 max-w-32">
                {candidate.skills.slice(0, 2).map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{candidate.skills.length - 2}
                  </Badge>
                )}
              </div>
              
              <Button variant="ghost" size="sm" className="p-2">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export function CandidatesEnhanced() {
  const navigate = useNavigate();
  const { jobs, dispatch, ActionTypes } = useApp();
  const { success, error } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    skills: '',
    jobId: '',
    stage: '1'
  });
  const [formErrors, setFormErrors] = useState({});

  // Generate candidates on component mount
  useEffect(() => {
    const generateData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const generatedCandidates = generateCandidates(1000);
      setCandidates(generatedCandidates);
      setIsLoading(false);
    };
    
    generateData();
  }, []);

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      const matchesSearch = !searchQuery || 
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStage = stageFilter === 'all' || candidate.currentStage === stageFilter;
      
      const matchesJob = jobFilter === 'all' || candidate.appliedJobs.includes(jobFilter);
      
      return matchesSearch && matchesStage && matchesJob;
    });
  }, [candidates, searchQuery, stageFilter, jobFilter]);

  const handleCandidateClick = useCallback((candidateId) => {
    navigate(`/candidates/${candidateId}`);
  }, [navigate]);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleStageFilter = (stage) => {
    setStageFilter(stage);
  };

  const handleJobFilter = (jobId) => {
    setJobFilter(jobId);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStageFilter('all');
    setJobFilter('all');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCandidateForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!candidateForm.name.trim()) newErrors.name = 'Name is required';
    if (!candidateForm.email.trim()) newErrors.email = 'Email is required';
    if (!candidateForm.phone.trim()) newErrors.phone = 'Phone is required';
    if (!candidateForm.experience.trim()) newErrors.experience = 'Experience is required';
    if (!candidateForm.jobId) newErrors.jobId = 'Please select a job';
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCandidate = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      error('Please fix the errors below');
      return;
    }

    const newCandidate = {
      id: `candidate_${Date.now()}`,
      name: candidateForm.name,
      email: candidateForm.email,
      phone: candidateForm.phone,
      experience: candidateForm.experience,
      skills: candidateForm.skills.split(',').map(s => s.trim()).filter(s => s),
      currentStage: candidateForm.stage,
      appliedJobs: [candidateForm.jobId],
      stages: {
        [candidateForm.stage]: {
          date: new Date().toISOString(),
          notes: 'Manually added candidate'
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to local candidates array
    setCandidates(prev => [newCandidate, ...prev]);
    
    // Reset form
    setCandidateForm({
      name: '',
      email: '',
      phone: '',
      experience: '',
      skills: '',
      jobId: '',
      stage: '1'
    });
    
    setShowCandidateModal(false);
    success('Candidate added successfully');
  };

  const resetForm = () => {
    setCandidateForm({
      name: '',
      email: '',
      phone: '',
      experience: '',
      skills: '',
      jobId: '',
      stage: '1'
    });
    setFormErrors({});
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-black">Loading candidates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6">
        {/* Welcome Section with Images */}
        <div className="bg-white rounded-xl p-6 text-black relative overflow-hidden border border-orange-200">
          {/* Background Image */}
          <img 
            src={image2} 
            alt="Candidates Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-black">Candidate Management</h1>
              <p className="text-black">Manage candidate applications and track progress</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-black" />
                  <span className="text-sm text-black">{candidates.length} Total Candidates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-black" />
                  <span className="text-sm text-black">{candidates.filter(c => c.currentStage === '5').length} Hired</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-black" />
                  <span className="text-sm text-black">{candidates.filter(c => c.currentStage === '1').length} Applied</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center relative overflow-hidden">
                <Users className="w-16 h-16 text-orange-600 relative z-10" />
                <img 
                  src={image6} 
                  alt="Candidates" 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-black">All Candidates</h2>
            <p className="text-black">Filter, search, and manage candidate applications</p>
          </div>
          <Button 
            onClick={() => setShowCandidateModal(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Candidate
          </Button>
        </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search candidates by name or email..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={stageFilter}
                onChange={(e) => handleStageFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Stages</option>
                <option value="1">Applied</option>
                <option value="2">Screening</option>
                <option value="3">Interview</option>
                <option value="4">Offer</option>
                <option value="5">Hired</option>
              </select>
              
              <select
                value={jobFilter}
                onChange={(e) => handleJobFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Jobs</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
              
              <Button 
                variant="secondary" 
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-orange-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-black">
                  Advanced filtering options
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-orange-600"
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-black">
          Showing {filteredCandidates.length} of {candidates.length} candidates
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-black">
            Virtualized list for performance
          </span>
        </div>
      </div>

      {/* Virtualized List */}
      {filteredCandidates.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <List
              height={600}
              itemCount={filteredCandidates.length}
              itemSize={120}
              itemData={{
                candidates: filteredCandidates,
                jobs,
                onCandidateClick: handleCandidateClick
              }}
              className="candidates-list"
            >
              {CandidateRow}
            </List>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-black mb-2">No candidates found</h3>
            <p className="text-black mb-4">
              {searchQuery || stageFilter !== 'all' || jobFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first candidate'
              }
            </p>
            <Button onClick={() => navigate('/candidates/new')}>
              Add Candidate
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { stage: '1', label: 'Applied', count: candidates.filter(c => c.currentStage === '1').length },
          { stage: '2', label: 'Screening', count: candidates.filter(c => c.currentStage === '2').length },
          { stage: '3', label: 'Interview', count: candidates.filter(c => c.currentStage === '3').length },
          { stage: '4', label: 'Offer', count: candidates.filter(c => c.currentStage === '4').length },
          { stage: '5', label: 'Hired', count: candidates.filter(c => c.currentStage === '5').length }
        ].map(stat => (
          <Card key={stat.stage} className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {stat.count}
              </div>
              <div className="text-sm text-black">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Candidate Modal */}
      <Modal
        isOpen={showCandidateModal}
        onClose={() => {
          setShowCandidateModal(false);
          resetForm();
        }}
        title="Add New Candidate"
      >
        <form onSubmit={handleAddCandidate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={candidateForm.name}
                onChange={handleFormChange}
                placeholder="e.g. John Doe"
                className={formErrors.name ? 'border-red-500' : ''}
              />
              {formErrors.name && <p className="text-sm text-red-600 mt-1">{formErrors.name}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={candidateForm.email}
                onChange={handleFormChange}
                placeholder="e.g. john@example.com"
                className={formErrors.email ? 'border-red-500' : ''}
              />
              {formErrors.email && <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                name="phone"
                value={candidateForm.phone}
                onChange={handleFormChange}
                placeholder="e.g. +1 (555) 123-4567"
                className={formErrors.phone ? 'border-red-500' : ''}
              />
              {formErrors.phone && <p className="text-sm text-red-600 mt-1">{formErrors.phone}</p>}
            </div>

            <div>
              <Label htmlFor="experience">Experience *</Label>
              <Input
                id="experience"
                name="experience"
                value={candidateForm.experience}
                onChange={handleFormChange}
                placeholder="e.g. 5 years"
                className={formErrors.experience ? 'border-red-500' : ''}
              />
              {formErrors.experience && <p className="text-sm text-red-600 mt-1">{formErrors.experience}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              name="skills"
              value={candidateForm.skills}
              onChange={handleFormChange}
              placeholder="e.g. React, JavaScript, Node.js (comma separated)"
            />
            <p className="text-sm text-gray-500 mt-1">Enter skills separated by commas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobId">Applied for Job *</Label>
              <Select
                id="jobId"
                name="jobId"
                value={candidateForm.jobId}
                onChange={handleFormChange}
                className={formErrors.jobId ? 'border-red-500' : ''}
              >
                <option value="">Select a job</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </Select>
              {formErrors.jobId && <p className="text-sm text-red-600 mt-1">{formErrors.jobId}</p>}
            </div>

            <div>
              <Label htmlFor="stage">Current Stage</Label>
              <Select
                id="stage"
                name="stage"
                value={candidateForm.stage}
                onChange={handleFormChange}
              >
                <option value="1">Applied</option>
                <option value="2">Screening</option>
                <option value="3">Interview</option>
                <option value="4">Offer</option>
                <option value="5">Hired</option>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowCandidateModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Candidate
            </Button>
          </div>
        </form>
      </Modal>
      </div>
    </div>
  );
}
