
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/auth";

/**
 * User signup with email/password
 */
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Signup failed" };
  }
};

/**
 * User login with email/password
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};

/**
 * Google Sign-In (OAuth)
 * @param {string} googleToken — token received from Google after login
 */
export const googleLogin = async (googleToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/google`, { token: googleToken });
    return response.data; // usually returns user + JWT
  } catch (error) {
    console.error("Google login error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Google login failed" };
  }
};

/**
 * Logout
 */
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

/**
 * Save user info locally
 */
export const saveUserData = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

/**
 * Get current user from local storage
 */
export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

// src/services/authService.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth";

const authService = {

  // 1️⃣ Request password reset email
  requestPasswordReset: async (email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
      return response.data; // expected: { message: "Email sent" }
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error.response?.data || { message: "Something went wrong" };
    }
  },

  // 2️⃣ Reset password using token
  resetPassword: async (token, newPassword) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password/${token}`, { password: newPassword });
      return response.data; // expected: { message: "Password reset successful" }
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error.response?.data || { message: "Something went wrong" };
    }
  },

  // 3️⃣ Optional: Login function (already might exist)
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      return response.data; // expected: { token, user }
    } catch (error) {
      console.error("Login error:", error);
      throw error.response?.data || { message: "Login failed" };
    }
  },

  // 4️⃣ Optional: Signup function (already might exist)
  signup: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, { name, email, password });
      return response.data; // expected: { token, user }
    } catch (error) {
      console.error("Signup error:", error);
      throw error.response?.data || { message: "Signup failed" };
    }
  }

};

export default authService;

