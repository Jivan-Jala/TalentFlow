import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Archive,
  ArchiveRestore,
  Eye,
  MapPin,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  Tag,
  Calendar,
  Building,
  Briefcase,
  Star,
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Label, Textarea, Select } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { JobModal } from '../components/JobModal';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/ui/Toast';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpeg';
import image7 from '../images/image7.jpeg';
import image8 from '../images/image8.jpg';

export function JobsEnhanced() {
  const navigate = useNavigate();
  const { jobs, jobsPagination, jobsFilters, dispatch, ActionTypes } = useApp();
  const { success, error } = useToast();
  
  // Provide default values to prevent undefined errors
  const safeJobsFilters = jobsFilters || {
    search: '',
    status: 'all',
    tags: [],
    sortBy: 'order',
    sortOrder: 'asc'
  };
  
  const safeJobsPagination = jobsPagination || {
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0
  };
  
  const [showFilters, setShowFilters] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    salary: '',
    tags: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Get all unique tags from jobs
  const allTags = useMemo(() => {
    const tags = new Set();
    jobs.forEach(job => {
      job.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [jobs]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = !safeJobsFilters.search || 
        job.title.toLowerCase().includes(safeJobsFilters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(safeJobsFilters.search.toLowerCase());
      
      const matchesStatus = safeJobsFilters.status === 'all' || job.status === safeJobsFilters.status;
      
      const matchesTags = safeJobsFilters.tags.length === 0 || 
        safeJobsFilters.tags.some(tag => job.tags?.includes(tag));
      
      return matchesSearch && matchesStatus && matchesTags;
    });

    // Sort jobs
    filtered.sort((a, b) => {
      const aValue = a[safeJobsFilters.sortBy];
      const bValue = b[safeJobsFilters.sortBy];
      
      if (safeJobsFilters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [jobs, safeJobsFilters]);

  // Paginate jobs
  const paginatedJobs = useMemo(() => {
    const start = (safeJobsPagination.page - 1) * safeJobsPagination.limit;
    const end = start + safeJobsPagination.limit;
    return filteredJobs.slice(start, end);
  }, [filteredJobs, safeJobsPagination]);

  // Update pagination when filters change
  useEffect(() => {
    const total = filteredJobs.length;
    const totalPages = Math.ceil(total / safeJobsPagination.limit);
    
    dispatch({
      type: ActionTypes.SET_JOBS_PAGINATION,
      payload: {
        total,
        totalPages,
        page: 1 // Reset to first page when filters change
      }
    });
  }, [filteredJobs, safeJobsPagination.limit, dispatch, ActionTypes]);

  const handleSearch = (value) => {
    dispatch({
      type: ActionTypes.SET_JOBS_FILTERS,
      payload: { search: value }
    });
  };

  const handleStatusFilter = (status) => {
    dispatch({
      type: ActionTypes.SET_JOBS_FILTERS,
      payload: { status }
    });
  };

  const handleTagFilter = (tag) => {
    const newTags = safeJobsFilters.tags.includes(tag)
      ? safeJobsFilters.tags.filter(t => t !== tag)
      : [...safeJobsFilters.tags, tag];
    
    dispatch({
      type: ActionTypes.SET_JOBS_FILTERS,
      payload: { tags: newTags }
    });
  };

  const handleSort = (sortBy) => {
    const sortOrder = safeJobsFilters.sortBy === sortBy && safeJobsFilters.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch({
      type: ActionTypes.SET_JOBS_FILTERS,
      payload: { sortBy, sortOrder }
    });
  };

  const handlePageChange = (page) => {
    dispatch({
      type: ActionTypes.SET_JOBS_PAGINATION,
      payload: { page }
    });
  };

  const handleDragEnd = (result) => {
    setIsDragging(false);
    
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    if (source.index === destination.index) return;
    
    // Optimistic update
    const newJobs = Array.from(filteredJobs);
    const [reorderedJob] = newJobs.splice(source.index, 1);
    newJobs.splice(destination.index, 0, reorderedJob);
    
    // Update order values
    const updatedJobs = newJobs.map((job, index) => ({
      ...job,
      order: index
    }));
    
    // Simulate API call with rollback on failure
    try {
      dispatch({
        type: ActionTypes.REORDER_JOBS,
        payload: updatedJobs
      });
      success('Jobs reordered successfully');
    } catch (err) {
      error('Failed to reorder jobs');
      // Rollback would happen here in a real app
    }
  };

  const handleArchiveJob = (jobId) => {
    dispatch({ type: ActionTypes.ARCHIVE_JOB, payload: { id: jobId } });
    success('Job archived successfully');
    setShowArchiveModal(false);
    setSelectedJob(null);
  };

  const handleUnarchiveJob = (jobId) => {
    dispatch({ type: ActionTypes.UNARCHIVE_JOB, payload: { id: jobId } });
    success('Job unarchived successfully');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewJobForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateNewJobForm = () => {
    const newErrors = {};
    
    if (!newJobForm.title.trim()) newErrors.title = 'Job title is required';
    if (!newJobForm.company.trim()) newErrors.company = 'Company name is required';
    if (!newJobForm.location.trim()) newErrors.location = 'Location is required';
    if (!newJobForm.description.trim()) newErrors.description = 'Job description is required';
    if (!newJobForm.requirements.trim()) newErrors.requirements = 'Requirements are required';
    if (!newJobForm.salary.trim()) newErrors.salary = 'Salary range is required';
    
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    
    if (!validateNewJobForm()) {
      error('Please fix the errors below');
      return;
    }

    const jobData = {
      title: newJobForm.title,
      company: newJobForm.company,
      location: newJobForm.location,
      type: newJobForm.type,
      description: newJobForm.description,
      requirements: newJobForm.requirements.split('\n').filter(req => req.trim()),
      salary: newJobForm.salary,
      tags: newJobForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: 'active',
      postedDate: new Date().toISOString().split('T')[0],
      applicants: 0,
      order: jobs.length
    };

    dispatch({ type: ActionTypes.ADD_JOB, payload: jobData });
    success('Job created successfully');
    
    // Reset form
    setNewJobForm({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: '',
      salary: '',
      tags: ''
    });
    setFormErrors({});
    setShowNewJobForm(false);
  };

  const resetNewJobForm = () => {
    setNewJobForm({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: '',
      salary: '',
      tags: ''
    });
    setFormErrors({});
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'success', text: 'Active' },
      archived: { variant: 'secondary', text: 'Archived' }
    };
    return variants[status] || { variant: 'secondary', text: status };
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6">
      {/* Welcome Section with Images */}
      <div className="bg-white rounded-xl p-6 text-black relative overflow-hidden border border-orange-200">
        {/* Background Image */}
        <img 
          src={image8} 
          alt="Jobs Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-black">Job Management</h1>
            <p className="text-black">Manage your job postings and applications</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-black" />
                <span className="text-sm text-black">{jobs.length} Total Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-black" />
                <span className="text-sm text-black">{jobs.filter(job => job.status === 'active').length} Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-black" />
                <span className="text-sm text-black">{jobs.filter(job => job.status === 'archived').length} Archived</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center relative overflow-hidden">
              <Briefcase className="w-16 h-16 text-orange-600 relative z-10" />
              <img 
                src={image5} 
                alt="Jobs" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">All Jobs</h2>
          <p className="text-black">Filter, sort, and manage your job postings</p>
        </div>
                  <Button
                    onClick={() => setShowNewJobForm(true)}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Post New Job
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
                  placeholder="Search jobs..."
                  value={safeJobsFilters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="flex gap-2">
              <select
                value={safeJobsFilters.status}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
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
            <div className="mt-4 pt-4 border-t border-orange-200 space-y-4">
              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Filter by Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagFilter(tag)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        safeJobsFilters.tags.includes(tag)
                          ? 'bg-orange-100 text-orange-700 border border-orange-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Sort by
                </label>
                <div className="flex gap-2">
                  {[
                    { key: 'title', label: 'Title' },
                    { key: 'company', label: 'Company' },
                    { key: 'postedDate', label: 'Date Posted' },
                    { key: 'applicants', label: 'Applicants' },
                    { key: 'order', label: 'Custom Order' }
                  ].map(option => (
                    <button
                      key={option.key}
                      onClick={() => handleSort(option.key)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        safeJobsFilters.sortBy === option.key
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                      {safeJobsFilters.sortBy === option.key && (
                        <span className="ml-1">
                          {safeJobsFilters.sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Job Form */}
      {showNewJobForm && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-orange-800">Create New Job</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowNewJobForm(false);
                  resetNewJobForm();
                }}
                className="text-orange-600 hover:text-orange-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={newJobForm.title}
                    onChange={handleFormChange}
                    placeholder="e.g. Senior Frontend Developer"
                    className={formErrors.title ? 'border-red-500' : ''}
                  />
                  {formErrors.title && <p className="text-sm text-red-600 mt-1">{formErrors.title}</p>}
                </div>

                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    name="company"
                    value={newJobForm.company}
                    onChange={handleFormChange}
                    placeholder="e.g. TechCorp"
                    className={formErrors.company ? 'border-red-500' : ''}
                  />
                  {formErrors.company && <p className="text-sm text-red-600 mt-1">{formErrors.company}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={newJobForm.location}
                    onChange={handleFormChange}
                    placeholder="e.g. San Francisco, CA"
                    className={formErrors.location ? 'border-red-500' : ''}
                  />
                  {formErrors.location && <p className="text-sm text-red-600 mt-1">{formErrors.location}</p>}
                </div>

                <div>
                  <Label htmlFor="type">Job Type</Label>
                  <Select
                    id="type"
                    name="type"
                    value={newJobForm.type}
                    onChange={handleFormChange}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="salary">Salary Range *</Label>
                <Input
                  id="salary"
                  name="salary"
                  value={newJobForm.salary}
                  onChange={handleFormChange}
                  placeholder="e.g. ₹8,00,000 - ₹12,00,000"
                  className={formErrors.salary ? 'border-red-500' : ''}
                />
                {formErrors.salary && <p className="text-sm text-red-600 mt-1">{formErrors.salary}</p>}
              </div>

              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newJobForm.description}
                  onChange={handleFormChange}
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  rows={4}
                  className={formErrors.description ? 'border-red-500' : ''}
                />
                {formErrors.description && <p className="text-sm text-red-600 mt-1">{formErrors.description}</p>}
              </div>

              <div>
                <Label htmlFor="requirements">Requirements *</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={newJobForm.requirements}
                  onChange={handleFormChange}
                  placeholder="List the key requirements (one per line)..."
                  rows={3}
                  className={formErrors.requirements ? 'border-red-500' : ''}
                />
                <p className="text-sm text-gray-500 mt-1">Enter each requirement on a new line</p>
                {formErrors.requirements && <p className="text-sm text-red-600 mt-1">{formErrors.requirements}</p>}
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={newJobForm.tags}
                  onChange={handleFormChange}
                  placeholder="e.g. React, JavaScript, Remote (comma separated)"
                />
                <p className="text-sm text-gray-500 mt-1">Enter tags separated by commas</p>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowNewJobForm(false);
                    resetNewJobForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Job
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-black">
          Showing {paginatedJobs.length} of {filteredJobs.length} jobs
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-black">Page {safeJobsPagination.page} of {safeJobsPagination.totalPages}</span>
        </div>
      </div>

      {/* Jobs Grid with Drag and Drop */}
      <DragDropContext 
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
      >
        <Droppable droppableId="jobs">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 transition-opacity ${
                snapshot.isDraggingOver ? 'opacity-75' : ''
              }`}
            >
              {paginatedJobs.map((job, index) => {
                const statusInfo = getStatusBadge(job.status);
                return (
                  <Draggable key={job.id} draggableId={job.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`transition-transform ${
                          snapshot.isDragging ? 'rotate-2 scale-105' : ''
                        }`}
                      >
                        <Card className={`hover:shadow-md transition-shadow relative overflow-hidden ${
                          isDragging ? 'opacity-50' : ''
                        }`}>
                          {/* Background Image */}
                          <img 
                            src={[image1, image2, image3, image4, image5, image6][index % 6]} 
                            alt="Job background" 
                            className="absolute inset-0 w-full h-full object-cover opacity-20"
                          />
                          <CardHeader className="relative z-10">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg text-black">{job.title}</CardTitle>
                                <p className="text-sm text-black">{job.company}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
                                <div
                                  {...provided.dragHandleProps}
                                  className="p-2 hover:bg-orange-100 rounded cursor-grab active:cursor-grabbing"
                                >
                                  <MoreVertical className="w-4 h-4 text-orange-400" />
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="relative z-10">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-sm text-black">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-black">
                                <Clock className="w-4 h-4" />
                                {job.type}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-black">
                                <Users className="w-4 h-4" />
                                {job.applicants} applicants
                              </div>
                              
                              {/* Tags */}
                              {job.tags && job.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {job.tags.slice(0, 3).map((tag, tagIndex) => (
                                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {job.tags.length > 3 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{job.tags.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              )}
                              
                              <div className="pt-3 border-t border-orange-200">
                                <p className="text-sm font-medium text-black">{job.salary}</p>
                                <p className="text-xs text-black">Posted {job.postedDate}</p>
                              </div>
                              
                              <div className="flex gap-2 pt-3">
                                <Link to={`/dashboard/jobs/${job.id}`} className="flex-1">
                                  <Button variant="secondary" size="sm" className="w-full gap-2">
                                    <Eye className="w-4 h-4" />
                                    View
                                  </Button>
                                </Link>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => {
                                    setSelectedJob(job);
                                    setShowJobModal(true);
                                  }}
                                  className="gap-2"
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </Button>
                                {job.status === 'active' ? (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="gap-2 text-yellow-600 hover:text-yellow-700"
                                    onClick={() => {
                                      setSelectedJob(job);
                                      setShowArchiveModal(true);
                                    }}
                                  >
                                    <Archive className="w-4 h-4" />
                                    Archive
                                  </Button>
                                ) : (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="gap-2 text-green-600 hover:text-green-700"
                                    onClick={() => handleUnarchiveJob(job.id)}
                                  >
                                    <ArchiveRestore className="w-4 h-4" />
                                    Unarchive
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Pagination */}
      {safeJobsPagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handlePageChange(safeJobsPagination.page - 1)}
              disabled={safeJobsPagination.page === 1}
              className="gap-2"
            >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: safeJobsPagination.totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={page === safeJobsPagination.page ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(safeJobsPagination.page + 1)}
            disabled={safeJobsPagination.page === safeJobsPagination.totalPages}
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-black mb-2">No jobs found</h3>
            <p className="text-black mb-4">
              {safeJobsFilters.search || safeJobsFilters.status !== 'all' || safeJobsFilters.tags.length > 0
                ? 'Try adjusting your search or filters'
                : 'Get started by posting your first job'
              }
            </p>
            <Button onClick={() => {
              setSelectedJob(null);
              setShowJobModal(true);
            }}>
              Post New Job
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Archive Confirmation Modal */}
      <Modal
        isOpen={showArchiveModal}
        onClose={() => {
          setShowArchiveModal(false);
          setSelectedJob(null);
        }}
        title="Archive Job"
      >
        <div className="space-y-4">
          <p className="text-black">
            Are you sure you want to archive "{selectedJob?.title}"? This will hide it from active job listings.
          </p>
          <div className="flex gap-3 justify-end">
            <Button 
              variant="secondary" 
              onClick={() => {
                setShowArchiveModal(false);
                setSelectedJob(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="warning" 
              onClick={() => handleArchiveJob(selectedJob?.id)}
            >
              Archive Job
            </Button>
          </div>
        </div>
      </Modal>

      {/* Job Modal */}
      <JobModal
        isOpen={showJobModal}
        onClose={() => {
          setShowJobModal(false);
          setSelectedJob(null);
        }}
        job={selectedJob}
      />
      </div>
    </div>
  );
}
