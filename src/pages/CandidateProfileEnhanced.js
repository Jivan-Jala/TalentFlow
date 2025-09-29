import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Briefcase,
  FileText,
  ExternalLink,
  Download,
  MessageSquare,
  Plus,
  Send
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { NotesWithMentions } from '../components/NotesWithMentions';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/ui/Toast';

export function CandidateProfileEnhanced() {
  const { id } = useParams();
  const { candidates, jobs, dispatch, ActionTypes } = useApp();
  const { success } = useToast();
  
  const candidate = candidates.find(c => c.id === id);
  const appliedJob = jobs.find(j => j.id === candidate?.appliedJobs[0]);

  const [currentStage, setCurrentStage] = useState(candidate?.currentStage || '1');

  if (!candidate) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Candidate not found</h2>
            <Link to="/candidates">
              <Button>Back to Candidates</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stages = [
    { id: '1', name: 'Applied', description: 'Initial application received', color: 'warning' },
    { id: '2', name: 'Screening', description: 'Phone/video screening', color: 'primary' },
    { id: '3', name: 'Interview', description: 'Technical/behavioral interview', color: 'primary' },
    { id: '4', name: 'Offer', description: 'Job offer extended', color: 'success' },
    { id: '5', name: 'Hired', description: 'Successfully hired', color: 'success' }
  ];

  const getStageIcon = (stageId) => {
    const icons = {
      '1': Clock,
      '2': AlertCircle,
      '3': AlertCircle,
      '4': CheckCircle,
      '5': CheckCircle
    };
    return icons[stageId] || Clock;
  };

  const handleStageChange = (newStage) => {
    setCurrentStage(newStage);
    dispatch({
      type: ActionTypes.UPDATE_CANDIDATE_STAGE,
      payload: {
        candidateId: candidate.id,
        stage: newStage,
        status: stages.find(s => s.id === newStage)?.name.toLowerCase() || 'applied'
      }
    });
    success(`Candidate moved to ${stages.find(s => s.id === newStage)?.name} stage`);
  };

  const handleAddNote = (candidateId, note) => {
    dispatch({
      type: ActionTypes.ADD_CANDIDATE_NOTE,
      payload: { candidateId, note }
    });
  };

  const handleUpdateNote = (candidateId, noteId, updates) => {
    dispatch({
      type: ActionTypes.UPDATE_CANDIDATE_NOTE,
      payload: { candidateId, noteId, updates }
    });
  };

  const handleDeleteNote = (candidateId, noteId) => {
    dispatch({
      type: ActionTypes.DELETE_CANDIDATE_NOTE,
      payload: { candidateId, noteId }
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/candidates">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Candidates
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-secondary-900">{candidate.name}</h1>
          <p className="text-secondary-600">Candidate Profile & Timeline</p>
        </div>
        <Button className="gap-2">
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-medium text-primary-700">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-secondary-900">{candidate.name}</h3>
                      <p className="text-secondary-600">{candidate.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-secondary-600">
                      <Phone className="w-4 h-4" />
                      {candidate.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-secondary-600">
                      <MapPin className="w-4 h-4" />
                      {candidate.experience} experience
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-secondary-900 mb-2">Applied for:</h4>
                    <div className="flex items-center gap-2 p-3 bg-secondary-50 rounded-lg">
                      <Briefcase className="w-4 h-4 text-primary-600" />
                      <div>
                        <p className="font-medium text-secondary-900">{appliedJob?.title}</p>
                        <p className="text-sm text-secondary-600">{appliedJob?.company}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-secondary-900 mb-2">Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stages.map((stage, index) => {
                  const StageIcon = getStageIcon(stage.id);
                  const isActive = parseInt(candidate.currentStage) >= parseInt(stage.id);
                  const isCurrent = candidate.currentStage === stage.id;
                  
                  return (
                    <div key={stage.id} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-400'
                      }`}>
                        <StageIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-medium ${isActive ? 'text-secondary-900' : 'text-secondary-500'}`}>
                            {stage.name}
                          </h4>
                          {isCurrent && <Badge variant="primary">Current</Badge>}
                        </div>
                        <p className={`text-sm ${isActive ? 'text-secondary-600' : 'text-secondary-400'}`}>
                          {stage.description}
                        </p>
                        {candidate.stages[stage.id]?.date && (
                          <p className="text-xs text-secondary-500 mt-1">
                            Completed on {candidate.stages[stage.id].date}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Documents & Links */}
          <Card>
            <CardHeader>
              <CardTitle>Documents & Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {candidate.resume && (
                  <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-secondary-900">Resume</p>
                        <p className="text-sm text-secondary-600">{candidate.resume}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                )}
                
                {candidate.linkedin && (
                  <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-secondary-900">LinkedIn</p>
                        <p className="text-sm text-secondary-600">{candidate.linkedin}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Visit
                    </Button>
                  </div>
                )}
                
                {candidate.portfolio && (
                  <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-secondary-900">Portfolio</p>
                        <p className="text-sm text-secondary-600">{candidate.portfolio}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Visit
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stage Management */}
          <Card>
            <CardHeader>
              <CardTitle>Stage Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stages.map((stage) => {
                  const isCurrent = candidate.currentStage === stage.id;
                  const isNext = parseInt(candidate.currentStage) + 1 === parseInt(stage.id);
                  const isPast = parseInt(candidate.currentStage) > parseInt(stage.id);
                  
                  return (
                    <button
                      key={stage.id}
                      onClick={() => handleStageChange(stage.id)}
                      disabled={!isNext && !isCurrent}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        isCurrent 
                          ? 'border-primary-200 bg-primary-50 text-primary-900' 
                          : isNext 
                            ? 'border-secondary-200 hover:border-primary-200 hover:bg-primary-50 text-secondary-700 hover:text-primary-900'
                            : isPast
                              ? 'border-success-200 bg-success-50 text-success-900'
                              : 'border-secondary-200 bg-secondary-50 text-secondary-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          isCurrent ? 'bg-primary-600' : isNext ? 'bg-secondary-400' : isPast ? 'bg-success-600' : 'bg-secondary-300'
                        }`} />
                        <span className="font-medium">{stage.name}</span>
                      </div>
                      <p className="text-xs mt-1 opacity-75">{stage.description}</p>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Mail className="w-4 h-4" />
                Send Email
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Phone className="w-4 h-4" />
                Schedule Call
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Interview
              </Button>
            </CardContent>
          </Card>

          {/* Notes */}
          <NotesWithMentions
            candidateId={candidate.id}
            notes={candidate.notes || []}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>
      </div>
    </div>
  );
}
