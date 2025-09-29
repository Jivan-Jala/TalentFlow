import { nanoid } from 'nanoid';
import db from '../db/database';

const firstNames = [
  'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'James', 'Jessica', 'Robert', 'Ashley',
  'William', 'Amanda', 'Richard', 'Jennifer', 'Charles', 'Lisa', 'Joseph', 'Michelle', 'Thomas', 'Kimberly',
  'Christopher', 'Donna', 'Daniel', 'Carol', 'Paul', 'Sandra', 'Mark', 'Ruth', 'Donald', 'Sharon',
  'Steven', 'Laura', 'Andrew', 'Nancy', 'Joshua', 'Deborah', 'Kenneth', 'Dorothy', 'Kevin', 'Amy',
  'Brian', 'Angela', 'George', 'Helen', 'Edward', 'Diane', 'Ronald', 'Brenda', 'Timothy', 'Pamela'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
];

const companies = [
  'TechCorp', 'DesignStudio', 'DataFlow', 'InnovateCorp', 'CloudTech', 'StartupXYZ', 'Enterprise Inc', 'Digital Agency',
  'Software Solutions', 'Web Development Co', 'Mobile First', 'AI Innovations', 'Blockchain Labs', 'Cloud Solutions',
  'DevOps Experts', 'Frontend Masters', 'Backend Heroes', 'Full Stack Inc', 'UI/UX Studio', 'Product Co',
  'CodeCraft', 'PixelPerfect', 'DataDriven', 'FutureTech', 'NextGen'
];

const jobTitles = [
  'Senior Frontend Developer', 'UX Designer', 'Backend Engineer', 'Product Manager', 'DevOps Engineer',
  'Full Stack Developer', 'UI Designer', 'Data Scientist', 'Mobile Developer', 'QA Engineer',
  'Technical Lead', 'Software Architect', 'Scrum Master', 'Business Analyst', 'System Administrator',
  'Cloud Engineer', 'Security Specialist', 'Machine Learning Engineer', 'Blockchain Developer', 'Game Developer',
  'iOS Developer', 'Android Developer', 'React Developer', 'Vue.js Developer', 'Angular Developer'
];

const skills = [
  'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go',
  'TypeScript', 'JavaScript', 'HTML', 'CSS', 'SASS', 'LESS', 'Webpack', 'Babel', 'ESLint', 'Prettier',
  'Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  'GraphQL', 'REST API', 'Microservices', 'CI/CD', 'Jenkins', 'GitLab', 'GitHub Actions', 'Terraform', 'Ansible', 'Linux',
  'UX Design', 'UI Design', 'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'InVision', 'Principle', 'Framer',
  'Product Management', 'Agile', 'Scrum', 'Kanban', 'Jira', 'Confluence', 'Slack', 'Trello', 'Asana', 'Notion'
];

const locations = [
  'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA',
  'Chicago, IL', 'Denver, CO', 'Miami, FL', 'Portland, OR', 'Remote',
  'Los Angeles, CA', 'San Diego, CA', 'Phoenix, AZ', 'Dallas, TX', 'Houston, TX'
];

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];
const statuses = ['active', 'archived'];
const stages = ['applied', 'screen', 'tech', 'offer', 'hired', 'rejected'];

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const generateRandomName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

