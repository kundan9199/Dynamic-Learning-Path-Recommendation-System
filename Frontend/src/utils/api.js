const API_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  getMe: async (token) => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  updateProfile: async (token, userData) => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
};

// Course API calls
export const courseAPI = {
  getAllCourses: async () => {
    const response = await fetch(`${API_URL}/courses`);
    return handleResponse(response);
  },

  getCourse: async (id) => {
    const response = await fetch(`${API_URL}/courses/${id}`);
    return handleResponse(response);
  },

  enrollCourse: async (token, courseId) => {
    const response = await fetch(`${API_URL}/courses/${courseId}/enroll`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

// Progress API calls
export const progressAPI = {
  updateProgress: async (token, courseId, lessonId) => {
    const response = await fetch(`${API_URL}/progress/${courseId}/lesson/${lessonId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  submitQuiz: async (token, courseId, quizData) => {
    const response = await fetch(`${API_URL}/progress/${courseId}/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(quizData),
    });
    return handleResponse(response);
  },
};

export default {
  authAPI,
  courseAPI,
  progressAPI,
};
