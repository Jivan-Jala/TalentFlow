import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/ui/Toast';
import { worker } from './mocks/browser';
import { seedDatabase } from './utils/seedData';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { JobsEnhanced } from './pages/JobsEnhanced';
import { JobDetail } from './pages/JobDetail';
import { JobForm } from './pages/JobForm';
import { Candidates } from './pages/Candidates';
import { CandidatesEnhanced } from './pages/CandidatesEnhanced';
import { CandidatesKanban } from './pages/CandidatesKanban';
import { CandidateDetail } from './pages/CandidateDetail';
import { CandidateProfileEnhanced } from './pages/CandidateProfileEnhanced';
import { Assessments } from './pages/Assessments';
import { AssessmentForm } from './pages/AssessmentForm';
import { AssessmentBuilder } from './pages/AssessmentBuilder';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Home } from './pages/Home';

function App() {
  useEffect(() => {
    // Initialize MSW and seed data
    const initializeApp = async () => {
      try {
        // Start MSW worker
        await worker.start({
          onUnhandledRequest: 'bypass',
          serviceWorker: {
            url: '/mockServiceWorker.js',
          },
        });
      } catch (error) {
        console.warn('MSW failed to start:', error);
        // Continue without MSW if it fails
      }
      
      // Check if data already exists
      const db = (await import('./db/database')).default;
      const jobCount = await db.jobs.count();
      
      // Only seed if no data exists
      if (jobCount === 0) {
        console.log('Seeding database with initial data...');
        await seedDatabase();
      }
    };
    
    initializeApp().catch(console.error);
  }, []);

  return (
    <ThemeProvider>
      <AppProvider>
        <ToastProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="jobs" element={<JobsEnhanced />} />
                <Route path="jobs/new" element={<JobForm />} />
                <Route path="jobs/:id/edit" element={<JobForm />} />
                <Route path="jobs/:id" element={<JobDetail />} />
                <Route path="candidates" element={<CandidatesEnhanced />} />
                <Route path="candidates/kanban" element={<CandidatesKanban />} />
                <Route path="candidates/:id/legacy" element={<CandidateDetail />} />
                <Route path="candidates/:id" element={<CandidateProfileEnhanced />} />
                <Route path="assessments" element={<Assessments />} />
                <Route path="assessments/new" element={<AssessmentForm />} />
                <Route path="assessments/:id/builder" element={<AssessmentBuilder />} />
                <Route path="assessments/:id/edit" element={<AssessmentForm />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </Router>
        </ToastProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
