import React from "react";

const IntroSection = ({ copyCode, copiedCode }) => {
  const reactIntro = `// What is React?
// React is a JavaScript library for building user interfaces
// Created by Facebook (now Meta) in 2013

// Key Features:
// 1. Component-based architecture
// 2. Virtual DOM for performance
// 3. Declarative programming
// 4. One-way data flow
// 5. Rich ecosystem

// Basic React Component
import React from 'react';

function Welcome() {
  return <h1>Hello, React!</h1>;
}

export default Welcome;`;

  const virtualDOM = `// Virtual DOM Example
// React creates a virtual representation of the DOM
// When state changes, React compares virtual DOMs
// Only updates the real DOM where changes occurred

// Before update (Virtual DOM)
const oldVDOM = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: ['Hello'] }
  ]
};

// After update (Virtual DOM)
const newVDOM = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: ['Hello World!'] }
  ]
};

// React calculates the minimal changes needed
// and updates only the text content`;

  const componentArchitecture = `// Component-Based Architecture
// Break UI into reusable, independent pieces

// 1. Functional Components (Modern approach)
function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {text}
    </button>
  );
}

// 2. Class Components (Legacy, but still used)
class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="btn">
        {this.props.text}
      </button>
    );
  }
}

// 3. Component Composition
function App() {
  return (
    <div>
      <Header />
      <Main>
        <Sidebar />
        <Content />
      </Main>
      <Footer />
    </div>
  );
}`;

  const setupExample = `// Setting up a React Project

// Method 1: Create React App (Recommended for beginners)
npx create-react-app my-app
cd my-app
npm start

// Method 2: Vite (Faster, modern)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

// Method 3: Next.js (Full-stack React)
npx create-next-app@latest my-app
cd my-app
npm run dev

// Project Structure
my-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md`;

  return (
    <div>
      <h2 style={{ color: "#61dafb", marginBottom: "1.5rem" }}>
        What is React?
      </h2>
      
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          React is a powerful JavaScript library for building user interfaces, particularly web applications. 
          It was created by Facebook (now Meta) and has become one of the most popular frontend frameworks.
        </p>
        
        <div style={{ background: "#f8fafc", padding: "1.5rem", borderRadius: "8px", marginBottom: "1rem" }}>
          <h3 style={{ color: "#374151", marginBottom: "1rem" }}>Key Features:</h3>
          <ul style={{ listStyle: "disc", paddingLeft: "2rem" }}>
            <li><strong>Component-Based:</strong> Build encapsulated components that manage their own state</li>
            <li><strong>Virtual DOM:</strong> Efficient updates through virtual DOM diffing</li>
            <li><strong>Declarative:</strong> Describe what the UI should look like for any given state</li>
            <li><strong>One-Way Data Flow:</strong> Data flows down from parent to child components</li>
            <li><strong>Rich Ecosystem:</strong> Huge community and extensive third-party libraries</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Basic React Component</h3>
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
            <code>{reactIntro}</code>
          </pre>
          <button
            onClick={() => copyCode(reactIntro, "react-intro")}
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
            {copiedCode === "react-intro" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Virtual DOM Concept</h3>
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
            <code>{virtualDOM}</code>
          </pre>
          <button
            onClick={() => copyCode(virtualDOM, "virtual-dom")}
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
            {copiedCode === "virtual-dom" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Component Architecture</h3>
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
            <code>{componentArchitecture}</code>
          </pre>
          <button
            onClick={() => copyCode(componentArchitecture, "component-arch")}
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
            {copiedCode === "component-arch" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#61dafb", marginBottom: "1rem" }}>Setting up React</h3>
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
            <code>{setupExample}</code>
          </pre>
          <button
            onClick={() => copyCode(setupExample, "react-setup")}
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
            {copiedCode === "react-setup" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
        <h4 style={{ color: "#0369a1", marginBottom: "1rem" }}>💡 Pro Tip</h4>
        <p style={{ color: "#0c4a6e", margin: 0 }}>
          Start with Create React App for learning, then move to Vite for better performance in production projects. 
          Next.js is excellent for full-stack applications with server-side rendering.
        </p>
      </div>
    </div>
  );
};

export default IntroSection;

