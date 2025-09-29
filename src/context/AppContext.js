import React, { createContext, useContext, useReducer } from 'react';

// Utility function to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Initial state
const initialState = {
  jobs: [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      status: 'active',
      description: 'We are looking for a senior frontend developer with React experience.',
      requirements: ['5+ years React experience', 'TypeScript knowledge', 'Team leadership'],
      salary: '₹12,00,000 - ₹15,00,000',
      postedDate: '2024-01-15',
      applicants: 12,
      order: 0,
      tags: ['React', 'TypeScript', 'Frontend'],
      slug: 'senior-frontend-developer'
    },
    {
      id: '2',
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'New York, NY',
      type: 'Full-time',
      status: 'active',
      description: 'Creative UX designer to join our growing design team.',
      requirements: ['3+ years UX experience', 'Figma proficiency', 'User research'],
      salary: '₹8,00,000 - ₹10,00,000',
      postedDate: '2024-01-10',
      applicants: 8,
      order: 1,
      tags: ['UX', 'Design', 'Figma'],
      slug: 'ux-designer'
    },
    {
      id: '3',
      title: 'Backend Engineer',
      company: 'DataFlow',
      location: 'Remote',
      type: 'Full-time',
      status: 'archived',
      description: 'Backend engineer for our microservices architecture.',
      requirements: ['Node.js experience', 'Database design', 'API development'],
      salary: '₹10,00,000 - ₹13,00,000',
      postedDate: '2024-01-05',
      applicants: 15,
      order: 2,
      tags: ['Node.js', 'Backend', 'API'],
      slug: 'backend-engineer'
    },
    {
      id: '4',
      title: 'Product Manager',
      company: 'InnovateCorp',
      location: 'Seattle, WA',
      type: 'Full-time',
      status: 'active',
      description: 'Lead product strategy and roadmap for our flagship product.',
      requirements: ['5+ years PM experience', 'Analytics skills', 'Cross-functional leadership'],
      salary: '₹13,00,000 - ₹16,00,000',
      postedDate: '2024-01-20',
      applicants: 25,
      order: 3,
      tags: ['Product', 'Strategy', 'Analytics'],
      slug: 'product-manager'
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Austin, TX',
      type: 'Full-time',
      status: 'active',
      description: 'Manage cloud infrastructure and deployment pipelines.',
      requirements: ['AWS/Azure experience', 'Docker/Kubernetes', 'CI/CD'],
      salary: '₹11,00,000 - ₹14,00,000',
      postedDate: '2024-01-18',
      applicants: 18,
      order: 4,
      tags: ['DevOps', 'Cloud', 'AWS'],
      slug: 'devops-engineer'
    }
  ],
  candidates: [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js'],
      appliedJobs: ['1'],
      currentStage: '1',
      stages: {
        '1': { status: 'applied', date: '2024-01-16' },
        '2': { status: 'screening', date: '2024-01-18' },
        '3': { status: 'interview', date: null },
        '4': { status: 'offer', date: null },
        '5': { status: 'hired', date: null }
      },
      notes: [
        {
          id: '1',
          content: 'Strong technical background, @hr-team please schedule interview',
          author: 'Recruiter',
          date: '2024-01-16',
          mentions: ['hr-team']
        }
      ],
      resume: 'john-smith-resume.pdf',
      linkedin: 'https://linkedin.com/in/johnsmith',
      portfolio: 'https://johnsmith.dev'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 987-6543',
      experience: '3 years',
      skills: ['UX Design', 'Figma', 'User Research'],
      appliedJobs: ['2'],
      currentStage: '2',
      stages: {
        '1': { status: 'applied', date: '2024-01-12' },
        '2': { status: 'screening', date: '2024-01-15' },
        '3': { status: 'interview', date: null },
        '4': { status: 'offer', date: null },
        '5': { status: 'hired', date: null }
      },
      notes: [
        {
          id: '1',
          content: 'Excellent portfolio, @design-team review her work',
          author: 'HR Manager',
          date: '2024-01-12',
          mentions: ['design-team']
        }
      ],
      resume: 'sarah-johnson-resume.pdf',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      portfolio: 'https://sarahjohnson.design'
    }
  ],
  assessments: [
    {
      id: '1',
      jobId: '1',
      title: 'Frontend Development Assessment',
      questions: [
        {
          id: '1',
          question: 'What is the difference between useState and useEffect in React?',
          type: 'text',
          required: true
        },
        {
          id: '2',
          question: 'How would you optimize a React application for performance?',
          type: 'textarea',
          required: true
        },
        {
          id: '3',
          question: 'Rate your experience with TypeScript (1-5)',
          type: 'number',
          required: true
        }
      ],
      timeLimit: 60
    },
    {
      id: '2',
      jobId: '2',
      title: 'UX Design Portfolio Review',
      questions: [
        {
          id: '1',
          question: 'Describe your design process for a mobile app',
          type: 'textarea',
          required: true
        },
        {
          id: '2',
          question: 'How do you conduct user research?',
          type: 'textarea',
          required: true
        }
      ],
      timeLimit: 45
    }
  ],
  // Jobs pagination and filtering
  jobsPagination: {
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0
  },
  jobsFilters: {
    search: '',
    status: 'all',
    tags: [],
    sortBy: 'order',
    sortOrder: 'asc'
  },
  // Candidates pagination and filtering
  candidatesPagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  },
  candidatesFilters: {
    search: '',
    stage: 'all',
    job: 'all'
  },
  // Assessment builder state
  assessmentBuilder: {
    currentAssessment: null,
    sections: [],
    questions: [],
    previewMode: false
  },
  // Mentions for notes
  mentions: [
    { id: 'hr-team', name: 'HR Team', type: 'team' },
    { id: 'design-team', name: 'Design Team', type: 'team' },
    { id: 'tech-team', name: 'Tech Team', type: 'team' },
    { id: 'john-doe', name: 'John Doe', type: 'person' },
    { id: 'jane-smith', name: 'Jane Smith', type: 'person' }
  ]
};

