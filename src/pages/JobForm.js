import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Label, Textarea, Select } from '../components/ui/Input';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/ui/Toast';

export function JobForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { jobs, dispatch, ActionTypes } = useApp();
  const { success, error } = useToast();
  
  const isEdit = Boolean(id);
  const existingJob = isEdit ? jobs.find(job => job.id === id) : null;

  const [formData, setFormData] = useState({
    title: existingJob?.title || '',
    company: existingJob?.company || '',
    location: existingJob?.location || '',
    type: existingJob?.type || 'Full-time',
    description: existingJob?.description || '',
    requirements: existingJob?.requirements?.join('\n') || '',
    salary: existingJob?.salary || '',
    status: existingJob?.status || 'active'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.requirements.trim()) newErrors.requirements = 'Requirements are required';
    if (!formData.salary.trim()) newErrors.salary = 'Salary range is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      error('Please fix the errors below');
      return;
    }

    const jobData = {
      ...formData,
      requirements: formData.requirements.split('\n').filter(req => req.trim()),
      postedDate: existingJob?.postedDate || new Date().toISOString().split('T')[0],
      applicants: existingJob?.applicants || 0,
      order: existingJob?.order || jobs.length
    };

    if (isEdit) {
      dispatch({ type: ActionTypes.UPDATE_JOB, payload: { id, ...jobData } });
      success('Job updated successfully');
    } else {
      dispatch({ type: ActionTypes.ADD_JOB, payload: jobData });
      success('Job created successfully');
    }
    
    navigate('/jobs');
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/jobs')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-black">
              {isEdit ? 'Edit Job' : 'Post New Job'}
            </h1>
            <p className="text-black">
              {isEdit ? 'Update job details' : 'Create a new job posting'}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6 pb-6 px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Senior Frontend Developer"
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. TechCorp"
                      className={errors.company ? 'border-red-500' : ''}
                    />
                    {errors.company && <p className="text-sm text-red-600 mt-1">{errors.company}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. San Francisco, CA"
                      className={errors.location ? 'border-red-500' : ''}
                    />
                    {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Job Type</Label>
                    <Select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
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
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g. ₹8,00,000 - ₹12,00,000"
                    className={errors.salary ? 'border-red-500' : ''}
                  />
                  {errors.salary && <p className="text-sm text-red-600 mt-1">{errors.salary}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    rows={6}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                </div>

                <div>
                  <Label htmlFor="requirements">Requirements *</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="List the key requirements (one per line)..."
                    rows={4}
                    className={errors.requirements ? 'border-red-500' : ''}
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter each requirement on a new line</p>
                  {errors.requirements && <p className="text-sm text-red-600 mt-1">{errors.requirements}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Status (only for edit) */}
            {isEdit && (
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="status">Job Status</Label>
                    <Select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="active">Active</option>
                      <option value="archived">Archived</option>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-4 justify-end">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/jobs')}
              >
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                {isEdit ? 'Update Job' : 'Post Job'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
