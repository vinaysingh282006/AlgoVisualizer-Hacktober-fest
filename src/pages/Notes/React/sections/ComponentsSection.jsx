import React from "react";

const ComponentsSection = ({ copyCode, copiedCode }) => {
  const functionalComponents = `// Functional Components (Modern React)
// Simple, reusable pieces of UI

// Basic Functional Component
function Greeting() {
  return <h1>Hello, World!</h1>;
}

// Arrow Function Component
const Greeting = () => {
  return <h1>Hello, World!</h1>;
};

// Component with Props
function UserCard({ name, email, age }) {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
    </div>
  );
}

// Component with Children
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage
function App() {
  return (
    <div>
      <UserCard name="John Doe" email="john@example.com" age={25} />
      <Card title="My Card">
        <p>This is the card content</p>
        <button>Click me</button>
      </Card>
    </div>
  );
}`;

  const classComponents = `// Class Components (Legacy but still important)
// Used for complex state management and lifecycle methods

import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

// Lifecycle Methods
class LifecycleExample extends Component {
  componentDidMount() {
    console.log('Component mounted');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component updated');
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  render() {
    return <div>Lifecycle Example</div>;
  }
}`;

  const componentComposition = `// Component Composition Patterns

// 1. Container vs Presentational Components
// Container (Smart) Component
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return <UserList users={users} loading={loading} />;
}

// Presentational (Dumb) Component
function UserList({ users, loading }) {
  if (loading) return <div>Loading...</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// 2. Higher-Order Components (HOC)
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);

// 3. Render Props Pattern
function DataFetcher({ render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return render({ data, loading });
}

// Usage
<DataFetcher
  render={({ data, loading }) => (
    loading ? <div>Loading...</div> : <div>{data}</div>
  )}
/>`;

  const componentBestPractices = `// Component Best Practices

// 1. Single Responsibility Principle
// Good: Each component has one job
function UserAvatar({ user }) {
  return <img src={user.avatar} alt={user.name} />;
}

function UserName({ user }) {
  return <span>{user.name}</span>;
}

// Bad: Component doing too much
function UserProfile({ user }) {
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
      <button onClick={() => updateUser(user)}>Update</button>
      <button onClick={() => deleteUser(user.id)}>Delete</button>
    </div>
  );
}

// 2. Proper Key Usage
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

// 3. Conditional Rendering
function UserProfile({ user, isLoggedIn }) {
  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {/* User content */}
    </div>
  );
}

// 4. Default Props
function Button({ text, variant = 'primary', size = 'medium' }) {
  return (
    <button className={\`btn btn-\${variant} btn-\${size}\`}>
      {text}
    </button>
  );
}

// 5. PropTypes (for type checking)
import PropTypes from 'prop-types';

function UserCard({ name, email, age }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>{age}</p>
    </div>
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};`;

  return (
    <div>
      <h2 style={{ color: "#61dafb", marginBottom: "1.5rem" }}>
        React Components
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          Components are the building blocks of React applications. They are reusable pieces of UI that can be composed together to create complex interfaces.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Functional Components</h3>
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
            <code>{functionalComponents}</code>
          </pre>
          <button
            onClick={() => copyCode(functionalComponents, "functional-components")}
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
            {copiedCode === "functional-components" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Class Components</h3>
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
            <code>{classComponents}</code>
          </pre>
          <button
            onClick={() => copyCode(classComponents, "class-components")}
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
            {copiedCode === "class-components" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Component Composition</h3>
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
            <code>{componentComposition}</code>
          </pre>
          <button
            onClick={() => copyCode(componentComposition, "component-composition")}
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
            {copiedCode === "component-composition" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Best Practices</h3>
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
            <code>{componentBestPractices}</code>
          </pre>
          <button
            onClick={() => copyCode(componentBestPractices, "component-best-practices")}
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
            {copiedCode === "component-best-practices" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>💡 Key Takeaways</h4>
        <ul style={{ color: "#0c4a6e", margin: 0, paddingLeft: "1.5rem" }}>
          <li>Use functional components with hooks for new projects</li>
          <li>Keep components small and focused on a single responsibility</li>
          <li>Use composition over inheritance</li>
          <li>Always provide unique keys for list items</li>
          <li>Use PropTypes or TypeScript for type safety</li>
        </ul>
      </div>
    </div>
  );
};

export default ComponentsSection;