// Action types
const ActionTypes = {
  ADD_JOB: 'ADD_JOB',
  UPDATE_JOB: 'UPDATE_JOB',
  ARCHIVE_JOB: 'ARCHIVE_JOB',
  UNARCHIVE_JOB: 'UNARCHIVE_JOB',
  REORDER_JOBS: 'REORDER_JOBS',
  SET_JOBS_PAGINATION: 'SET_JOBS_PAGINATION',
  SET_JOBS_FILTERS: 'SET_JOBS_FILTERS',
  ADD_CANDIDATE: 'ADD_CANDIDATE',
  UPDATE_CANDIDATE_STAGE: 'UPDATE_CANDIDATE_STAGE',
  ADD_CANDIDATE_NOTE: 'ADD_CANDIDATE_NOTE',
  UPDATE_CANDIDATE_NOTE: 'UPDATE_CANDIDATE_NOTE',
  DELETE_CANDIDATE_NOTE: 'DELETE_CANDIDATE_NOTE',
  SET_CANDIDATES_PAGINATION: 'SET_CANDIDATES_PAGINATION',
  SET_CANDIDATES_FILTERS: 'SET_CANDIDATES_FILTERS',
  ADD_ASSESSMENT: 'ADD_ASSESSMENT',
  UPDATE_ASSESSMENT: 'UPDATE_ASSESSMENT',
  SET_ASSESSMENT_BUILDER: 'SET_ASSESSMENT_BUILDER',
  ADD_ASSESSMENT_SECTION: 'ADD_ASSESSMENT_SECTION',
  UPDATE_ASSESSMENT_SECTION: 'UPDATE_ASSESSMENT_SECTION',
  DELETE_ASSESSMENT_SECTION: 'DELETE_ASSESSMENT_SECTION',
  ADD_ASSESSMENT_QUESTION: 'ADD_ASSESSMENT_QUESTION',
  UPDATE_ASSESSMENT_QUESTION: 'UPDATE_ASSESSMENT_QUESTION',
  DELETE_ASSESSMENT_QUESTION: 'DELETE_ASSESSMENT_QUESTION'
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_JOB:
      const newJob = {
        ...action.payload,
        id: Date.now().toString(),
        order: state.jobs.length,
        slug: generateSlug(action.payload.title)
      };
      return {
        ...state,
        jobs: [...state.jobs, newJob]
      };
    
    case ActionTypes.UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map(job => 
          job.id === action.payload.id ? { ...job, ...action.payload } : job
        )
      };
    
    case ActionTypes.ARCHIVE_JOB:
      return {
        ...state,
        jobs: state.jobs.map(job => 
          job.id === action.payload.id ? { ...job, status: 'archived' } : job
        )
      };
    
    case ActionTypes.UNARCHIVE_JOB:
      return {
        ...state,
        jobs: state.jobs.map(job => 
          job.id === action.payload.id ? { ...job, status: 'active' } : job
        )
      };
    
    case ActionTypes.REORDER_JOBS:
      return {
        ...state,
        jobs: action.payload
      };
    
    case ActionTypes.SET_JOBS_PAGINATION:
      return {
        ...state,
        jobsPagination: { ...state.jobsPagination, ...action.payload }
      };
    
    case ActionTypes.SET_JOBS_FILTERS:
      return {
        ...state,
        jobsFilters: { ...state.jobsFilters, ...action.payload }
      };
    
    case ActionTypes.ADD_CANDIDATE:
      return {
        ...state,
        candidates: [...state.candidates, { ...action.payload, id: Date.now().toString() }]
      };
    
    case ActionTypes.UPDATE_CANDIDATE_STAGE:
      return {
        ...state,
        candidates: state.candidates.map(candidate => 
          candidate.id === action.payload.candidateId 
            ? { 
                ...candidate, 
                currentStage: action.payload.stage,
                stages: {
                  ...candidate.stages,
                  [action.payload.stage]: { 
                    status: action.payload.status, 
                    date: new Date().toISOString().split('T')[0] 
                  }
                }
              } 
            : candidate
        )
      };
    
    case ActionTypes.ADD_CANDIDATE_NOTE:
      return {
        ...state,
        candidates: state.candidates.map(candidate => 
          candidate.id === action.payload.candidateId 
            ? { 
                ...candidate, 
                notes: [...(candidate.notes || []), action.payload.note]
              } 
            : candidate
        )
      };
    
    case ActionTypes.UPDATE_CANDIDATE_NOTE:
      return {
        ...state,
        candidates: state.candidates.map(candidate => 
          candidate.id === action.payload.candidateId 
            ? { 
                ...candidate, 
                notes: candidate.notes.map(note => 
                  note.id === action.payload.noteId 
                    ? { ...note, ...action.payload.updates }
                    : note
                )
              } 
            : candidate
        )
      };
    
    case ActionTypes.DELETE_CANDIDATE_NOTE:
      return {
        ...state,
        candidates: state.candidates.map(candidate => 
          candidate.id === action.payload.candidateId 
            ? { 
                ...candidate, 
                notes: candidate.notes.filter(note => note.id !== action.payload.noteId)
              } 
            : candidate
        )
      };
    
    case ActionTypes.SET_CANDIDATES_PAGINATION:
      return {
        ...state,
        candidatesPagination: { ...state.candidatesPagination, ...action.payload }
      };
    
    case ActionTypes.SET_CANDIDATES_FILTERS:
      return {
        ...state,
        candidatesFilters: { ...state.candidatesFilters, ...action.payload }
      };
    
    case ActionTypes.ADD_ASSESSMENT:
      return {
        ...state,
        assessments: [...state.assessments, { ...action.payload, id: Date.now().toString() }]
      };
    
    case ActionTypes.UPDATE_ASSESSMENT:
      return {
        ...state,
        assessments: state.assessments.map(assessment => 
          assessment.id === action.payload.id ? { ...assessment, ...action.payload } : assessment
        )
      };
    
    case ActionTypes.SET_ASSESSMENT_BUILDER:
      return {
        ...state,
        assessmentBuilder: { ...state.assessmentBuilder, ...action.payload }
      };
    
    case ActionTypes.ADD_ASSESSMENT_SECTION:
      return {
        ...state,
        assessmentBuilder: {
          ...state.assessmentBuilder,
          sections: [...state.assessmentBuilder.sections, action.payload]
        }
      };
    
    case ActionTypes.UPDATE_ASSESSMENT_SECTION:
      return {
        ...state,
        assessmentBuilder: {
          ...state.assessmentBuilder,
          sections: state.assessmentBuilder.sections.map(section => 
            section.id === action.payload.id ? { ...section, ...action.payload } : section
          )
        }
      };
    
    case ActionTypes.DELETE_ASSESSMENT_SECTION:
      return {
        ...state,
        assessmentBuilder: {
          ...state.assessmentBuilder,
          sections: state.assessmentBuilder.sections.filter(section => section.id !== action.payload)
        }
      };
    
    case ActionTypes.ADD_ASSESSMENT_QUESTION:
      return {
        ...state,
        assessmentBuilder: {
          ...state.assessmentBuilder,
          questions: [...state.assessmentBuilder.questions, action.payload]
        }
      };
    
    case ActionTypes.UPDATE_ASSESSMENT_QUESTION:
      return {
        ...state,
        assessmentBuilder: {
          ...state.assessmentBuilder,
          questions: state.assessmentBuilder.questions.map(question => 
            question.id === action.payload.id ? { ...question, ...action.payload } : question
          )
        }
      };
    
    case ActionTypes.DELETE_ASSESSMENT_QUESTION:
      return {
        ...state,
        assessmentBuilder: {
          ...state.assessmentBuilder,
          questions: state.assessmentBuilder.questions.filter(question => question.id !== action.payload)
        }
      };
    
    default:
      return state;
  }
}

// Context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = {
    ...state,
    dispatch,
    ActionTypes
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Hook to use context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
