import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Archive,
  ArchiveRestore,
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  Building,
  Tag,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/ui/Toast';

export function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, dispatch, ActionTypes } = useApp();
  const { success } = useToast();
  
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Job not found</h2>
            <p className="text-secondary-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Link to="/jobs">
              <Button>Back to Jobs</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleArchiveToggle = () => {
    if (job.status === 'active') {
      dispatch({ type: ActionTypes.ARCHIVE_JOB, payload: { id: job.id } });
      success('Job archived successfully');
    } else {
      dispatch({ type: ActionTypes.UNARCHIVE_JOB, payload: { id: job.id } });
      success('Job unarchived successfully');
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'success', text: 'Active', icon: CheckCircle },
      archived: { variant: 'secondary', text: 'Archived', icon: AlertCircle }
    };
    return variants[status] || { variant: 'secondary', text: status, icon: AlertCircle };
  };

  const statusInfo = getStatusBadge(job.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/jobs">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-secondary-900">{job.title}</h1>
            <Badge variant={statusInfo.variant} className="gap-1">
              <StatusIcon className="w-3 h-3" />
              {statusInfo.text}
            </Badge>
          </div>
          <p className="text-secondary-600">Job Details and Information</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="secondary"
            onClick={() => navigate(`/jobs/${job.id}/edit`)}
            className="gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Job
          </Button>
          <Button 
            variant={job.status === 'active' ? 'warning' : 'success'}
            onClick={handleArchiveToggle}
            className="gap-2"
          >
            {job.status === 'active' ? (
              <>
                <Archive className="w-4 h-4" />
                Archive
              </>
            ) : (
              <>
                <ArchiveRestore className="w-4 h-4" />
                Unarchive
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-secondary-900">{job.company}</p>
                      <p className="text-sm text-secondary-600">Company</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-secondary-900">{job.location}</p>
                      <p className="text-sm text-secondary-600">Location</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-secondary-900">{job.type}</p>
                      <p className="text-sm text-secondary-600">Employment Type</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-success-600 font-bold text-lg">₹</span>
                    <div>
                      <p className="font-medium text-secondary-900">{job.salary}</p>
                      <p className="text-sm text-secondary-600">Salary Range</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-secondary-900">{job.applicants}</p>
                      <p className="text-sm text-secondary-600">Applicants</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-secondary-900">{job.postedDate}</p>
                      <p className="text-sm text-secondary-600">Posted Date</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-secondary-700 leading-relaxed">{job.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success-600 mt-0.5 flex-shrink-0" />
                    <span className="text-secondary-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Tags */}
          {job.tags && job.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="secondary" 
                className="w-full justify-start gap-2"
                onClick={() => navigate(`/jobs/${job.id}/edit`)}
              >
                <Edit className="w-4 h-4" />
                Edit Job Details
              </Button>
              
              <Button 
                variant="secondary" 
                className="w-full justify-start gap-2"
                onClick={handleArchiveToggle}
              >
                {job.status === 'active' ? (
                  <>
                    <Archive className="w-4 h-4" />
                    Archive Job
                  </>
                ) : (
                  <>
                    <ArchiveRestore className="w-4 h-4" />
                    Unarchive Job
                  </>
                )}
              </Button>
              
              <Button 
                variant="secondary" 
                className="w-full justify-start gap-2"
                onClick={() => navigate('/candidates')}
              >
                <Users className="w-4 h-4" />
                View Candidates
              </Button>
              
              <Button 
                variant="secondary" 
                className="w-full justify-start gap-2"
                onClick={() => window.open(`/jobs/${job.slug}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                View Public Page
              </Button>
            </CardContent>
          </Card>

          {/* Job Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Total Applicants</span>
                <span className="font-medium text-secondary-900">{job.applicants}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Days Posted</span>
                <span className="font-medium text-secondary-900">
                  {Math.floor((new Date() - new Date(job.postedDate)) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Status</span>
                <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Job URL */}
          <Card>
            <CardHeader>
              <CardTitle>Job URL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-600 mb-2">Public URL:</p>
                <code className="text-sm text-primary-600 break-all">
                  /jobs/{job.slug}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
