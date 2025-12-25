// Local storage keys
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

// Auth utility functions
export const authUtils = {
  // Save auth data to localStorage
  saveAuth: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Get user from localStorage
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Clear auth data (logout)
  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Update user data in localStorage
  updateUser: (userData) => {
    const currentUser = authUtils.getUser();
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  },
};

export default authUtils;
