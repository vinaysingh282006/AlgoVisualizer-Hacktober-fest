import React, { useState } from "react";
import IntroSection from "./sections/IntroSection";
import ComponentsSection from "./sections/ComponentsSection";
import JSXSection from "./sections/JSXSection";
import PropsStateSection from "./sections/PropsStateSection";
import HooksSection from "./sections/HooksSection";
import RoutingSection from "./sections/RoutingSection";
import BestPracticesSection from "./sections/BestPracticesSection";
import ProjectsSection from "./sections/ProjectsSection";

const Fundamentals = () => {
  const [activeTab, setActiveTab] = useState("intro");
  const [copiedCode, setCopiedCode] = useState("");

  const copyCode = async (code, identifier) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(identifier);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const sections = [
    {
      id: "intro",
      label: "Introduction",
      component: <IntroSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "components",
      label: "Components",
      component: <ComponentsSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "jsx",
      label: "JSX & Rendering",
      component: <JSXSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "props-state",
      label: "Props & State",
      component: <PropsStateSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "hooks",
      label: "React Hooks",
      component: <HooksSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "routing",
      label: "Routing",
      component: <RoutingSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "best-practices",
      label: "Best Practices",
      component: <BestPracticesSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
    {
      id: "projects",
      label: "Mini Projects",
      component: <ProjectsSection copyCode={copyCode} copiedCode={copiedCode} />,
    },
  ];

  return (
    <div
      className="notes-page"
      style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "2rem 0",
          background: "linear-gradient(135deg, #61dafb, #21a0c4)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(97, 218, 251, 0.3)",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>
          React Fundamentals
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: 0.9,
          }}
        >
          Master React.js with comprehensive examples, hooks, and modern patterns.
          Build interactive user interfaces with confidence.
        </p>
      </header>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "2rem",
          justifyContent: "center",
        }}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            style={{
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "8px",
              background:
                activeTab === section.id ? "#61dafb" : "#f3f4f6",
              color: activeTab === section.id ? "white" : "#374151",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontSize: "0.9rem",
            }}
          >
            {section.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "2rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          minHeight: "500px",
        }}
      >
        {sections.find((s) => s.id === activeTab)?.component}
      </main>
    </div>
  );
};

export default Fundamentals;

