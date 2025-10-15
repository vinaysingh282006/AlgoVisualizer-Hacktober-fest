import React from "react";

const PropsStateSection = ({ copyCode, copiedCode }) => {
  const propsBasics = `// Props (Properties) - Data passed down from parent to child

// 1. Basic Props
function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}

// Usage
<Welcome name="Sara" />

// 2. Multiple Props
function UserCard({ name, age, email }) {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// Usage
<UserCard name="John" age={25} email="john@example.com" />

// 3. Props with Default Values
function Button({ text, variant = 'primary', size = 'medium' }) {
  return (
    <button className={\`btn btn-\${variant} btn-\${size}\`}>
      {text}
    </button>
  );
}

// 4. Props with Children
function Card({ title, children }) {
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
<Card title="My Card">
  <p>This is the card content</p>
  <button>Click me</button>
</Card>

// 5. Spreading Props
function Input({ label, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}

// Usage
<Input 
  label="Name" 
  type="text" 
  placeholder="Enter your name" 
  required 
/>`;

  const stateBasics = `// State - Component's internal data that can change over time

import React, { useState } from 'react';

// 1. Basic State
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// 2. Multiple State Variables
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}

// 3. Object State
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateUser = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <div>
      <input
        type="text"
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => updateUser('email', e.target.value)}
        placeholder="Email"
      />
    </div>
  );
}

// 4. Array State
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos(prevTodos => [
        ...prevTodos,
        { id: Date.now(), text: inputValue, completed: false }
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

  const stateVsProps = `// State vs Props - Key Differences

// PROPS: Read-only data passed from parent to child
function ChildComponent({ message, count }) {
  // Props are read-only - cannot be modified
  return (
    <div>
      <p>{message}</p>
      <p>Count: {count}</p>
    </div>
  );
}

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <ChildComponent 
        message="Hello from parent" 
        count={count} 
      />
    </div>
  );
}

// STATE: Internal component data that can change
function StatefulComponent() {
  const [internalCount, setInternalCount] = useState(0);
  
  return (
    <div>
      <p>Internal count: {internalCount}</p>
      <button onClick={() => setInternalCount(internalCount + 1)}>
        Increment Internal
      </button>
    </div>
  );
}

// Lifting State Up - Moving state to common parent
function TemperatureInput({ temperature, scale, onTemperatureChange }) {
  return (
    <fieldset>
      <legend>Enter temperature in {scale}:</legend>
      <input
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
      />
    </fieldset>
  );
}

function Calculator() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('celsius');

  const handleCelsiusChange = (value) => {
    setTemperature(value);
    setScale('celsius');
  };

  const handleFahrenheitChange = (value) => {
    setTemperature(value);
    setScale('fahrenheit');
  };

  return (
    <div>
      <TemperatureInput
        scale="celsius"
        temperature={scale === 'fahrenheit' ? tryConvert(temperature, toCelsius) : temperature}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="fahrenheit"
        temperature={scale === 'celsius' ? tryConvert(temperature, toFahrenheit) : temperature}
        onTemperatureChange={handleFahrenheitChange}
      />
    </div>
  );
}`;

  const statePatterns = `// Common State Patterns

// 1. Functional Updates
function Counter() {
  const [count, setCount] = useState(0);

  // Good - Functional update
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Also good for multiple updates
  const incrementTwice = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={incrementTwice}>+2</button>
    </div>
  );
}

// 2. State with useReducer for Complex State
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

// 3. Custom Hook for State Logic
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

function MyComponent() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`;

  return (
    <div>
      <h2 style={{ color: "#61dafb", marginBottom: "1.5rem" }}>
        Props & State Management
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          Props and State are fundamental concepts in React. Props allow data to flow down from parent to child components, 
          while State enables components to manage their own internal data that can change over time.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Props Basics</h3>
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
            <code>{propsBasics}</code>
          </pre>
          <button
            onClick={() => copyCode(propsBasics, "props-basics")}
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
            {copiedCode === "props-basics" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>State Basics</h3>
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
            <code>{stateBasics}</code>
          </pre>
          <button
            onClick={() => copyCode(stateBasics, "state-basics")}
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
            {copiedCode === "state-basics" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>State vs Props</h3>
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
            <code>{stateVsProps}</code>
          </pre>
          <button
            onClick={() => copyCode(stateVsProps, "state-vs-props")}
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
            {copiedCode === "state-vs-props" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>State Patterns</h3>
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
            <code>{statePatterns}</code>
          </pre>
          <button
            onClick={() => copyCode(statePatterns, "state-patterns")}
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
            {copiedCode === "state-patterns" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>💡 Key Principles</h4>
        <ul style={{ color: "#0c4a6e", margin: 0, paddingLeft: "1.5rem" }}>
          <li><strong>Props:</strong> Read-only, passed down from parent to child</li>
          <li><strong>State:</strong> Internal component data that can change</li>
          <li><strong>Lifting State Up:</strong> Move shared state to common parent</li>
          <li><strong>Functional Updates:</strong> Use function form for state updates</li>
          <li><strong>Immutable Updates:</strong> Always create new objects/arrays</li>
        </ul>
      </div>
    </div>
  );
};

export default PropsStateSection;

