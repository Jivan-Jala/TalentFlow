import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Label, Textarea, Select } from '../components/ui/Input';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/ui/Toast';

export function AssessmentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { assessments, jobs, dispatch, ActionTypes } = useApp();
  const { success, error } = useToast();
  
  const isEdit = Boolean(id);
  const existingAssessment = isEdit ? assessments.find(assessment => assessment.id === id) : null;

  const [formData, setFormData] = useState({
    title: existingAssessment?.title || '',
    jobId: existingAssessment?.jobId || '',
    timeLimit: existingAssessment?.timeLimit || 30,
    questions: existingAssessment?.questions || [
      { id: '1', question: '', type: 'text', required: true }
    ]
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleQuestionChange = (questionId, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  const addQuestion = () => {
    const newId = (Math.max(...formData.questions.map(q => parseInt(q.id))) + 1).toString();
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { 
        id: newId, 
        question: '', 
        type: 'text', 
        required: true 
      }]
    }));
  };

  const removeQuestion = (questionId) => {
    if (formData.questions.length > 1) {
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.filter(q => q.id !== questionId)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Assessment title is required';
    if (!formData.jobId) newErrors.jobId = 'Please select a job';
    if (formData.timeLimit < 1) newErrors.timeLimit = 'Time limit must be at least 1 minute';
    
    // Validate questions
    formData.questions.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors[`question_${index}`] = 'Question cannot be empty';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      error('Please fix the errors below');
      return;
    }

    const assessmentData = {
      ...formData,
      questions: formData.questions.filter(q => q.question.trim())
    };

    if (isEdit) {
      dispatch({ type: ActionTypes.UPDATE_ASSESSMENT, payload: { id, ...assessmentData } });
      success('Assessment updated successfully');
    } else {
      dispatch({ type: ActionTypes.ADD_ASSESSMENT, payload: assessmentData });
      success('Assessment created successfully');
    }
    
    navigate('/assessments');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/assessments')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assessments
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">
            {isEdit ? 'Edit Assessment' : 'Create Assessment'}
          </h1>
          <p className="text-secondary-600">
            {isEdit ? 'Update assessment details' : 'Design a new assessment for candidates'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Assessment Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Development Assessment"
                className={errors.title ? 'border-danger-500' : ''}
              />
              {errors.title && <p className="text-sm text-danger-600 mt-1">{errors.title}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jobId">Associated Job *</Label>
                <Select
                  id="jobId"
                  name="jobId"
                  value={formData.jobId}
                  onChange={handleChange}
                  className={errors.jobId ? 'border-danger-500' : ''}
                >
                  <option value="">Select a job</option>
                  {jobs.filter(job => job.status === 'active').map(job => (
                    <option key={job.id} value={job.id}>{job.title}</option>
                  ))}
                </Select>
                {errors.jobId && <p className="text-sm text-danger-600 mt-1">{errors.jobId}</p>}
              </div>
              
              <div>
                <Label htmlFor="timeLimit">Time Limit (minutes) *</Label>
                <Input
                  id="timeLimit"
                  name="timeLimit"
                  type="number"
                  min="1"
                  value={formData.timeLimit}
                  onChange={handleChange}
                  className={errors.timeLimit ? 'border-danger-500' : ''}
                />
                {errors.timeLimit && <p className="text-sm text-danger-600 mt-1">{errors.timeLimit}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Questions</CardTitle>
              <Button type="button" onClick={addQuestion} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Question
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {formData.questions.map((question, index) => (
                <div key={question.id} className="p-4 border border-secondary-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-secondary-900">Question {index + 1}</h4>
                    {formData.questions.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(question.id)}
                        className="text-danger-600 hover:text-danger-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`question_${question.id}`}>Question Text *</Label>
                      <Textarea
                        id={`question_${question.id}`}
                        value={question.question}
                        onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value)}
                        placeholder="Enter your question here..."
                        rows={3}
                        className={errors[`question_${index}`] ? 'border-danger-500' : ''}
                      />
                      {errors[`question_${index}`] && (
                        <p className="text-sm text-danger-600 mt-1">{errors[`question_${index}`]}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`type_${question.id}`}>Question Type</Label>
                        <Select
                          id={`type_${question.id}`}
                          value={question.type}
                          onChange={(e) => handleQuestionChange(question.id, 'type', e.target.value)}
                        >
                          <option value="text">Short Answer</option>
                          <option value="textarea">Long Answer</option>
                          <option value="number">Number</option>
                          <option value="select">Multiple Choice</option>
                        </Select>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`required_${question.id}`}
                          checked={question.required}
                          onChange={(e) => handleQuestionChange(question.id, 'required', e.target.checked)}
                          className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                        />
                        <Label htmlFor={`required_${question.id}`} className="text-sm">
                          Required question
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => navigate('/assessments')}
          >
            Cancel
          </Button>
          <Button type="submit" className="gap-2">
            <Save className="w-4 h-4" />
            {isEdit ? 'Update Assessment' : 'Create Assessment'}
          </Button>
        </div>
      </form>
    </div>
  );
}
