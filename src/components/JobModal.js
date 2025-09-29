import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Label, Textarea, Select } from './ui/Input';
import { Modal } from './ui/Modal';
import { useApp } from '../context/AppContext';
import { useToast } from './ui/Toast';

export function JobModal({ isOpen, onClose, job = null }) {
  const { dispatch, ActionTypes, jobs } = useApp();
  const { success, error } = useToast();
  
  const isEdit = Boolean(job);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: [],
    salary: '',
    status: 'active',
    tags: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when modal opens or job changes
  useEffect(() => {
    if (isOpen) {
      if (isEdit && job) {
        setFormData({
          title: job.title || '',
          company: job.company || '',
          location: job.location || '',
          type: job.type || 'Full-time',
          description: job.description || '',
          requirements: job.requirements || [],
          salary: job.salary || '',
          status: job.status || 'active',
          tags: job.tags || []
        });
      } else {
        setFormData({
          title: '',
          company: '',
          location: '',
          type: 'Full-time',
          description: '',
          requirements: [],
          salary: '',
          status: 'active',
          tags: []
        });
      }
      setErrors({});
    }
  }, [isOpen, isEdit, job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({ ...prev, requirements: newRequirements }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleTagChange = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    } else {
      // Check for unique title (excluding current job if editing)
      const existingJob = jobs.find(j => 
        j.title.toLowerCase() === formData.title.toLowerCase() && 
        (!isEdit || j.id !== job.id)
      );
      if (existingJob) {
        newErrors.title = 'A job with this title already exists';
      }
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }
    
    if (formData.requirements.length === 0) {
      newErrors.requirements = 'At least one requirement is needed';
    } else {
      // Validate individual requirements
      formData.requirements.forEach((req, index) => {
        if (!req.trim()) {
          newErrors[`requirement_${index}`] = 'Requirement cannot be empty';
        }
      });
    }
    
    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary range is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      error('Please fix the errors below');
      return;
    }

    setIsSubmitting(true);

    try {
      const jobData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim()),
        tags: formData.tags.filter(tag => tag.trim()),
        postedDate: job?.postedDate || new Date().toISOString().split('T')[0],
        applicants: job?.applicants || 0,
        order: job?.order || jobs.length
      };

      if (isEdit) {
        dispatch({ type: ActionTypes.UPDATE_JOB, payload: { id: job.id, ...jobData } });
        success('Job updated successfully');
      } else {
        dispatch({ type: ActionTypes.ADD_JOB, payload: jobData });
        success('Job created successfully');
      }
      
      onClose();
    } catch (err) {
      error('Failed to save job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Job' : 'Create New Job'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Developer"
                className={errors.title ? 'border-danger-500' : ''}
              />
              {errors.title && <p className="text-sm text-danger-600 mt-1">{errors.title}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. TechCorp"
                  className={errors.company ? 'border-danger-500' : ''}
                />
                {errors.company && <p className="text-sm text-danger-600 mt-1">{errors.company}</p>}
              </div>
              
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco, CA"
                  className={errors.location ? 'border-danger-500' : ''}
                />
                {errors.location && <p className="text-sm text-danger-600 mt-1">{errors.location}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              
              <div>
                <Label htmlFor="salary">Salary Range *</Label>
                <Input
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. ₹8,00,000 - ₹12,00,000"
                  className={errors.salary ? 'border-danger-500' : ''}
                />
                {errors.salary && <p className="text-sm text-danger-600 mt-1">{errors.salary}</p>}
              </div>
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
                rows={4}
                className={errors.description ? 'border-danger-500' : ''}
              />
              {errors.description && <p className="text-sm text-danger-600 mt-1">{errors.description}</p>}
            </div>

            {/* Requirements */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Requirements *</Label>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addRequirement}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Requirement
                </Button>
              </div>
              
              {formData.requirements.length === 0 && (
                <p className="text-sm text-danger-600 mb-2">At least one requirement is needed</p>
              )}
              
              <div className="space-y-2">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={requirement}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                      placeholder="Enter requirement..."
                      className={errors[`requirement_${index}`] ? 'border-danger-500' : ''}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                      className="text-danger-600 hover:text-danger-700 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Tags</Label>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addTag}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Tag
                </Button>
              </div>
              
              <div className="space-y-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={tag}
                      onChange={(e) => handleTagChange(index, e.target.value)}
                      placeholder="Enter tag..."
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTag(index)}
                      className="text-danger-600 hover:text-danger-700 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
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
        <div className="flex gap-4 justify-end pt-4 border-t border-secondary-200">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : (isEdit ? 'Update Job' : 'Create Job')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