const generateRandomEmail = (name) => {
  const [firstName, lastName] = name.toLowerCase().split(' ');
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName}.${lastName}@${domain}`;
};

const generateRandomSkills = () => {
  const numSkills = Math.floor(Math.random() * 5) + 3; // 3-7 skills
  return skills
    .sort(() => 0.5 - Math.random())
    .slice(0, numSkills);
};

const generateJob = (index) => {
  const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const type = jobTypes[Math.floor(Math.random() * jobTypes.length)];
  const status = Math.random() > 0.2 ? 'active' : 'archived'; // 80% active
  
  return {
    id: nanoid(),
    title,
    company,
    location,
    type,
    status,
    slug: generateSlug(title),
    description: `We are looking for a ${title.toLowerCase()} to join our team. This role involves working on exciting projects and collaborating with talented professionals.`,
    requirements: [
      `${Math.floor(Math.random() * 5) + 2}+ years experience`,
      'Strong communication skills',
      'Team player mentality',
      'Problem-solving abilities'
    ],
    salary: `₹${Math.floor(Math.random() * 1000000) + 500000} - ₹${Math.floor(Math.random() * 1000000) + 1000000}`,
    tags: generateRandomSkills().slice(0, 3),
    applicants: Math.floor(Math.random() * 50) + 5,
    postedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    order: index,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

const generateCandidate = (index, jobIds) => {
  const name = generateRandomName();
  const email = generateRandomEmail(name);
  const stage = stages[Math.floor(Math.random() * stages.length)];
  const jobId = jobIds[Math.floor(Math.random() * jobIds.length)];
  const appliedDate = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000);
  
  return {
    id: nanoid(),
    name,
    email,
    phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    experience: `${Math.floor(Math.random() * 8) + 1} years`,
    skills: generateRandomSkills(),
    stage,
    jobId,
    appliedJobs: [jobId],
    currentStage: stage,
    stages: {
      [stage]: {
        status: stage,
        date: appliedDate.toISOString().split('T')[0]
      }
    },
    notes: Math.random() > 0.7 ? [{
      id: nanoid(),
      content: 'Initial review completed, @hr-team please follow up',
      author: 'Recruiter',
      date: appliedDate.toISOString().split('T')[0],
      mentions: ['hr-team']
    }] : [],
    resume: `${name.toLowerCase().replace(' ', '-')}-resume.pdf`,
    linkedin: `https://linkedin.com/in/${name.toLowerCase().replace(' ', '')}`,
    portfolio: Math.random() > 0.5 ? `https://${name.toLowerCase().replace(' ', '')}.dev` : null,
    createdAt: appliedDate.toISOString(),
    updatedAt: appliedDate.toISOString()
  };
};

