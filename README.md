# TalentFlow - Advanced Hiring Platform

A comprehensive React application for HR teams to manage jobs, candidates, and assessments with server-like API simulation, local persistence, and modern UI/UX.

## 🚀 Core Features

### 📋 Job Management
- ✅ **Server-like Pagination** - Efficient handling of large job datasets
- ✅ **Advanced Filtering** - Search by title, status, tags with real-time results
- ✅ **Drag-and-Drop Reordering** - Optimistic updates with rollback on failure
- ✅ **Create/Edit Jobs** - Modal-based job creation with validation
- ✅ **Archive/Unarchive** - Job lifecycle management
- ✅ **Deep Linking** - Direct access to jobs via `/jobs/:jobId`
- ✅ **Unique Slug Generation** - SEO-friendly URLs

### 👥 Candidate Management
- ✅ **Virtualized Lists** - Handle 1000+ candidates smoothly
- ✅ **Advanced Search** - Client-side search by name/email
- ✅ **Stage Filtering** - Server-like filtering by hiring stage
- ✅ **Kanban Board** - Drag-and-drop stage management
- ✅ **Candidate Profiles** - Detailed profiles with timeline at `/candidates/:id`
- ✅ **Notes with @Mentions** - Rich text notes with team member mentions
- ✅ **Timeline Tracking** - Complete candidate progression history

### 📝 Assessment System
- ✅ **Assessment Builder** - Dynamic question creation with live preview
- ✅ **Multiple Question Types**:
  - Single choice, Multi-choice
  - Short text, Long text
  - Numeric with range validation
  - File upload (stub implementation)
- ✅ **Conditional Logic** - Show/hide questions based on previous answers
- ✅ **Validation Rules** - Required fields, numeric ranges, max length
- ✅ **Local Persistence** - Builder state and candidate responses

### 🔄 API Simulation & Data Persistence
- ✅ **MSW (Mock Service Worker)** - Complete REST API simulation
- ✅ **IndexedDB via Dexie** - Local database with write-through persistence
- ✅ **Artificial Network Simulation** - 200-1200ms latency, 5-10% error rates
- ✅ **State Restoration** - Complete data recovery on app refresh
- ✅ **Comprehensive Seed Data** - 25 jobs, 1000 candidates, 3 assessments

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **React Router v6** - Client-side routing with deep linking
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### UI Components
- **Lucide React** - Beautiful, consistent icons
- **React Beautiful DnD** - Drag-and-drop functionality
- **React Window** - Virtualization for large lists
- **React Hook Form** - Form management and validation
- **React Hot Toast** - Toast notifications

### API & Data
- **MSW (Mock Service Worker)** - API simulation and mocking
- **Dexie** - IndexedDB wrapper for local persistence
- **Nanoid** - Unique ID generation
- **Date-fns** - Date manipulation utilities

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd talentflow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

The application will automatically:
- Initialize MSW for API simulation
- Check IndexedDB for existing data
- Seed database with 25 jobs, 1000 candidates, 3 assessments
- Start the React development server

### Build for Production

