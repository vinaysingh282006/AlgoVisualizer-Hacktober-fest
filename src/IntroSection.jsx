import React from "react";

const IntroSection = () => {
  return (
    <section style={{ 
      marginBottom: "2rem",
      padding: "2rem",
      borderRadius: "16px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      transform: "scale(1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.02)";
      e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.2)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.15)";
    }}>
      <h2 style={{
        background: "linear-gradient(90deg, #ffffff, #f0f0f0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        fontSize: "2rem",
        fontWeight: "700",
        marginBottom: "1.5rem",
        textAlign: "center",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}>
        <i className="fas fa-play-circle" style={{ marginRight: "0.5rem" }}></i> 
        1. Introduction to C++
      </h2>
      <p style={{
        background: "rgba(255, 255, 255, 0.9)",
        padding: "1.5rem",
        borderRadius: "12px",
        fontSize: "1.1rem",
        lineHeight: "1.7",
        color: "#333",
        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
      }}>
        C++ is a high-performance, general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language.
      </p>
      <h3 style={{
        fontSize: "1.5rem",
        fontWeight: "600",
        marginTop: "1.5rem",
        marginBottom: "1rem",
        color: "#ffffff",
        textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
      }}>Key Features</h3>
      <ul style={{
        background: "rgba(255, 255, 255, 0.85)",
        padding: "1.5rem",
        borderRadius: "12px",
        listStyle: "none",
        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
      }}>
        <li style={{
          padding: "0.75rem 0",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "flex-start",
        }}>
          <span style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            marginRight: "1rem",
            marginTop: "0.6rem",
          }}></span>
          <div>
            <strong>Object-Oriented:</strong> Supports classes, objects, inheritance, polymorphism, and encapsulation
          </div>
        </li>
        <li style={{
          padding: "0.75rem 0",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "flex-start",
        }}>
          <span style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            marginRight: "1rem",
            marginTop: "0.6rem",
          }}></span>
          <div>
            <strong>High Performance:</strong> Direct memory manipulation and low-level operations
          </div>
        </li>
        <li style={{
          padding: "0.75rem 0",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "flex-start",
        }}>
          <span style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            marginRight: "1rem",
            marginTop: "0.6rem",
          }}></span>
          <div>
            <strong>Standard Template Library (STL):</strong> Rich collection of algorithms and data structures
          </div>
        </li>
        <li style={{
          padding: "0.75rem 0",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "flex-start",
        }}>
          <span style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            marginRight: "1rem",
            marginTop: "0.6rem",
          }}></span>
          <div>
            <strong>Cross-Platform:</strong> Compiles to native machine code for various platforms
          </div>
        </li>
        <li style={{
          padding: "0.75rem 0",
          display: "flex",
          alignItems: "flex-start",
        }}>
          <span style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            marginRight: "1rem",
            marginTop: "0.6rem",
          }}></span>
          <div>
            <strong>Backward Compatible:</strong> Can compile most C programs
          </div>
        </li>
      </ul>
      <div style={{ 
        background: "linear-gradient(90deg, #f59e0b, #f97316)",
        borderLeft: "4px solid #f59e0b", 
        padding: "1rem 1.5rem", 
        margin: "1.5rem 0", 
        borderRadius: "0 12px 12px 0",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}>
        <strong style={{
          color: "#ffffff",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
        }}>Note:</strong> C++ is widely used in system programming, game development, embedded systems, and high-performance applications.
      </div>
    </section>
  );
};

export default IntroSection;