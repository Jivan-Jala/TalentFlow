import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';

// Generic hook for API calls with loading and error states
export const useAPI = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    if (dependencies.length === 0) {
      execute();
    }
  }, [execute, ...dependencies]);

  return { data, loading, error, execute };
};

// Jobs hooks
export const useJobs = (params = {}) => {
  return useAPI(() => apiClient.jobs.getAll(params), [JSON.stringify(params)]);
};

export const useJob = (id) => {
  return useAPI(() => apiClient.jobs.getById(id), [id]);
};

export const useCreateJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (jobData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.jobs.create(jobData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

export const useUpdateJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (id, updates) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.jobs.update(id, updates);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

export const useReorderJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reorder = async (id, fromOrder, toOrder) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.jobs.reorder(id, fromOrder, toOrder);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { reorder, loading, error };
};

// Candidates hooks
export const useCandidates = (params = {}) => {
  return useAPI(() => apiClient.candidates.getAll(params), [JSON.stringify(params)]);
};

export const useCandidate = (id) => {
  return useAPI(() => apiClient.candidates.getById(id), [id]);
};

export const useCandidateTimeline = (id) => {
  return useAPI(() => apiClient.candidates.getTimeline(id), [id]);
};

export const useCreateCandidate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (candidateData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.candidates.create(candidateData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

export const useUpdateCandidate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (id, updates) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.candidates.update(id, updates);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

// Assessments hooks
export const useAssessment = (jobId) => {
  return useAPI(() => apiClient.assessments.getByJobId(jobId), [jobId]);
};

export const useCreateOrUpdateAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrUpdate = async (jobId, assessmentData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.assessments.createOrUpdate(jobId, assessmentData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createOrUpdate, loading, error };
};

export const useSubmitAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (jobId, candidateId, responses) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.assessments.submitResponse(jobId, candidateId, responses);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
};

// Notes hooks
export const useNotes = (candidateId) => {
  return useAPI(() => apiClient.notes.getByCandidateId(candidateId), [candidateId]);
};

export const useCreateNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (candidateId, noteData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.notes.create(candidateId, noteData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

export const useUpdateNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (id, updates) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.notes.update(id, updates);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

export const useDeleteNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteNote = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.notes.delete(id);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteNote, loading, error };
};
