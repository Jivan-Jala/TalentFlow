import React, { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
  Tag,
  FileText,
  ExternalLink,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/ui/Toast';
import { generateCandidates } from '../utils/generateCandidates';

const stages = [
  { id: '1', title: 'Applied', color: 'warning', icon: Clock },
  { id: '2', title: 'Screening', color: 'primary', icon: AlertCircle },
  { id: '3', title: 'Interview', color: 'primary', icon: AlertCircle },
  { id: '4', title: 'Offer', color: 'success', icon: CheckCircle },
  { id: '5', title: 'Hired', color: 'success', icon: CheckCircle }
];

const CandidateCard = ({ candidate, jobs, onCandidateClick }) => {
  const appliedJob = jobs.find(j => j.id === candidate.appliedJobs[0]);
  const getStageInfo = (stage) => {
    const stageInfo = stages.find(s => s.id === stage);
    return stageInfo || { title: 'Unknown', color: 'secondary', icon: User };
  };

  const stageInfo = getStageInfo(candidate.currentStage);
  const StageIcon = stageInfo.icon;

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer mb-3"
      onClick={() => onCandidateClick(candidate.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-700">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-secondary-900 text-sm">{candidate.name}</h3>
              <p className="text-xs text-secondary-600">{candidate.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="p-1">
            <MoreVertical className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs text-secondary-600">
            <Phone className="w-3 h-3" />
            <span>{candidate.phone}</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-secondary-600">
            <MapPin className="w-3 h-3" />
            <span>{candidate.experience}</span>
          </div>
          
          <div className="pt-2">
            <p className="text-xs font-medium text-secondary-900 mb-1">Applied for:</p>
            <p className="text-xs text-secondary-600">
              {appliedJob?.title || 'Unknown Job'}
            </p>
          </div>
          
          <div className="pt-2">
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 2).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{candidate.skills.length - 2}
                </Badge>
              )}
            </div>
          </div>
          
          {candidate.notes && candidate.notes.length > 0 && (
            <div className="pt-2 border-t border-secondary-200">
              <div className="flex items-center gap-1 text-xs text-secondary-500">
                <FileText className="w-3 h-3" />
                <span>{candidate.notes.length} note{candidate.notes.length > 1 ? 's' : ''}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const StageColumn = ({ stage, candidates, jobs, onCandidateClick }) => {
  const StageIcon = stage.icon;
  
  return (
    <div className="flex-1 min-w-0">
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                stage.color === 'warning' ? 'bg-warning-100' :
                stage.color === 'primary' ? 'bg-primary-100' :
                stage.color === 'success' ? 'bg-success-100' : 'bg-secondary-100'
              }`}>
                <StageIcon className={`w-4 h-4 ${
                  stage.color === 'warning' ? 'text-warning-600' :
                  stage.color === 'primary' ? 'text-primary-600' :
                  stage.color === 'success' ? 'text-success-600' : 'text-secondary-600'
                }`} />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">{stage.title}</CardTitle>
                <p className="text-xs text-secondary-500">{candidates.length} candidates</p>
              </div>
            </div>
            <Badge variant={stage.color} className="text-xs">
              {candidates.length}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <Droppable droppableId={stage.id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`min-h-[400px] space-y-2 ${
                  snapshot.isDraggingOver ? 'bg-primary-50 rounded-lg' : ''
                }`}
              >
                {candidates.map((candidate, index) => (
                  <Draggable 
                    key={candidate.id} 
                    draggableId={candidate.id} 
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${
                          snapshot.isDragging ? 'rotate-2 scale-105' : ''
                        }`}
                      >
                        <CandidateCard 
                          candidate={candidate}
                          jobs={jobs}
                          onCandidateClick={onCandidateClick}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                
                {candidates.length === 0 && (
                  <div className="text-center py-8 text-secondary-400">
                    <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No candidates in this stage</p>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </CardContent>
      </Card>
    </div>
  );
};

export function CandidatesKanban() {
  const { jobs, dispatch, ActionTypes } = useApp();
  const { success, error } = useToast();
  
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Generate candidates on component mount
  React.useEffect(() => {
    const generateData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const generatedCandidates = generateCandidates(100);
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
      
      const matchesJob = jobFilter === 'all' || candidate.appliedJobs.includes(jobFilter);
      
      return matchesSearch && matchesJob;
    });
  }, [candidates, searchQuery, jobFilter]);

  // Group candidates by stage
  const candidatesByStage = useMemo(() => {
    const grouped = {};
    stages.forEach(stage => {
      grouped[stage.id] = filteredCandidates.filter(c => c.currentStage === stage.id);
    });
    return grouped;
  }, [filteredCandidates]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;
    
    if (destination.droppableId === source.droppableId && 
        destination.index === source.index) return;
    
    const newStage = destination.droppableId;
    const candidateId = draggableId;
    
    // Optimistic update
    setCandidates(prev => prev.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, currentStage: newStage }
        : candidate
    ));
    
    // Update in context
    dispatch({
      type: ActionTypes.UPDATE_CANDIDATE_STAGE,
      payload: {
        candidateId,
        stage: newStage,
        status: stages.find(s => s.id === newStage)?.title.toLowerCase() || 'applied'
      }
    });
    
    success(`Candidate moved to ${stages.find(s => s.id === newStage)?.title} stage`);
  };

  const handleCandidateClick = (candidateId) => {
    // Navigate to candidate detail
    window.location.href = `/candidates/${candidateId}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary-600">Loading candidates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Candidate Pipeline</h1>
          <p className="text-secondary-600">Drag and drop candidates between stages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2">
            <Users className="w-4 h-4" />
            List View
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <Input
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Job Filter */}
            <div className="flex gap-2">
              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Jobs</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
              
              <Button variant="secondary" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-secondary-600">
          Showing {filteredCandidates.length} of {candidates.length} candidates
        </p>
        <div className="flex items-center gap-4">
          {stages.map(stage => (
            <div key={stage.id} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                stage.color === 'warning' ? 'bg-warning-500' :
                stage.color === 'primary' ? 'bg-primary-500' :
                stage.color === 'success' ? 'bg-success-500' : 'bg-secondary-500'
              }`} />
              <span className="text-sm text-secondary-600">
                {candidatesByStage[stage.id]?.length || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {stages.map(stage => (
            <StageColumn
              key={stage.id}
              stage={stage}
              candidates={candidatesByStage[stage.id] || []}
              jobs={jobs}
              onCandidateClick={handleCandidateClick}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stages.map(stage => (
          <Card key={stage.id} className="text-center">
            <CardContent className="p-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                stage.color === 'warning' ? 'bg-warning-100' :
                stage.color === 'primary' ? 'bg-primary-100' :
                stage.color === 'success' ? 'bg-success-100' : 'bg-secondary-100'
              }`}>
                <stage.icon className={`w-6 h-6 ${
                  stage.color === 'warning' ? 'text-warning-600' :
                  stage.color === 'primary' ? 'text-primary-600' :
                  stage.color === 'success' ? 'text-success-600' : 'text-secondary-600'
                }`} />
              </div>
              <div className="text-2xl font-bold text-secondary-900 mb-1">
                {candidatesByStage[stage.id]?.length || 0}
              </div>
              <div className="text-sm text-secondary-600">
                {stage.title}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
