// Utility to generate more candidate data for testing
export const generateCandidates = (count = 1000) => {
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

  const skills = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go',
    'TypeScript', 'JavaScript', 'HTML', 'CSS', 'SASS', 'LESS', 'Webpack', 'Babel', 'ESLint', 'Prettier',
    'Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
    'GraphQL', 'REST API', 'Microservices', 'CI/CD', 'Jenkins', 'GitLab', 'GitHub Actions', 'Terraform', 'Ansible', 'Linux',
    'UX Design', 'UI Design', 'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'InVision', 'Principle', 'Framer',
    'Product Management', 'Agile', 'Scrum', 'Kanban', 'Jira', 'Confluence', 'Slack', 'Trello', 'Asana', 'Notion'
  ];

  const companies = [
    'TechCorp', 'DesignStudio', 'DataFlow', 'InnovateCorp', 'CloudTech', 'StartupXYZ', 'Enterprise Inc', 'Digital Agency',
    'Software Solutions', 'Web Development Co', 'Mobile First', 'AI Innovations', 'Blockchain Labs', 'Cloud Solutions',
    'DevOps Experts', 'Frontend Masters', 'Backend Heroes', 'Full Stack Inc', 'UI/UX Studio', 'Product Co'
  ];

  const stages = ['1', '2', '3', '4', '5'];
  const stageNames = ['applied', 'screening', 'interview', 'offer', 'hired'];

  const candidates = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;
    
    const candidateSkills = skills
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 5) + 3);

    const currentStage = stages[Math.floor(Math.random() * stages.length)];
    const appliedDate = new Date(2024, 0, Math.floor(Math.random() * 30) + 1);
    
    const stagesData = {};
    for (let j = 1; j <= parseInt(currentStage); j++) {
      const stageDate = new Date(appliedDate);
      stageDate.setDate(stageDate.getDate() + (j - 1) * 2);
      stagesData[j] = {
        status: stageNames[j - 1],
        date: stageDate.toISOString().split('T')[0]
      };
    }

    const candidate = {
      id: (i + 3).toString(), // Start from 3 to avoid conflicts with existing data
      name,
      email,
      phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      experience: `${Math.floor(Math.random() * 8) + 1} years`,
      skills: candidateSkills,
      appliedJobs: [Math.floor(Math.random() * 5) + 1].toString(),
      currentStage,
      stages: stagesData,
      notes: Math.random() > 0.7 ? [{
        id: '1',
        content: `Initial review completed, @hr-team please follow up`,
        author: 'Recruiter',
        date: appliedDate.toISOString().split('T')[0],
        mentions: ['hr-team']
      }] : [],
      resume: `${firstName.toLowerCase()}-${lastName.toLowerCase()}-resume.pdf`,
      linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      portfolio: Math.random() > 0.5 ? `https://${firstName.toLowerCase()}${lastName.toLowerCase()}.dev` : null
    };

    candidates.push(candidate);
  }

  return candidates;
};