const generateAssessment = (jobId, index) => {
  const questionTypes = ['single-choice', 'multi-choice', 'short-text', 'long-text', 'numeric'];
  const questions = [];
  
  // Generate 10+ questions
  const numQuestions = Math.floor(Math.random() * 5) + 10; // 10-14 questions
  
  for (let i = 0; i < numQuestions; i++) {
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const question = {
      id: nanoid(),
      type,
      title: `Question ${i + 1}: ${type === 'single-choice' ? 'What is your experience with React?' : 
                              type === 'multi-choice' ? 'Which technologies do you know?' :
                              type === 'short-text' ? 'What is your preferred programming language?' :
                              type === 'long-text' ? 'Describe your experience with web development' :
                              'How many years of experience do you have?'}`,
      description: type === 'long-text' ? 'Please provide a detailed response' : '',
      required: Math.random() > 0.3,
      options: (type === 'single-choice' || type === 'multi-choice') ? [
        { id: nanoid(), text: 'Option 1' },
        { id: nanoid(), text: 'Option 2' },
        { id: nanoid(), text: 'Option 3' },
        { id: nanoid(), text: 'Option 4' }
      ] : [],
      validation: {
        maxLength: type === 'short-text' ? 100 : type === 'long-text' ? 1000 : null,
        minValue: type === 'numeric' ? 0 : null,
        maxValue: type === 'numeric' ? 20 : null
      }
    };
    questions.push(question);
  }
  
  return {
    id: nanoid(),
    jobId,
    title: `Assessment for Job ${index + 1}`,
    description: 'This assessment evaluates your technical skills and knowledge.',
    questions,
    timeLimit: Math.floor(Math.random() * 60) + 30, // 30-90 minutes
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const seedDatabase = async () => {
  try {
    // Clear existing data
    await db.jobs.clear();
    await db.candidates.clear();
    await db.candidateTimeline.clear();
    await db.assessments.clear();
    await db.assessmentResponses.clear();
    await db.notes.clear();
    
    // Generate jobs
    const jobs = [];
    for (let i = 0; i < 25; i++) {
      jobs.push(generateJob(i));
    }
    
    // Add 3 additional specific jobs
    const additionalJobs = [
      {
        id: nanoid(),
        title: 'Senior React Developer',
        company: 'MetaTech Solutions',
        location: 'San Francisco, CA',
        type: 'Full-time',
        status: 'active',
        slug: 'senior-react-developer',
        description: 'We are seeking an experienced React developer to join our innovative team. You will work on cutting-edge web applications using React, TypeScript, and modern development practices. This role offers the opportunity to work with a talented team on exciting projects that impact millions of users.',
        requirements: [
          '5+ years of React development experience',
          'Strong proficiency in TypeScript',
          'Experience with state management (Redux, Zustand)',
          'Knowledge of modern build tools (Webpack, Vite)',
          'Experience with testing frameworks (Jest, React Testing Library)',
          'Strong problem-solving and communication skills'
        ],
        salary: '₹12,00,000 - ₹16,00,000',
        tags: ['React', 'TypeScript', 'JavaScript', 'Frontend', 'Web Development'],
        applicants: 23,
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        order: 25,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: nanoid(),
        title: 'DevOps Engineer',
        company: 'CloudScale Inc',
        location: 'Remote',
        type: 'Full-time',
        status: 'active',
        slug: 'devops-engineer',
        description: 'Join our DevOps team to build and maintain scalable cloud infrastructure. You will work with AWS, Kubernetes, and modern CI/CD pipelines to support our growing platform. This role offers the opportunity to work with cutting-edge cloud technologies and contribute to our infrastructure automation.',
        requirements: [
          '3+ years of DevOps experience',
          'Strong knowledge of AWS services',
          'Experience with Kubernetes and Docker',
          'Proficiency in Infrastructure as Code (Terraform)',
          'Experience with CI/CD pipelines (GitHub Actions, Jenkins)',
          'Knowledge of monitoring and logging tools',
          'Strong scripting skills (Python, Bash)'
        ],
        salary: '₹11,00,000 - ₹15,00,000',
        tags: ['DevOps', 'AWS', 'Kubernetes', 'Docker', 'Terraform'],
        applicants: 18,
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        order: 26,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: nanoid(),
        title: 'UX/UI Designer',
        company: 'DesignStudio Pro',
        location: 'New York, NY',
        type: 'Full-time',
        status: 'active',
        slug: 'ux-ui-designer',
        description: 'We are looking for a creative UX/UI Designer to join our design team. You will be responsible for creating intuitive and engaging user experiences for our digital products. This role involves user research, wireframing, prototyping, and collaborating with development teams to bring designs to life.',
        requirements: [
          '4+ years of UX/UI design experience',
          'Proficiency in Figma, Sketch, and Adobe Creative Suite',
          'Experience with user research and usability testing',
          'Strong portfolio showcasing UX/UI design skills',
          'Knowledge of design systems and component libraries',
          'Experience with prototyping tools (Framer, Principle)',
          'Excellent communication and collaboration skills'
        ],
        salary: '₹8,50,000 - ₹12,00,000',
        tags: ['UX Design', 'UI Design', 'Figma', 'User Research', 'Prototyping'],
        applicants: 31,
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        order: 27,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    jobs.push(...additionalJobs);
    await db.jobs.bulkAdd(jobs);
    
    // Generate candidates
    const candidates = [];
    const jobIds = jobs.map(job => job.id);
    
    for (let i = 0; i < 1000; i++) {
      candidates.push(generateCandidate(i, jobIds));
    }
    await db.candidates.bulkAdd(candidates);
    
    // Generate candidate timeline entries
    const timelineEntries = [];
    candidates.forEach(candidate => {
      if (candidate.stages[candidate.stage]) {
        timelineEntries.push({
          id: nanoid(),
          candidateId: candidate.id,
          stage: candidate.stage,
          status: candidate.stage,
          date: candidate.stages[candidate.stage].date,
          createdAt: candidate.createdAt
        });
      }
    });
    await db.candidateTimeline.bulkAdd(timelineEntries);
    
    // Generate assessments for some jobs
    const assessments = [];
    const selectedJobIds = jobIds.slice(0, 3); // 3 assessments
    
    selectedJobIds.forEach((jobId, index) => {
      assessments.push(generateAssessment(jobId, index));
    });
    await db.assessments.bulkAdd(assessments);
    
    // Generate notes for some candidates
    const notes = [];
    candidates.slice(0, 200).forEach(candidate => {
      if (Math.random() > 0.5) {
        notes.push({
          id: nanoid(),
          candidateId: candidate.id,
          content: `Note for ${candidate.name}: ${Math.random() > 0.5 ? 'Strong candidate, @hr-team please schedule interview' : 'Needs follow-up, @tech-team review technical skills'}`,
          author: 'Recruiter',
          mentions: Math.random() > 0.5 ? ['hr-team'] : ['tech-team'],
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    });
    await db.notes.bulkAdd(notes);
    
    console.log('Database seeded successfully!');
    console.log(`- ${jobs.length} jobs created (25 generated + 3 additional)`);
    console.log(`- ${candidates.length} candidates created`);
    console.log(`- ${timelineEntries.length} timeline entries created`);
    console.log(`- ${assessments.length} assessments created`);
    console.log(`- ${notes.length} notes created`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
