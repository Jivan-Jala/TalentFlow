import Dexie from 'dexie';

export const db = new Dexie('TalentFlowDB');

db.version(1).stores({
  jobs: 'id, title, slug, status, order, createdAt, updatedAt',
  candidates: 'id, name, email, stage, jobId, createdAt, updatedAt',
  candidateTimeline: 'id, candidateId, stage, status, date, createdAt',
  assessments: 'id, jobId, title, questions, createdAt, updatedAt',
  assessmentResponses: 'id, assessmentId, candidateId, responses, submittedAt',
  notes: 'id, candidateId, content, author, mentions, createdAt, updatedAt'
});

// Add indexes for better query performance
db.version(2).stores({
  jobs: 'id, title, slug, status, order, createdAt, updatedAt, [status+order]',
  candidates: 'id, name, email, stage, jobId, createdAt, updatedAt, [stage+jobId]',
  candidateTimeline: 'id, candidateId, stage, status, date, createdAt, [candidateId+date]',
  assessments: 'id, jobId, title, questions, createdAt, updatedAt, [jobId]',
  assessmentResponses: 'id, assessmentId, candidateId, responses, submittedAt, [assessmentId+candidateId]',
  notes: 'id, candidateId, content, author, mentions, createdAt, updatedAt, [candidateId+createdAt]'
});

export default db;
