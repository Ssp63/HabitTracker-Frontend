
import api from './api';

const getHabits = async () => {
  try {
    const response = await api.get('/habits');
    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
};

const createHabit = async (habitData) => {
  try {
    const response = await api.post('/habits', habitData);
    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
};

const trackHabit = async (habitId) => {
  try {
    const response = await api.post(`/habits/${habitId}/track`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
};

const getHabitById = async (habitId) => {
  try {
    const response = await api.get(`/habits/${habitId}`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
};


const getHabitStats = async (habitId) => {
  try {
    const response = await api.get(`/habits/${habitId}/stats`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
};

const getChartData = async (period = '30d') => {
  try {
    const response = await api.get(`/habits/chart-data?period=${period}`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
};

const deleteHabit = async (habitId) => {
  try {
    const response = await api.delete(`/habits/${habitId}`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
};

const migrateExistingCompletions = async () => {
  try {
    const response = await api.post('/habits/migrate-completions');
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
};

const getOverallUserStats = async () => {
  try {
    const response = await api.get('/habits/overall-stats');
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    throw new Error(message);
  }
};

const habitService = {
  getHabits,
  createHabit,
  trackHabit,
  getHabitById,
  getHabitStats,
  getChartData,
  deleteHabit,
  migrateExistingCompletions,
  getOverallUserStats,
};

export default habitService;