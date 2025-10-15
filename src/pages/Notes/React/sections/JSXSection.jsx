import React from "react";

const JSXSection = ({ copyCode, copiedCode }) => {
  const jsxBasics = `// JSX (JavaScript XML) Basics
// JSX is a syntax extension that lets you write HTML-like code in JavaScript

// 1. Basic JSX
const element = <h1>Hello, world!</h1>;

// 2. JSX with Variables
const name = 'John Doe';
const element = <h1>Hello, {name}</h1>;

// 3. JSX with Expressions
const user = { firstName: 'John', lastName: 'Doe' };
const element = (
  <h1>
    Hello, {user.firstName} {user.lastName}!
  </h1>
);

// 4. JSX with Functions
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const element = <h1>Hello, {formatName(user)}!</h1>;

// 5. JSX Attributes
const element = <div tabIndex="0"></div>;
const element2 = <img src={user.avatarUrl} alt="User avatar" />;

// 6. JSX Children
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);`;

  const jsxRules = `// JSX Rules and Guidelines

// 1. Must Return a Single Root Element
// Good
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <p>World</p>
    </div>
  );
}

// Also Good (React Fragment)
function App() {
  return (
    <>
      <h1>Hello</h1>
      <p>World</p>
    </>
  );
}

// Bad - Multiple root elements
function App() {
  return (
    <h1>Hello</h1>
    <p>World</p>
  );
}

// 2. Use camelCase for Attributes
// Good
<div className="container" tabIndex="0" onClick={handleClick} />

// Bad
<div class="container" tabindex="0" onclick={handleClick} />

// 3. Self-Closing Tags
// Good
<img src="image.jpg" alt="Description" />
<br />
<hr />

// Bad
<img src="image.jpg" alt="Description"></img>
<br></br>

// 4. JavaScript Expressions in Curly Braces
const isLoggedIn = true;
const element = (
  <div>
    <h1>Welcome!</h1>
    {isLoggedIn ? <p>You are logged in</p> : <p>Please log in</p>}
  </div>
);`;

  const conditionalRendering = `// Conditional Rendering in JSX

// 1. Using Ternary Operator
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign up.</h1>
      )}
    </div>
  );
}

// 2. Using Logical AND Operator
function Mailbox({ unreadMessages }) {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      )}
    </div>
  );
}

// 3. Using if/else statements
function LoginButton({ isLoggedIn }) {
  if (isLoggedIn) {
    return <button>Logout</button>;
  } else {
    return <button>Login</button>;
  }
}

// 4. Preventing Component from Rendering
function WarningBanner({ warn }) {
  if (!warn) {
    return null; // Don't render anything
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}`;

  const listsAndKeys = `// Lists and Keys in JSX

// 1. Rendering Lists
function NumberList({ numbers }) {
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  
  return (
    <ul>{listItems}</ul>
  );
}

// 2. Keys Should Be Unique
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// 3. Keys Must Only Be Unique Among Siblings
function Blog({ posts }) {
  const sidebar = (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  );
  
  const content = posts.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ));
  
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

// 4. Embedding map() in JSX
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}`;

  const formsAndEvents = `// Forms and Events in JSX

// 1. Handling Events
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}

// 2. Event Handlers with Parameters
function Button({ id, onClick }) {
  return (
    <button onClick={() => onClick(id)}>
      Click me
    </button>
  );
}

// 3. Controlled Components (Forms)
function NameForm() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    alert('A name was submitted: ' + value);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

// 4. Multiple Input Handling
function Reservation() {
  const [isGoing, setIsGoing] = useState(true);
  const [numberOfGuests, setNumberOfGuests] = useState(2);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'isGoing') {
      setIsGoing(value);
    } else if (name === 'numberOfGuests') {
      setNumberOfGuests(value);
    }
  };

  return (
    <form>
      <label>
        Is going:
        <input
          name="isGoing"
          type="checkbox"
          checked={isGoing}
          onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Number of guests:
        <input
          name="numberOfGuests"
          type="number"
          value={numberOfGuests}
          onChange={handleInputChange} />
      </label>
    </form>
  );
}`;

  return (
    <div>
      <h2 style={{ color: "#61dafb", marginBottom: "1.5rem" }}>
        JSX & Rendering Elements
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. 
          It makes React components more readable and easier to write.
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>JSX Basics</h3>
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
            <code>{jsxBasics}</code>
          </pre>
          <button
            onClick={() => copyCode(jsxBasics, "jsx-basics")}
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
            {copiedCode === "jsx-basics" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>JSX Rules</h3>
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
            <code>{jsxRules}</code>
          </pre>
          <button
            onClick={() => copyCode(jsxRules, "jsx-rules")}
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
            {copiedCode === "jsx-rules" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Conditional Rendering</h3>
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
            <code>{conditionalRendering}</code>
          </pre>
          <button
            onClick={() => copyCode(conditionalRendering, "conditional-rendering")}
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
            {copiedCode === "conditional-rendering" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Lists and Keys</h3>
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
            <code>{listsAndKeys}</code>
          </pre>
          <button
            onClick={() => copyCode(listsAndKeys, "lists-keys")}
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
            {copiedCode === "lists-keys" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Forms and Events</h3>
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
            <code>{formsAndEvents}</code>
          </pre>
          <button
            onClick={() => copyCode(formsAndEvents, "forms-events")}
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
            {copiedCode === "forms-events" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>💡 JSX Tips</h4>
        <ul style={{ color: "#0c4a6e", margin: 0, paddingLeft: "1.5rem" }}>
          <li>JSX is compiled to React.createElement() calls</li>
          <li>Use camelCase for HTML attributes (className, onClick, etc.)</li>
          <li>Always provide keys for list items</li>
          <li>Use fragments (<>...</>) to avoid extra DOM nodes</li>
          <li>JSX expressions must return a single root element</li>
        </ul>
      </div>
    </div>
  );
};

export default JSXSection;

