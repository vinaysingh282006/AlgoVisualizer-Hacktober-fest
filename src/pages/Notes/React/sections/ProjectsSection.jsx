import React from "react";

const ProjectsSection = ({ copyCode, copiedCode }) => {
  const todoApp = `// Project 1: Todo Application
// A complete todo app with CRUD operations

import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos(prev => [...prev, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({todos.length})
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active ({activeCount})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({completedCount})
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          onBlur={handleEdit}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}
      
      <div className="todo-actions">
        <button onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </li>
  );
}

export default TodoApp;`;

  const weatherApp = `// Project 2: Weather Application
// A weather app with API integration

import React, { useState, useEffect } from 'react';

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');

  const API_KEY = 'your-api-key'; // Replace with actual API key
  const API_URL = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`;

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  if (loading) {
    return (
      <div className="weather-app">
        <div className="loading">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div className="weather-main">
            <img 
              src={\`https://openweathermap.org/img/wn/\${weather.weather[0].icon}@2x.png\`}
              alt={weather.weather[0].description}
            />
            <div className="weather-info">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="description">
                {weather.weather[0].description}
              </div>
            </div>
          </div>
          
          <div className="weather-details">
            <div className="detail">
              <span>Feels like</span>
              <span>{Math.round(weather.main.feels_like)}°C</span>
            </div>
            <div className="detail">
              <span>Humidity</span>
              <span>{weather.main.humidity}%</span>
            </div>
            <div className="detail">
              <span>Wind</span>
              <span>{weather.wind.speed} m/s</span>
            </div>
            <div className="detail">
              <span>Pressure</span>
              <span>{weather.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;`;

  const calculatorApp = `// Project 3: Calculator Application
// A functional calculator with basic operations

import React, { useState } from 'react';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        {display}
      </div>
      
      <div className="calculator-buttons">
        <button className="calculator-button function" onClick={clear}>
          C
        </button>
        <button className="calculator-button function" onClick={() => setDisplay(display.slice(0, -1) || '0')}>
          ⌫
        </button>
        <button className="calculator-button function" onClick={() => performOperation('÷')}>
          ÷
        </button>
        <button className="calculator-button operator" onClick={() => performOperation('×')}>
          ×
        </button>

        <button className="calculator-button" onClick={() => inputNumber(7)}>7</button>
        <button className="calculator-button" onClick={() => inputNumber(8)}>8</button>
        <button className="calculator-button" onClick={() => inputNumber(9)}>9</button>
        <button className="calculator-button operator" onClick={() => performOperation('-')}>
          -
        </button>

        <button className="calculator-button" onClick={() => inputNumber(4)}>4</button>
        <button className="calculator-button" onClick={() => inputNumber(5)}>5</button>
        <button className="calculator-button" onClick={() => inputNumber(6)}>6</button>
        <button className="calculator-button operator" onClick={() => performOperation('+')}>
          +
        </button>

        <button className="calculator-button" onClick={() => inputNumber(1)}>1</button>
        <button className="calculator-button" onClick={() => inputNumber(2)}>2</button>
        <button className="calculator-button" onClick={() => inputNumber(3)}>3</button>
        <button className="calculator-button equals" onClick={handleEquals} rowSpan="2">
          =
        </button>

        <button className="calculator-button zero" onClick={() => inputNumber(0)}>
          0
        </button>
        <button className="calculator-button" onClick={inputDecimal}>
          .
        </button>
      </div>
    </div>
  );
}

export default Calculator;`;

  const blogApp = `// Project 4: Simple Blog Application
// A blog with posts, comments, and user management

import React, { useState, useEffect } from 'react';

function BlogApp() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Load sample posts
    const samplePosts = [
      {
        id: 1,
        title: 'Getting Started with React',
        content: 'React is a powerful library for building user interfaces...',
        author: 'John Doe',
        date: '2024-01-15',
        comments: [
          { id: 1, author: 'Jane Smith', text: 'Great article!', date: '2024-01-16' }
        ]
      },
      {
        id: 2,
        title: 'Understanding React Hooks',
        content: 'Hooks allow you to use state and other React features...',
        author: 'Jane Smith',
        date: '2024-01-14',
        comments: []
      }
    ];
    setPosts(samplePosts);
  }, []);

  const addPost = (title, content) => {
    const newPost = {
      id: Date.now(),
      title,
      content,
      author: currentUser.name,
      date: new Date().toISOString().split('T')[0],
      comments: []
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const addComment = (postId, text) => {
    if (!currentUser) return;
    
    const newComment = {
      id: Date.now(),
      author: currentUser.name,
      text,
      date: new Date().toISOString().split('T')[0]
    };

    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  return (
    <div className="blog-app">
      <header className="blog-header">
        <h1>My Blog</h1>
        {currentUser ? (
          <div className="user-info">
            <span>Welcome, {currentUser.name}!</span>
            <button onClick={() => setCurrentUser(null)}>Logout</button>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Login</button>
        )}
      </header>

      {showLogin && (
        <LoginModal
          onLogin={setCurrentUser}
          onClose={() => setShowLogin(false)}
        />
      )}

      {currentUser && (
        <PostForm onSubmit={addPost} />
      )}

      <div className="posts">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            currentUser={currentUser}
            onAddComment={addComment}
          />
        ))}
      </div>
    </div>
  );
}

function LoginModal({ onLogin, onClose }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin({ name: name.trim() });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <div className="modal-actions">
            <button type="submit">Login</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim());
      setTitle('');
      setContent('');
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h3>Create New Post</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post content"
        rows="4"
        required
      />
      <button type="submit">Publish Post</button>
    </form>
  );
}

function PostCard({ post, currentUser, onAddComment }) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(post.id, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span>By {post.author}</span>
        <span>{post.date}</span>
      </div>
      <p>{post.content}</p>
      
      <div className="comments">
        <h4>Comments ({post.comments.length})</h4>
        {post.comments.map(comment => (
          <div key={comment.id} className="comment">
            <strong>{comment.author}</strong>
            <span className="comment-date">{comment.date}</span>
            <p>{comment.text}</p>
          </div>
        ))}
        
        {currentUser && (
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              required
            />
            <button type="submit">Comment</button>
          </form>
        )}
      </div>
    </article>
  );
}

export default BlogApp;`;

  return (
    <div>
      <h2 style={{ color: "#61dafb", marginBottom: "1.5rem" }}>
        Mini Projects & Exercises
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          Practice your React skills with these hands-on projects. Each project builds upon the concepts 
          you've learned and introduces new patterns and techniques.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Project 1: Todo Application</h3>
        <p style={{ marginBottom: "1rem" }}>
          A complete todo app with CRUD operations, local storage, and filtering. 
          Perfect for practicing state management and component composition.
        </p>
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
            <code>{todoApp}</code>
          </pre>
          <button
            onClick={() => copyCode(todoApp, "todo-app")}
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
            {copiedCode === "todo-app" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Project 2: Weather Application</h3>
        <p style={{ marginBottom: "1rem" }}>
          A weather app that fetches data from an API. Great for learning about 
          useEffect, async operations, and error handling.
        </p>
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
            <code>{weatherApp}</code>
          </pre>
          <button
            onClick={() => copyCode(weatherApp, "weather-app")}
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
            {copiedCode === "weather-app" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Project 3: Calculator Application</h3>
        <p style={{ marginBottom: "1rem" }}>
          A functional calculator with basic operations. Excellent for practicing 
          complex state management and event handling.
        </p>
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
            <code>{calculatorApp}</code>
          </pre>
          <button
            onClick={() => copyCode(calculatorApp, "calculator-app")}
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
            {copiedCode === "calculator-app" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Project 4: Blog Application</h3>
        <p style={{ marginBottom: "1rem" }}>
          A simple blog with posts, comments, and user management. Perfect for 
          learning about forms, conditional rendering, and data flow.
        </p>
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
            <code>{blogApp}</code>
          </pre>
          <button
            onClick={() => copyCode(blogApp, "blog-app")}
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
            {copiedCode === "blog-app" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>🚀 Next Steps</h4>
        <ul style={{ color: "#0c4a6e", margin: 0, paddingLeft: "1.5rem" }}>
          <li>Add CSS styling to make the apps look professional</li>
          <li>Implement data persistence with a backend API</li>
          <li>Add form validation and error handling</li>
          <li>Implement user authentication and authorization</li>
          <li>Add unit tests for your components</li>
          <li>Deploy your apps to platforms like Vercel or Netlify</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsSection;

