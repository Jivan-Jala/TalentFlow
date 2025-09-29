import { http, HttpResponse } from 'msw';
import { jobsAPI, candidatesAPI, assessmentsAPI, notesAPI } from '../services/api';

export const handlers = [
  // Jobs API
  http.get('/api/jobs', async ({ request }) => {
    try {
      const url = new URL(request.url);
      const search = url.searchParams.get('search') || '';
      const status = url.searchParams.get('status') || '';
      const page = parseInt(url.searchParams.get('page')) || 1;
      const pageSize = parseInt(url.searchParams.get('pageSize')) || 10;
      const sort = url.searchParams.get('sort') || 'order';
      
      const result = await jobsAPI.getAll({ search, status, page, pageSize, sort });
      return HttpResponse.json(result);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 500 });
    }
  }),

  http.get('/api/jobs/:id', async ({ params }) => {
    try {
      const job = await jobsAPI.getById(params.id);
      return HttpResponse.json(job);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 404 });
    }
  }),

  http.post('/api/jobs', async ({ request }) => {
    try {
      const jobData = await request.json();
      const job = await jobsAPI.create(jobData);
      return HttpResponse.json(job, { status: 201 });
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 400 });
    }
  }),

  http.patch('/api/jobs/:id', async ({ params, request }) => {
    try {
      const updates = await request.json();
      const job = await jobsAPI.update(params.id, updates);
      return HttpResponse.json(job);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 400 });
    }
  }),

  http.patch('/api/jobs/:id/reorder', async ({ params, request }) => {
    try {
      const { fromOrder, toOrder } = await request.json();
      const result = await jobsAPI.reorder(fromOrder, toOrder);
      return HttpResponse.json(result);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 500 });
    }
  }),

  // Candidates API
  http.get('/api/candidates', async ({ request }) => {
    try {
      const url = new URL(request.url);
      const search = url.searchParams.get('search') || '';
      const stage = url.searchParams.get('stage') || '';
      const page = parseInt(url.searchParams.get('page')) || 1;
      const pageSize = parseInt(url.searchParams.get('pageSize')) || 20;
      
      const result = await candidatesAPI.getAll({ search, stage, page, pageSize });
      return HttpResponse.json(result);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 500 });
    }
  }),

  http.get('/api/candidates/:id', async ({ params }) => {
    try {
      const candidate = await candidatesAPI.getById(params.id);
      return HttpResponse.json(candidate);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 404 });
    }
  }),

  http.post('/api/candidates', async ({ request }) => {
    try {
      const candidateData = await request.json();
      const candidate = await candidatesAPI.create(candidateData);
      return HttpResponse.json(candidate, { status: 201 });
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 400 });
    }
  }),

  http.patch('/api/candidates/:id', async ({ params, request }) => {
    try {
      const updates = await request.json();
      const candidate = await candidatesAPI.update(params.id, updates);
      return HttpResponse.json(candidate);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 400 });
    }
  }),

  http.get('/api/candidates/:id/timeline', async ({ params }) => {
    try {
      const timeline = await candidatesAPI.getTimeline(params.id);
      return HttpResponse.json(timeline);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 500 });
    }
  }),

  // Assessments API
  http.get('/api/assessments/:jobId', async ({ params }) => {
    try {
      const assessment = await assessmentsAPI.getByJobId(params.jobId);
      if (!assessment) {
        return HttpResponse.json({ error: 'Assessment not found' }, { status: 404 });
      }
      return HttpResponse.json(assessment);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 500 });
    }
  }),

  http.put('/api/assessments/:jobId', async ({ params, request }) => {
    try {
      const assessmentData = await request.json();
      const assessment = await assessmentsAPI.createOrUpdate(params.jobId, assessmentData);
      return HttpResponse.json(assessment);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 400 });
    }
  }),

  http.post('/api/assessments/:jobId/submit', async ({ params, request }) => {
    try {
      const { candidateId, responses } = await request.json();
      const result = await assessmentsAPI.submitResponse(params.jobId, candidateId, responses);
      return HttpResponse.json(result, { status: 201 });
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 400 });
    }
  }),

  // Notes API
  http.get('/api/candidates/:candidateId/notes', async ({ params }) => {
    try {
      const notes = await notesAPI.getByCandidateId(params.candidateId);
      return HttpResponse.json(notes);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 500 });
    }
  }),

  http.post('/api/candidates/:candidateId/notes', async ({ params, request }) => {
    try {
      const noteData = await request.json();
      const note = await notesAPI.create(params.candidateId, noteData);
      return HttpResponse.json(note, { status: 201 });
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 400 });
    }
  }),

  http.patch('/api/notes/:id', async ({ params, request }) => {
    try {
      const updates = await request.json();
      const note = await notesAPI.update(params.id, updates);
      return HttpResponse.json(note);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 400 });
    }
  }),

  http.delete('/api/notes/:id', async ({ params }) => {
    try {
      const result = await notesAPI.delete(params.id);
      return HttpResponse.json(result);
    } catch (error) {
      return HttpResponse.json({ error: error.message }, { status: 400 });
    }
  })
];
