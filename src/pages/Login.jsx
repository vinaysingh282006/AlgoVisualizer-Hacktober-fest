
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowLeft } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { useGoogleAuth } from "../contexts/GoogleAuthContext";
import "../styles/Login.css";
import { GoogleLogin } from "@react-oauth/google";


// 🔹 Helper function for password validation
const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("Add at least one uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("Add at least one lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("Add at least one number");
  if (!/[!@#$%^&*]/.test(password)) errors.push("Add at least one special symbol (!@#$%^&*)");
  return errors;
};

const Login = () => {
  const { theme } = useTheme();
  const { renderGoogleButton } = useGoogleAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

   // 🔹 New state for password validation messages
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Validate password on form submit
    const errors = validatePassword(formData.password);
    setPasswordErrors(errors);

    if (errors.length === 0) {
      console.log("Login attempt:", formData);
      // proceed with login logic here
    } else {
      console.log("Password errors:", errors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
   // 🔹 Real-time password validation
    if (name === "password") {
      setPasswordErrors(validatePassword(value));
    }
  };
  const isDark = theme === "dark";

  useEffect(() => {
    renderGoogleButton('google-signin-button');
  }, [renderGoogleButton]);

  return (
    <div className={`login-container ${isDark ? "login-dark" : "login-light"}`}>
      {/* Back Button */}
      <Link to="/" className="login-back-button">
        <ArrowLeft className="back-icon" />
        Back to home
      </Link>

      <div className="login-wrapper">
        {/* Header */}
        <div className="login-header">
          <div className="login-icon-container">
            <LogIn className="login-icon" />
          </div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Login Form */}
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <Mail className="icon" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <Lock className="icon" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="toggle-icon" />
                  ) : (
                    <Eye className="toggle-icon" />
                  )}
                </button>
              </div>

               {/* 🔹 Real-time Password Validation Feedback */}
              {passwordErrors.length > 0 && (
                <ul className="password-errors">
                  {passwordErrors.map((err, idx) => (
                    <li key={idx} className="error-text">
                      ❌ {err}
                    </li>
                  ))}
                </ul>
              )}
            </div>
              
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <div className="remember-me">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="checkbox"
                />
                <label htmlFor="rememberMe" className="checkbox-label">
                  Remember me
                </label>
              </div>

              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              Sign in
            </button>

            {/* Sign Up Link */}
            <div className="signup-link">
              <p className="signup-text">
                Don't have an account?{" "}
                <Link to="/signup" className="signup-action">
                  Sign up
                </Link>
              </p>
            </div>
          </form>

          {/* Separator */}
          <div className="separator">
            <span className="separator-text">or</span>
          </div>

          {/* Google Sign-In Button */}
          <div className="google-signin-container">
            <div id="google-signin-button"></div>
          </div>

          {/* Demo Credentials */}
          <div className="demo-section">
            <p className="demo-text">
              <strong>Demo:</strong> demo@example.com / demo123
            </p>
          </div>
          <div className="google-login">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log("Google login success:", credentialResponse);
              }}
              onError={() => {
                console.log("Google login failed");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
