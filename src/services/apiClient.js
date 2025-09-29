// API Client for making HTTP requests to our MSW handlers
const API_BASE = '/api';

const apiClient = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }
    
    return response.json();
  },

  // Jobs API
  jobs: {
    async getAll(params = {}) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, value);
        }
      });
      
      const queryString = searchParams.toString();
      const endpoint = queryString ? `/jobs?${queryString}` : '/jobs';
      
      return this.request(endpoint);
    },

    async getById(id) {
      return this.request(`/jobs/${id}`);
    },

    async create(jobData) {
      return this.request('/jobs', {
        method: 'POST',
        body: jobData,
      });
    },

    async update(id, updates) {
      return this.request(`/jobs/${id}`, {
        method: 'PATCH',
        body: updates,
      });
    },

    async reorder(id, fromOrder, toOrder) {
      return this.request(`/jobs/${id}/reorder`, {
        method: 'PATCH',
        body: { fromOrder, toOrder },
      });
    },
  },

  // Candidates API
  candidates: {
    async getAll(params = {}) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, value);
        }
      });
      
      const queryString = searchParams.toString();
      const endpoint = queryString ? `/candidates?${queryString}` : '/candidates';
      
      return this.request(endpoint);
    },

    async getById(id) {
      return this.request(`/candidates/${id}`);
    },

    async create(candidateData) {
      return this.request('/candidates', {
        method: 'POST',
        body: candidateData,
      });
    },

    async update(id, updates) {
      return this.request(`/candidates/${id}`, {
        method: 'PATCH',
        body: updates,
      });
    },

    async getTimeline(id) {
      return this.request(`/candidates/${id}/timeline`);
    },
  },

  // Assessments API
  assessments: {
    async getByJobId(jobId) {
      return this.request(`/assessments/${jobId}`);
    },

    async createOrUpdate(jobId, assessmentData) {
      return this.request(`/assessments/${jobId}`, {
        method: 'PUT',
        body: assessmentData,
      });
    },

    async submitResponse(jobId, candidateId, responses) {
      return this.request(`/assessments/${jobId}/submit`, {
        method: 'POST',
        body: { candidateId, responses },
      });
    },
  },

  // Notes API
  notes: {
    async getByCandidateId(candidateId) {
      return this.request(`/candidates/${candidateId}/notes`);
    },

    async create(candidateId, noteData) {
      return this.request(`/candidates/${candidateId}/notes`, {
        method: 'POST',
        body: noteData,
      });
    },

    async update(id, updates) {
      return this.request(`/notes/${id}`, {
        method: 'PATCH',
        body: updates,
      });
    },

    async delete(id) {
      return this.request(`/notes/${id}`, {
        method: 'DELETE',
      });
    },
  },
};

export default apiClient;