```bash
npm run build
```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 to #1e3a8a)
- **Success**: Green (#22c55e)
- **Warning**: Orange (#f59e0b)
- **Danger**: Red (#ef4444)
- **Secondary**: Gray scale

### Components
- Modern card-based layout
- Consistent button styles
- Form inputs with validation
- Toast notifications
- Modal dialogs
- Badge system for status indicators

## 🔧 Key Features

### Dashboard
- Overview statistics
- Recent jobs and candidates
- Quick action buttons
- Visual progress indicators

### Job Management
- Create new job postings
- Edit existing jobs
- Archive inactive positions
- Search and filter functionality

### Candidate Pipeline
- Visual stage progression
- Candidate profile management
- Application tracking
- Stage advancement controls

### Assessment Builder
- Dynamic question creation
- Multiple question types
- Time limit configuration
- Job-specific assessments

## 🎯 User Experience

- **Intuitive Navigation**: Clear sidebar with icon-based navigation
- **Visual Feedback**: Toast notifications for all actions
- **Responsive Design**: Works perfectly on all device sizes
- **Modern Aesthetics**: Clean, professional design with subtle animations
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 🔄 API Endpoints

### Jobs API
- `GET /api/jobs` - List jobs with search, filtering, pagination
- `POST /api/jobs` - Create new job
- `PATCH /api/jobs/:id` - Update job
- `PATCH /api/jobs/:id/reorder` - Reorder jobs (with error simulation)

### Candidates API
- `GET /api/candidates` - List candidates with search and filtering
- `POST /api/candidates` - Create candidate
- `PATCH /api/candidates/:id` - Update candidate stage
- `GET /api/candidates/:id/timeline` - Get candidate timeline

### Assessments API
- `GET /api/assessments/:jobId` - Get assessment by job
- `PUT /api/assessments/:jobId` - Create/update assessment
- `POST /api/assessments/:jobId/submit` - Submit assessment response

### Notes API
- `GET /api/candidates/:candidateId/notes` - Get candidate notes
- `POST /api/candidates/:candidateId/notes` - Create note
- `PATCH /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## 🗄️ Database Schema (IndexedDB)

### Tables
- **jobs** - Job postings with metadata
- **candidates** - Candidate information and relationships
- **candidateTimeline** - Status change tracking
- **assessments** - Assessment definitions and questions
- **assessmentResponses** - Candidate responses
- **notes** - Notes with @mentions support

### Features
- **Write-through Persistence** - All API calls persist to IndexedDB
- **State Restoration** - Complete data recovery on refresh
- **Optimized Queries** - Indexed queries for performance
- **Data Relationships** - Proper foreign key relationships

## 🎯 Advanced Features

### Network Simulation
- **Artificial Latency** - 200-1200ms random delays
- **Error Rates** - 5-10% error rate on write operations
- **Retry Logic** - Built-in retry mechanisms
- **Fallback Handling** - Graceful error recovery

### Performance Optimizations
- **Virtualization** - Handle 1000+ candidates smoothly
- **Lazy Loading** - Load data as needed
- **Caching** - Efficient data caching strategies
- **Indexing** - Optimized database queries

### User Experience
- **Optimistic Updates** - Immediate UI updates with rollback
- **Real-time Search** - Instant search results
- **Drag-and-Drop** - Intuitive stage management
- **Toast Notifications** - User feedback for all actions
- **Responsive Design** - Works on all device sizes

## 🚀 Future Enhancements

- **Real Backend Integration** - Replace MSW with actual REST APIs
- **User Authentication** - Multi-user support with roles
- **File Upload** - Resume and document uploads
- **Email Notifications** - Automated email workflows
- **Advanced Analytics** - Reporting and insights
- **Bulk Operations** - Mass candidate operations
- **Interview Scheduling** - Calendar integration
- **AI-Powered Matching** - Smart candidate-job matching

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, Input, etc.)
│   ├── layout/          # Layout components (Header, Sidebar, Layout)
│   ├── JobModal.js      # Job creation/editing modal
│   └── NotesWithMentions.js # Notes component with @mentions
├── context/             # React Context for state management
│   └── AppContext.js    # Main application context
├── db/                  # Database configuration
│   └── database.js      # Dexie IndexedDB setup
├── hooks/               # Custom React hooks
│   └── useAPI.js        # API hooks for data fetching
├── mocks/               # MSW API simulation
│   ├── browser.js       # MSW browser setup
│   └── handlers.js      # API route handlers
├── pages/               # Page components
│   ├── Dashboard.js     # Main dashboard
│   ├── JobsEnhanced.js  # Jobs list with pagination
│   ├── CandidatesEnhanced.js # Virtualized candidates list
│   ├── CandidatesKanban.js # Kanban board view
│   ├── CandidateProfileEnhanced.js # Candidate detail page
│   └── AssessmentBuilder.js # Assessment creation tool
├── services/            # API services
│   ├── api.js           # Core API functions
│   └── apiClient.js     # HTTP client wrapper
├── utils/               # Utility functions
│   ├── cn.js           # Class name utility
│   ├── generateCandidates.js # Candidate data generator
│   └── seedData.js     # Database seeding
└── App.js              # Main application component
```

## 🧪 Testing

The application includes comprehensive testing setup:

- **Unit Tests** - Component and utility testing
- **Integration Tests** - API and data flow testing
- **E2E Tests** - Full user workflow testing

## 📊 Performance Metrics

- **Bundle Size** - Optimized for production
- **Load Time** - Fast initial page load
- **Virtualization** - Smooth scrolling with 1000+ items
- **Memory Usage** - Efficient data management
- **Network Simulation** - Realistic API behavior

## 🔧 Development

### Code Quality
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript Ready** - Easy migration to TypeScript
- **Component Architecture** - Reusable, maintainable components

### State Management
- **React Context** - Centralized state management
- **Custom Hooks** - Reusable logic extraction
- **Optimistic Updates** - Immediate UI feedback
- **Error Boundaries** - Graceful error handling

## 📝 License

This project is created for demonstration purposes as part of a technical assignment.

---

**TalentFlow** - Streamlining the hiring process with modern technology, beautiful design, and advanced data management. 🚀
