import React from "react";

const RoutingSection = ({ copyCode, copiedCode }) => {
  const reactRouterBasics = `// React Router - Client-side routing for React applications

// Installation
npm install react-router-dom

// Basic Setup
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

// Page Components
function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function Contact() {
  return <h1>Contact Page</h1>;
}`;

  const navigationComponents = `// Navigation Components

import { Link, NavLink, useNavigate } from 'react-router-dom';

// 1. Link Component
function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/users/123">User Profile</Link>
    </nav>
  );
}

// 2. NavLink Component (with active styling)
function Navigation() {
  return (
    <nav>
      <NavLink 
        to="/" 
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'blue'
        })}
      >
        Home
      </NavLink>
      <NavLink 
        to="/about"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        About
      </NavLink>
    </nav>
  );
}

// 3. Programmatic Navigation
function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      navigate('/dashboard'); // Navigate to dashboard after login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <form onSubmit={handleLogin}>
      {/* form fields */}
      <button type="submit">Login</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
}`;

  const routeParameters = `// Route Parameters and Query Strings

import { Routes, Route, useParams, useSearchParams } from 'react-router-dom';

// 1. URL Parameters
function App() {
  return (
    <Routes>
      <Route path="/users/:userId" element={<UserProfile />} />
      <Route path="/posts/:postId/comments/:commentId" element={<Comment />} />
    </Routes>
  );
}

function UserProfile() {
  const { userId } = useParams();
  
  return <h1>User Profile: {userId}</h1>;
}

function Comment() {
  const { postId, commentId } = useParams();
  
  return (
    <div>
      <h2>Post: {postId}</h2>
      <h3>Comment: {commentId}</h3>
    </div>
  );
}

// 2. Query Parameters
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const category = searchParams.get('category');

  const updateSearch = (newQuery, newCategory) => {
    setSearchParams({
      q: newQuery,
      category: newCategory
    });
  };

  return (
    <div>
      <h1>Search Results</h1>
      <p>Query: {query}</p>
      <p>Category: {category}</p>
      <button onClick={() => updateSearch('react', 'tutorials')}>
        Search React Tutorials
      </button>
    </div>
  );
}

// 3. Nested Routes
function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      <Outlet /> {/* Renders child routes */}
    </div>
  );
}`;

  const protectedRoutes = `// Protected Routes and Authentication

import { Navigate, useLocation } from 'react-router-dom';

// 1. Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth(); // Your auth hook
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// 2. Public Route Component (redirect if authenticated)
function PublicRoute({ children }) {
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// 3. Using Protected Routes
function App() {
  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

// 4. Role-based Access
function RoleBasedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  
  if (!user || !user.roles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// Usage
<Route path="/admin" element={
  <RoleBasedRoute requiredRole="admin">
    <AdminPanel />
  </RoleBasedRoute>
} />`;

  const routingPatterns = `// Advanced Routing Patterns

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// 1. Route Guards with Hooks
function useRequireAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { from: location },
        replace: true 
      });
    }
  }, [isAuthenticated, navigate, location]);

  return isAuthenticated;
}

// 2. Lazy Loading Routes
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// 3. Route-based Code Splitting
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

// 4. Custom Route Component
function CustomRoute({ 
  path, 
  element, 
  requiresAuth = false, 
  requiredRole = null 
}) {
  const { isAuthenticated, user } = useAuth();

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !user?.roles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Route path={path} element={element} />;
}

// Usage
<Routes>
  <CustomRoute path="/" element={<Home />} />
  <CustomRoute 
    path="/dashboard" 
    element={<Dashboard />} 
    requiresAuth={true} 
  />
  <CustomRoute 
    path="/admin" 
    element={<Admin />} 
    requiresAuth={true}
    requiredRole="admin"
  />
</Routes>`;

  return (
    <div>
      <h2 style={{ color: "#61dafb", marginBottom: "1.5rem" }}>
        React Router
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          React Router is the standard routing library for React applications. It enables client-side routing, 
          allowing you to build single-page applications with navigation that feels like a traditional multi-page website.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Basic Setup</h3>
        <div style={{ position: "relative" }}>
          <pre
            style={{
              background: "#1e293b",
              color: "#e2e8f0",
              padding: "1.5rem",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            <code>{reactRouterBasics}</code>
          </pre>
          <button
            onClick={() => copyCode(reactRouterBasics, "router-basics")}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              background: "#374151",
              color: "white",
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {copiedCode === "router-basics" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Navigation Components</h3>
        <div style={{ position: "relative" }}>
          <pre
            style={{
              background: "#1e293b",
              color: "#e2e8f0",
              padding: "1.5rem",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            <code>{navigationComponents}</code>
          </pre>
          <button
            onClick={() => copyCode(navigationComponents, "navigation-components")}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              background: "#374151",
              color: "white",
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {copiedCode === "navigation-components" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Route Parameters</h3>
        <div style={{ position: "relative" }}>
          <pre
            style={{
              background: "#1e293b",
              color: "#e2e8f0",
              padding: "1.5rem",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            <code>{routeParameters}</code>
          </pre>
          <button
            onClick={() => copyCode(routeParameters, "route-parameters")}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              background: "#374151",
              color: "white",
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {copiedCode === "route-parameters" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Protected Routes</h3>
        <div style={{ position: "relative" }}>
          <pre
            style={{
              background: "#1e293b",
              color: "#e2e8f0",
              padding: "1.5rem",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            <code>{protectedRoutes}</code>
          </pre>
          <button
            onClick={() => copyCode(protectedRoutes, "protected-routes")}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              background: "#374151",
              color: "white",
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {copiedCode === "protected-routes" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Advanced Patterns</h3>
        <div style={{ position: "relative" }}>
          <pre
            style={{
              background: "#1e293b",
              color: "#e2e8f0",
              padding: "1.5rem",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            <code>{routingPatterns}</code>
          </pre>
          <button
            onClick={() => copyCode(routingPatterns, "routing-patterns")}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              background: "#374151",
              color: "white",
              border: "none",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            {copiedCode === "routing-patterns" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>💡 Routing Best Practices</h4>
        <ul style={{ color: "#0c4a6e", margin: 0, paddingLeft: "1.5rem" }}>
          <li>Use BrowserRouter for production, HashRouter for static hosting</li>
          <li>Implement route guards for authentication and authorization</li>
          <li>Use lazy loading for code splitting and better performance</li>
          <li>Handle 404 pages with catch-all routes</li>
          <li>Use nested routes for complex layouts</li>
        </ul>
      </div>
    </div>
  );
};

export default RoutingSection;

