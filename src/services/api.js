import { nanoid } from 'nanoid';
import db from '../db/database';

// Utility functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const randomDelay = () => delay(Math.random() * 1000 + 200); // 200-1200ms
const shouldError = () => Math.random() < 0.1; // 10% error rate

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Jobs API
export const jobsAPI = {
  async getAll(params = {}) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to fetch jobs');
    
    const { search = '', status = '', page = 1, pageSize = 10, sort = 'order' } = params;
    
    let query = db.jobs.orderBy('order');
    
    if (status && status !== 'all') {
      query = query.filter(job => job.status === status);
    }
    
    if (search) {
      query = query.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    const total = await query.count();
    const jobs = await query.offset((page - 1) * pageSize).limit(pageSize).toArray();
    
    return {
      data: jobs,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    };
  },

  async getById(id) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to fetch job');
    
    const job = await db.jobs.get(id);
    if (!job) throw new Error('Job not found');
    return job;
  },

  async create(jobData) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to create job');
    
    const job = {
      id: nanoid(),
      ...jobData,
      slug: generateSlug(jobData.title),
      status: 'active',
      order: await db.jobs.count(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await db.jobs.add(job);
    return job;
  },

  async update(id, updates) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to update job');
    
    const job = await db.jobs.get(id);
    if (!job) throw new Error('Job not found');
    
    const updatedJob = {
      ...job,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await db.jobs.put(updatedJob);
    return updatedJob;
  },

  async reorder(fromOrder, toOrder) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to reorder jobs');
    
    const jobs = await db.jobs.orderBy('order').toArray();
    
    // Move job from fromOrder to toOrder
    const jobToMove = jobs.find(job => job.order === fromOrder);
    if (!jobToMove) throw new Error('Job not found');
    
    // Update orders
    const updatedJobs = jobs.map(job => {
      if (job.order === fromOrder) {
        return { ...job, order: toOrder };
      } else if (fromOrder < toOrder && job.order > fromOrder && job.order <= toOrder) {
        return { ...job, order: job.order - 1 };
      } else if (fromOrder > toOrder && job.order < fromOrder && job.order >= toOrder) {
        return { ...job, order: job.order + 1 };
      }
      return job;
    });
    
    await db.jobs.bulkPut(updatedJobs);
    return { success: true };
  }
};

// Candidates API
export const candidatesAPI = {
  async getAll(params = {}) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to fetch candidates');
    
    const { search = '', stage = '', page = 1, pageSize = 20 } = params;
    
    let query = db.candidates.orderBy('createdAt');
    
    if (stage && stage !== 'all') {
      query = query.filter(candidate => candidate.stage === stage);
    }
    
    if (search) {
      query = query.filter(candidate => 
        candidate.name.toLowerCase().includes(search.toLowerCase()) ||
        candidate.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    const total = await query.count();
    const candidates = await query.offset((page - 1) * pageSize).limit(pageSize).toArray();
    
    return {
      data: candidates,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    };
  },

  async getById(id) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to fetch candidate');
    
    const candidate = await db.candidates.get(id);
    if (!candidate) throw new Error('Candidate not found');
    return candidate;
  },

  async create(candidateData) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to create candidate');
    
    const candidate = {
      id: nanoid(),
      ...candidateData,
      stage: 'applied',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await db.candidates.add(candidate);
    
    // Add to timeline
    await db.candidateTimeline.add({
      id: nanoid(),
      candidateId: candidate.id,
      stage: 'applied',
      status: 'applied',
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    });
    
    return candidate;
  },

  async update(id, updates) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to update candidate');
    
    const candidate = await db.candidates.get(id);
    if (!candidate) throw new Error('Candidate not found');
    
    const updatedCandidate = {
      ...candidate,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await db.candidates.put(updatedCandidate);
    
    // Add to timeline if stage changed
    if (updates.stage && updates.stage !== candidate.stage) {
      await db.candidateTimeline.add({
        id: nanoid(),
        candidateId: id,
        stage: updates.stage,
        status: updates.stage,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString()
      });
    }
    
    return updatedCandidate;
  },

  async getTimeline(candidateId) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to fetch timeline');
    
    const timeline = await db.candidateTimeline
      .where('candidateId')
      .equals(candidateId)
      .orderBy('date')
      .toArray();
    
    return timeline;
  }
};

// Assessments API
export const assessmentsAPI = {
  async getByJobId(jobId) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to fetch assessment');
    
    const assessment = await db.assessments.where('jobId').equals(jobId).first();
    return assessment;
  },

  async createOrUpdate(jobId, assessmentData) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to save assessment');
    
    const existing = await db.assessments.where('jobId').equals(jobId).first();
    
    if (existing) {
      const updated = {
        ...existing,
        ...assessmentData,
        updatedAt: new Date().toISOString()
      };
      await db.assessments.put(updated);
      return updated;
    } else {
      const assessment = {
        id: nanoid(),
        jobId,
        ...assessmentData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await db.assessments.add(assessment);
      return assessment;
    }
  },

  async submitResponse(assessmentId, candidateId, responses) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to submit assessment');
    
    const response = {
      id: nanoid(),
      assessmentId,
      candidateId,
      responses,
      submittedAt: new Date().toISOString()
    };
    
    await db.assessmentResponses.add(response);
    return response;
  }
};

// Notes API
export const notesAPI = {
  async getByCandidateId(candidateId) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to fetch notes');
    
    const notes = await db.notes
      .where('candidateId')
      .equals(candidateId)
      .orderBy('createdAt')
      .reverse()
      .toArray();
    
    return notes;
  },

  async create(candidateId, noteData) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to create note');
    
    const note = {
      id: nanoid(),
      candidateId,
      ...noteData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await db.notes.add(note);
    return note;
  },

  async update(id, updates) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to update note');
    
    const note = await db.notes.get(id);
    if (!note) throw new Error('Note not found');
    
    const updatedNote = {
      ...note,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await db.notes.put(updatedNote);
    return updatedNote;
  },

  async delete(id) {
    await randomDelay();
    if (shouldError()) throw new Error('Failed to delete note');
    
    await db.notes.delete(id);
    return { success: true };
  }
};
