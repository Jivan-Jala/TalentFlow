import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Save, 
  Eye, 
  EyeOff,
  Trash2,
  Edit,
  Copy,
  Move,
  Settings,
  Type,
  List,
  CheckSquare,
  Hash,
  Upload,
  FileText,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Label, Textarea, Select } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/ui/Toast';

const questionTypes = [
  { id: 'single-choice', name: 'Single Choice', icon: ToggleLeft, description: 'Multiple choice with one answer' },
  { id: 'multi-choice', name: 'Multiple Choice', icon: CheckSquare, description: 'Multiple choice with multiple answers' },
  { id: 'short-text', name: 'Short Text', icon: Type, description: 'Short text input' },
  { id: 'long-text', name: 'Long Text', icon: FileText, description: 'Long text area' },
  { id: 'numeric', name: 'Numeric', icon: Hash, description: 'Number input with range' },
  { id: 'file-upload', name: 'File Upload', icon: Upload, description: 'File upload (stub)' }
];

const QuestionBuilder = ({ question, onUpdate, onDelete, onMove }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localQuestion, setLocalQuestion] = useState(question);

  useEffect(() => {
    setLocalQuestion(question);
  }, [question]);

  const handleUpdate = (updates) => {
    const updated = { ...localQuestion, ...updates };
    setLocalQuestion(updated);
    onUpdate(updated);
  };

  const handleAddOption = () => {
    const newOptions = [...(localQuestion.options || []), { id: Date.now().toString(), text: '' }];
    handleUpdate({ options: newOptions });
  };

  const handleUpdateOption = (optionId, text) => {
    const newOptions = localQuestion.options.map(opt => 
      opt.id === optionId ? { ...opt, text } : opt
    );
    handleUpdate({ options: newOptions });
  };

  const handleDeleteOption = (optionId) => {
    const newOptions = localQuestion.options.filter(opt => opt.id !== optionId);
    handleUpdate({ options: newOptions });
  };

  const questionType = questionTypes.find(t => t.id === localQuestion.type);
  const TypeIcon = questionType?.icon || Type;

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <TypeIcon className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <CardTitle className="text-sm">{localQuestion.title || 'Untitled Question'}</CardTitle>
              <p className="text-xs text-secondary-500">{questionType?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2"
            >
              {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(localQuestion.id)}
              className="text-danger-600 hover:text-danger-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Question Title */}
          <div>
            <Label>Question Title</Label>
            <Input
              value={localQuestion.title}
              onChange={(e) => handleUpdate({ title: e.target.value })}
              placeholder="Enter question title..."
            />
          </div>

          {/* Question Description */}
          <div>
            <Label>Description (Optional)</Label>
            <Textarea
              value={localQuestion.description || ''}
              onChange={(e) => handleUpdate({ description: e.target.value })}
              placeholder="Add additional context or instructions..."
              rows={2}
            />
          </div>

          {/* Question Type */}
          <div>
            <Label>Question Type</Label>
            <Select
              value={localQuestion.type}
              onChange={(e) => handleUpdate({ type: e.target.value })}
            >
              {questionTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </Select>
          </div>

          {/* Options for choice questions */}
          {(localQuestion.type === 'single-choice' || localQuestion.type === 'multi-choice') && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Options</Label>
                <Button variant="secondary" size="sm" onClick={handleAddOption}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
              <div className="space-y-2">
                {(localQuestion.options || []).map((option, index) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <Input
                      value={option.text}
                      onChange={(e) => handleUpdateOption(option.id, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteOption(option.id)}
                      className="text-danger-600 hover:text-danger-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Numeric range */}
          {localQuestion.type === 'numeric' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Minimum Value</Label>
                <Input
                  type="number"
                  value={localQuestion.minValue || ''}
                  onChange={(e) => handleUpdate({ minValue: parseInt(e.target.value) || null })}
                  placeholder="Min"
                />
              </div>
              <div>
                <Label>Maximum Value</Label>
                <Input
                  type="number"
                  value={localQuestion.maxValue || ''}
                  onChange={(e) => handleUpdate({ maxValue: parseInt(e.target.value) || null })}
                  placeholder="Max"
                />
              </div>
            </div>
          )}

          {/* File upload settings */}
          {localQuestion.type === 'file-upload' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Accepted File Types</Label>
                <Input
                  value={localQuestion.acceptedTypes || ''}
                  onChange={(e) => handleUpdate({ acceptedTypes: e.target.value })}
                  placeholder="e.g., .pdf, .doc, .docx"
                />
              </div>
              <div>
                <Label>Max File Size (MB)</Label>
                <Input
                  type="number"
                  value={localQuestion.maxSize || ''}
                  onChange={(e) => handleUpdate({ maxSize: parseInt(e.target.value) || null })}
                  placeholder="10"
                />
              </div>
            </div>
          )}

          {/* Validation Rules */}
          <div className="space-y-3">
            <Label>Validation Rules</Label>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`required-${localQuestion.id}`}
                checked={localQuestion.required || false}
                onChange={(e) => handleUpdate({ required: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
              />
              <Label htmlFor={`required-${localQuestion.id}`} className="text-sm">
                Required question
              </Label>
            </div>

            {localQuestion.type === 'short-text' || localQuestion.type === 'long-text' ? (
              <div>
                <Label>Maximum Length</Label>
                <Input
                  type="number"
                  value={localQuestion.maxLength || ''}
                  onChange={(e) => handleUpdate({ maxLength: parseInt(e.target.value) || null })}
                  placeholder="No limit"
                />
              </div>
            ) : null}
          </div>

          {/* Conditional Logic */}
          <div className="space-y-3">
            <Label>Conditional Logic</Label>
            <div className="p-3 bg-secondary-50 rounded-lg">
              <p className="text-sm text-secondary-600 mb-2">
                Show this question only if:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Select
                    value={localQuestion.condition?.questionId || ''}
                    onChange={(e) => handleUpdate({ 
                      condition: { 
                        ...localQuestion.condition, 
                        questionId: e.target.value 
                      } 
                    })}
                  >
                    <option value="">Select question...</option>
                    {/* This would be populated with other questions */}
                  </Select>
                  <Select
                    value={localQuestion.condition?.operator || ''}
                    onChange={(e) => handleUpdate({ 
                      condition: { 
                        ...localQuestion.condition, 
                        operator: e.target.value 
                      } 
                    })}
                  >
                    <option value="">Select operator...</option>
                    <option value="equals">Equals</option>
                    <option value="not-equals">Not Equals</option>
                    <option value="contains">Contains</option>
                  </Select>
                  <Input
                    value={localQuestion.condition?.value || ''}
                    onChange={(e) => handleUpdate({ 
                      condition: { 
                        ...localQuestion.condition, 
                        value: e.target.value 
                      } 
                    })}
                    placeholder="Value"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export function AssessmentBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, assessmentBuilder, dispatch, ActionTypes } = useApp();
  const { success, error } = useToast();
  
  const [assessment, setAssessment] = useState({
    title: '',
    description: '',
    jobId: '',
    timeLimit: 30,
    sections: []
  });
  
  const [questions, setQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit && assessmentBuilder.currentAssessment) {
      setAssessment(assessmentBuilder.currentAssessment);
      setQuestions(assessmentBuilder.questions);
    }
  }, [isEdit, assessmentBuilder]);

  const handleAddQuestion = (type) => {
    const newQuestion = {
      id: Date.now().toString(),
      type,
      title: '',
      description: '',
      required: false,
      options: type.includes('choice') ? [{ id: '1', text: '' }, { id: '2', text: '' }] : [],
      validation: {}
    };
    
    setQuestions(prev => [...prev, newQuestion]);
    dispatch({
      type: ActionTypes.ADD_ASSESSMENT_QUESTION,
      payload: newQuestion
    });
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    setQuestions(prev => prev.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    dispatch({
      type: ActionTypes.UPDATE_ASSESSMENT_QUESTION,
      payload: updatedQuestion
    });
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
    dispatch({
      type: ActionTypes.DELETE_ASSESSMENT_QUESTION,
      payload: questionId
    });
  };

  const handleSave = () => {
    if (!assessment.title.trim()) {
      error('Assessment title is required');
      return;
    }
    
    if (!assessment.jobId) {
      error('Please select a job');
      return;
    }
    
    if (questions.length === 0) {
      error('Please add at least one question');
      return;
    }

    const assessmentData = {
      ...assessment,
      questions,
      id: isEdit ? id : Date.now().toString()
    };

    dispatch({
      type: ActionTypes.SET_ASSESSMENT_BUILDER,
      payload: {
        currentAssessment: assessmentData,
        questions
      }
    });

    success('Assessment saved successfully');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/assessments">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Assessments
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-secondary-900">
            {isEdit ? 'Edit Assessment' : 'Create Assessment'}
          </h1>
          <p className="text-secondary-600">Build a comprehensive assessment for candidates</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="secondary"
            onClick={() => setShowPreview(!showPreview)}
            className="gap-2"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save Assessment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Builder */}
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Assessment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Assessment Title *</Label>
                <Input
                  value={assessment.title}
                  onChange={(e) => setAssessment(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Frontend Development Assessment"
                />
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea
                  value={assessment.description}
                  onChange={(e) => setAssessment(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this assessment covers..."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Associated Job *</Label>
                  <Select
                    value={assessment.jobId}
                    onChange={(e) => setAssessment(prev => ({ ...prev, jobId: e.target.value }))}
                  >
                    <option value="">Select a job</option>
                    {jobs.filter(job => job.status === 'active').map(job => (
                      <option key={job.id} value={job.id}>{job.title}</option>
                    ))}
                  </Select>
                </div>
                
                <div>
                  <Label>Time Limit (minutes)</Label>
                  <Input
                    type="number"
                    value={assessment.timeLimit}
                    onChange={(e) => setAssessment(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || 30 }))}
                    min="1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Questions ({questions.length})</CardTitle>
                <div className="flex gap-2">
                  {questionTypes.map(type => (
                    <Button
                      key={type.id}
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAddQuestion(type.id)}
                      className="gap-2"
                    >
                      <type.icon className="w-4 h-4" />
                      {type.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {questions.length === 0 ? (
                <div className="text-center py-8 text-secondary-400">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No questions yet</p>
                  <p className="text-xs">Add questions using the buttons above</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <QuestionBuilder
                      key={question.id}
                      question={question}
                      onUpdate={handleUpdateQuestion}
                      onDelete={handleDeleteQuestion}
                      onMove={(direction) => {
                        // Handle move up/down
                        const newIndex = direction === 'up' ? index - 1 : index + 1;
                        if (newIndex >= 0 && newIndex < questions.length) {
                          const newQuestions = [...questions];
                          [newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]];
                          setQuestions(newQuestions);
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary-50 rounded-lg">
                    <h3 className="font-medium text-secondary-900">{assessment.title || 'Untitled Assessment'}</h3>
                    <p className="text-sm text-secondary-600 mt-1">{assessment.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-secondary-500">
                      <span>Time Limit: {assessment.timeLimit} minutes</span>
                      <span>Questions: {questions.length}</span>
                    </div>
                  </div>
                  
                  {questions.map((question, index) => (
                    <div key={question.id} className="p-4 border border-secondary-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-medium text-secondary-900">
                          Question {index + 1}
                        </span>
                        {question.required && (
                          <Badge variant="danger" className="text-xs">Required</Badge>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {questionTypes.find(t => t.id === question.type)?.name}
                        </Badge>
                      </div>
                      
                      <h4 className="font-medium text-secondary-900 mb-2">
                        {question.title || 'Untitled Question'}
                      </h4>
                      
                      {question.description && (
                        <p className="text-sm text-secondary-600 mb-3">{question.description}</p>
                      )}
                      
                      {/* Render question based on type */}
                      {question.type === 'single-choice' && (
                        <div className="space-y-2">
                          {question.options?.map(option => (
                            <label key={option.id} className="flex items-center gap-2">
                              <input type="radio" name={`preview-${question.id}`} className="w-4 h-4" />
                              <span className="text-sm">{option.text || 'Option'}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'multi-choice' && (
                        <div className="space-y-2">
                          {question.options?.map(option => (
                            <label key={option.id} className="flex items-center gap-2">
                              <input type="checkbox" className="w-4 h-4" />
                              <span className="text-sm">{option.text || 'Option'}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'short-text' && (
                        <Input placeholder="Enter your answer..." />
                      )}
                      
                      {question.type === 'long-text' && (
                        <Textarea placeholder="Enter your answer..." rows={3} />
                      )}
                      
                      {question.type === 'numeric' && (
                        <Input type="number" placeholder="Enter a number..." />
                      )}
                      
                      {question.type === 'file-upload' && (
                        <div className="border-2 border-dashed border-secondary-300 rounded-lg p-4 text-center">
                          <Upload className="w-6 h-6 mx-auto mb-2 text-secondary-400" />
                          <p className="text-sm text-secondary-600">Click to upload file</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
