import React from "react";

const BestPracticesSection = ({ copyCode, copiedCode }) => {
  const projectStructure = `// Recommended React Project Structure

my-react-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/          # Common components (Button, Input, etc.)
│   │   ├── layout/          # Layout components (Header, Footer, etc.)
│   │   └── forms/           # Form components
│   ├── pages/               # Page components
│   │   ├── Home/
│   │   ├── About/
│   │   └── Contact/
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   └── useLocalStorage.js
│   ├── context/             # React Context providers
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── services/            # API calls and external services
│   │   ├── api.js
│   │   └── authService.js
│   ├── utils/               # Utility functions
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── styles/              # Global styles
│   │   ├── globals.css
│   │   └── variables.css
│   ├── assets/              # Static assets
│   │   ├── images/
│   │   └── icons/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md

// Component Organization Example
// components/common/Button.jsx
function Button({ variant = 'primary', size = 'medium', children, ...props }) {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      {...props}
    >
      {children}
    </button>
  );
}

// pages/Home/Home.jsx
import { Button } from '../../components/common/Button';
import { Header } from '../../components/layout/Header';

function Home() {
  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to Home</h1>
        <Button variant="primary">Get Started</Button>
      </main>
    </div>
  );
}`;

  const componentDesign = `// Component Design Principles

// 1. Single Responsibility Principle
// Good: Each component has one clear purpose
function UserAvatar({ user, size = 'medium' }) {
  return (
    <img 
      src={user.avatar} 
      alt={user.name}
      className={\`avatar avatar-\${size}\`}
    />
  );
}

function UserName({ user }) {
  return <span className="user-name">{user.name}</span>;
}

// Bad: Component doing too much
function UserProfile({ user }) {
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
      <button onClick={() => editUser(user)}>Edit</button>
      <button onClick={() => deleteUser(user.id)}>Delete</button>
    </div>
  );
}

// 2. Composition over Inheritance
// Good: Composable components
function Card({ children, className = '' }) {
  return (
    <div className={\`card \${className}\`}>
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
}

function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

// Usage
<Card>
  <CardHeader>
    <h3>User Profile</h3>
  </CardHeader>
  <CardBody>
    <UserAvatar user={user} />
    <UserName user={user} />
  </CardBody>
</Card>

// 3. Props Interface Design
// Good: Clear, minimal props
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
}

// 4. Default Props and PropTypes
import PropTypes from 'prop-types';

function Button({ 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  children,
  onClick 
}) {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};`;

  const performanceOptimization = `// Performance Optimization Techniques

// 1. React.memo for Component Memoization
import React, { memo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Expensive rendering logic
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});

// 2. useMemo for Expensive Calculations
import { useMemo } from 'react';

function ProductList({ products, filter, sortBy }) {
  const filteredAndSortedProducts = useMemo(() => {
    console.log('Filtering and sorting products...');
    
    let filtered = products.filter(product => 
      product.category === filter
    );
    
    return filtered.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, filter, sortBy]);

  return (
    <div>
      {filteredAndSortedProducts.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// 3. useCallback for Function Memoization
import { useCallback } from 'react';

function TodoList({ todos }) {
  const [filter, setFilter] = useState('all');

  const handleToggle = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

// 4. Code Splitting with React.lazy
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}

// 5. Virtual Scrolling for Large Lists
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </List>
  );
}`;

  const stateManagement = `// State Management Best Practices

// 1. State Structure Design
// Good: Normalized state structure
const initialState = {
  users: {
    byId: {
      1: { id: 1, name: 'John', email: 'john@example.com' },
      2: { id: 2, name: 'Jane', email: 'jane@example.com' }
    },
    allIds: [1, 2]
  },
  posts: {
    byId: {},
    allIds: []
  },
  ui: {
    loading: false,
    error: null,
    currentUser: null
  }
};

// 2. Custom Hooks for State Logic
function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTodo = useCallback((text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTodos(prev => [...prev, newTodo]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return {
    todos,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo
  };
}

// 3. Context for Global State
import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    loading: false,
    error: null
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

// 4. Error Boundaries
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}`;

  const testingPatterns = `// Testing Best Practices

// 1. Component Testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

// 2. Custom Hook Testing
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});

// 3. Integration Testing
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserList } from './UserList';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserList Integration', () => {
  it('fetches and displays users', async () => {
    render(<UserList />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});`;

  return (
    <div>
      <h2 style={{ color: "#61dafb", marginBottom: "1.5rem" }}>
        Best Practices & Project Structure
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          Following React best practices ensures maintainable, scalable, and performant applications. 
          This section covers project structure, component design, performance optimization, and testing strategies.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Project Structure</h3>
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
            <code>{projectStructure}</code>
          </pre>
          <button
            onClick={() => copyCode(projectStructure, "project-structure")}
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
            {copiedCode === "project-structure" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Component Design</h3>
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
            <code>{componentDesign}</code>
          </pre>
          <button
            onClick={() => copyCode(componentDesign, "component-design")}
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
            {copiedCode === "component-design" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Performance Optimization</h3>
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
            <code>{performanceOptimization}</code>
          </pre>
          <button
            onClick={() => copyCode(performanceOptimization, "performance-optimization")}
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
            {copiedCode === "performance-optimization" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>State Management</h3>
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
            <code>{stateManagement}</code>
          </pre>
          <button
            onClick={() => copyCode(stateManagement, "state-management")}
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
            {copiedCode === "state-management" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Testing Patterns</h3>
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
            <code>{testingPatterns}</code>
          </pre>
          <button
            onClick={() => copyCode(testingPatterns, "testing-patterns")}
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
            {copiedCode === "testing-patterns" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>💡 Key Principles</h4>
        <ul style={{ color: "#0c4a6e", margin: 0, paddingLeft: "1.5rem" }}>
          <li><strong>Single Responsibility:</strong> Each component should have one clear purpose</li>
          <li><strong>Composition:</strong> Build complex UIs by combining simple components</li>
          <li><strong>Performance:</strong> Use memoization and code splitting appropriately</li>
          <li><strong>Testing:</strong> Write tests that focus on user behavior</li>
          <li><strong>Maintainability:</strong> Keep components small, focused, and well-organized</li>
        </ul>
      </div>
    </div>
  );
};

export default BestPracticesSection;

