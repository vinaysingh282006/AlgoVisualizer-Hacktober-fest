import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Documentation.css';

import { useState } from 'react';
import { Copy, Check, ChevronRight } from 'lucide-react';

const SudokuDoc = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedStates, setCopiedStates] = useState({});

  const handleCopyCode = (codeId, code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedStates(prev => ({ ...prev, [codeId]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [codeId]: false }));
      }, 2000);
    });
  };

  const complexityData = {
    time: {
      best: "O(1)",
      average: "O(9^(N*N))",
      worst: "O(9^(N*N))"
    },
    space: "O(N^2)",
    properties: {
      algorithm: "Backtracking",
      type: "Grid-based",
      gridSize: "9×9",
      recursive: "Yes",
      stable: "N/A"
    }
  };

  // Add theme-aware custom styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .documentation {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        color: var(--text-primary);
      }

      .doc-hero {
        background: var(--surface-alt);
        border-radius: 12px;
        padding: 2rem;
        margin-bottom: 2rem;
      }

      .doc-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: var(--text-primary);
      }

      .complexity-overview {
        display: flex;
        gap: 2rem;
        margin-bottom: 1.5rem;
      }

      .complexity-group {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .complexity-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
        font-weight: 500;
      }

      .complexity-badge {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        font-size: 0.875rem;
      }

      .algorithm-description {
        font-size: 1rem;
        line-height: 1.6;
        color: var(--text-secondary);
        margin-bottom: 2rem;
        max-width: 800px;
      }

      .action-buttons {
        display: flex;
        gap: 1rem;
      }

      .action-button {
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-weight: 600;
        font-size: 0.875rem;
        transition: all 0.2s;
        text-decoration: none;
      }

      .action-button.visualizer {
        background: #3b82f6;
        color: white;
      }

      .action-button.pseudocode,
      .action-button.reference {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
      }

      .action-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .properties-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
      }

      .property-card {
        background: var(--surface-alt);
        border-radius: 12px;
        padding: 1.5rem;
        border: 2px solid var(--border-color);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .property-card h3 {
        font-size: 1.125rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: var(--text-primary);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        letter-spacing: -0.02em;
      }

      .complexity-details,
      .properties-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .complexity-item,
      .property-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .label {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }

      .value {
        font-family: 'Fira Code', monospace;
        color: var(--text-primary);
        font-weight: 500;
      }

      .note {
        font-size: 0.75rem;
        color: var(--text-tertiary);
        margin-top: 0.25rem;
      }

      .code-section {
        margin-top: 3rem;
      }

      .section-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: var(--text-primary);
      }

      .code-blocks {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .code-block {
        background: var(--surface-alt);
        border-radius: 12px;
        overflow: hidden;
      }

      .code-block-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        background: rgba(59, 130, 246, 0.1);
        border-bottom: 1px solid rgba(59, 130, 246, 0.2);
      }

      .code-step {
        background: #3b82f6;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.875rem;
        font-weight: 600;
      }

      .code-title {
        color: #3b82f6;
        font-weight: 600;
      }

      .code-content {
        padding: 1.5rem;
        margin: 0;
        background: transparent;
        border: none;
        font-family: 'Fira Code', monospace;
        font-size: 0.875rem;
        line-height: 1.7;
        overflow-x: auto;
      }

      .code-explanation {
        padding: 1rem 1.5rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
        border-top: 1px solid var(--border-color);
        background: rgba(59, 130, 246, 0.05);
      }

      /* Progress Navigation */
      .doc-progress {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background: var(--surface-alt);
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .progress-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .progress-item:hover {
        background: rgba(59, 130, 246, 0.05);
      }

      .progress-item.active {
        background: rgba(59, 130, 246, 0.1);
      }

      .progress-number {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.875rem;
        background: #3b82f6;
        color: white;
        transition: all 0.3s ease;
      }

      .progress-item.active .progress-number {
        transform: scale(1.1);
      }

      .progress-label {
        font-weight: 500;
        color: var(--text-secondary);
      }

      .progress-item.active .progress-label {
        color: #3b82f6;
      }

      .progress-separator {
        color: var(--text-tertiary);
      }

      /* Flow Diagram */
      .flow-section {
        margin: 3rem 0;
        padding: 2rem;
        background: var(--surface-alt);
        border-radius: 12px;
      }

      .flow-diagram {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem 0;
        overflow-x: auto;
        gap: 1.5rem;
      }

      .flow-step {
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 200px;
      }

      .flow-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        color: white;
        flex-shrink: 0;
      }

      .flow-icon.start { background: #3b82f6; }
      .flow-icon.process { background: #8b5cf6; }
      .flow-icon.decision { background: #f59e0b; }
      .flow-icon.end { background: #10b981; }

      .flow-content h4 {
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: var(--text-primary);
      }

      .flow-content p {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin: 0;
      }

      .flow-arrow {
        color: var(--text-tertiary);
        flex-shrink: 0;
      }

      /* Copy Button */
      .implementation-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-left {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .copy-button {
        background: transparent;
        border: 1px solid var(--border-color);
        border-radius: 6px;
        padding: 0.5rem;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .copy-button:hover {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
        border-color: #3b82f6;
      }

      /* Enhanced Animations */
      .documentation * {
        transition: all 0.3s ease;
      }

      .action-button,
      .property-card,
      .code-block {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .action-button:hover,
      .property-card:hover,
      .code-block:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      /* Mobile Responsiveness */
      @media (max-width: 768px) {
        .documentation {
          padding: 1rem;
        }

        .doc-hero {
          padding: 1.5rem;
        }

        .doc-progress {
          flex-direction: column;
          padding: 0.5rem;
        }

        .progress-separator {
          transform: rotate(90deg);
        }

        .complexity-overview {
          flex-direction: column;
          gap: 1rem;
        }

        .action-buttons {
          flex-direction: column;
        }

        .action-button {
          width: 100%;
          text-align: center;
        }

        .properties-grid {
          grid-template-columns: 1fr;
        }

        .flow-diagram {
          flex-direction: column;
          align-items: flex-start;
          padding: 1rem 0;
        }

        .flow-arrow {
          transform: rotate(90deg);
          margin: 1rem 0;
        }

        .code-block-header {
          padding: 1rem;
        }

        .code-content {
          padding: 1rem;
          font-size: 0.75rem;
        }
      }

      pre {
        background: #0d1117;
        border: 1px solid #30363d;
        border-radius: 0.75rem;
        padding: 1.5rem;
        overflow-x: auto;
        color: #00ff00;
      }

      code {
        color: inherit;
        font-family: 'Fira Code', monospace;
      }

      .code-block {
        background: #0d1117;
        border: 1px solid #30363d;
      }

      .code-block-header {
        background: #1f6feb;
        color: white;
        border-bottom-color: #30363d;
      }

      .code-title {
        color: white;
        font-weight: 600;
      }

      .code-explanation {
        background: #161b22;
        color: #8b949e;
        border-top-color: #30363d;
      }

      /* Preserve colors in light mode */
      @media (prefers-color-scheme: light) {
        pre {
          background: #0d1117;
          color: #00ff00;
          border-color: #30363d;
        }
        
        .code-block {
          background: #0d1117;
          border-color: #30363d;
        }

        .code-block-header {
          background: #1f6feb;
          color: white;
          border-bottom-color: #30363d;
        }

        .code-explanation {
          background: #161b22;
          color: #8b949e;
          border-top-color: #30363d;
        }
      }

      @media (max-width: 768px) {
        .complexity-badges {
          flex-direction: column;
        }
        
        .badge {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return (
    <div className="documentation">
      {/* Navigation Progress */}


      <header className="doc-hero">
        <div className="hero-text">
          <h1 className="doc-title">Sudoku Solver</h1>
          
          <div className="complexity-overview">
            <div className="complexity-group">
              <div className="complexity-label">Time</div>
              <div className="complexity-badge">O(9^(N*N))</div>
            </div>
            <div className="complexity-group">
              <div className="complexity-label">Space</div>
              <div className="complexity-badge">O(N^2)</div>
            </div>
          </div>

          <p className="algorithm-description">
            Solve a 9×9 Sudoku puzzle by filling empty cells following Sudoku rules using backtracking.
            The algorithm explores all possible valid numbers (1-9) for each empty cell and backtracks when a violation occurs.
          </p>

          <div className="action-buttons">
            <Link 
              to="/backtracking" 
              state={{ algorithm: 'sudoku' }} 
              className="action-button visualizer">
              OPEN VISUALIZER
            </Link>
            <a href="#pseudocode" className="action-button pseudocode">
              PSEUDOCODE
            </a>
            <a href="#reference" className="action-button reference">
              REFERENCE
            </a>
          </div>
        </div>
      </header>

      {/* Algorithm Properties */}
      <div className="properties-grid">
        <div className="property-card time">
          <h3>Time Complexity</h3>
          <div className="complexity-details">
            <div className="complexity-item">
              <div className="label">Best Case</div>
              <div className="value">O(1)</div>
              <div className="note">When puzzle is already solved</div>
            </div>
            <div className="complexity-item">
              <div className="label">Average Case</div>
              <div className="value">O(9^(N*N))</div>
              <div className="note">Need to try numbers for each empty cell</div>
            </div>
            <div className="complexity-item">
              <div className="label">Worst Case</div>
              <div className="value">O(9^(N*N))</div>
              <div className="note">When many backtracks needed</div>
            </div>
          </div>
        </div>

        <div className="property-card space">
          <h3>Space Complexity</h3>
          <div className="complexity-details">
            <div className="complexity-item">
              <div className="label">Total</div>
              <div className="value">O(N^2)</div>
              <div className="note">To store the 9×9 grid</div>
            </div>
            <div className="complexity-item">
              <div className="label">Recursive Stack</div>
              <div className="value">O(N^2)</div>
              <div className="note">Due to backtracking calls</div>
            </div>
          </div>
        </div>

        <div className="property-card properties">
          <h3>Properties</h3>
          <div className="properties-list">
            <div className="property-item">
              <div className="label">Algorithm Type</div>
              <div className="value">Backtracking</div>
            </div>
            <div className="property-item">
              <div className="label">Grid Size</div>
              <div className="value">9×9 standard grid</div>
            </div>
            <div className="property-item">
              <div className="label">Input Type</div>
              <div className="value">Partially filled grid (0 for empty)</div>
            </div>
            <div className="property-item">
              <div className="label">Recursive</div>
              <div className="value">Yes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pseudocode Section */}
      <section id="pseudocode" className="code-section">
        <h2 className="section-title">Pseudocode</h2>
        <div className="code-blocks">
          <div className="code-block">
            <div className="code-block-header">
              <div className="code-step">1</div>
              <div className="code-title">Main Solving Function</div>
            </div>
            <pre className="code-content"><code>function solveSudoku(board):
    for each empty cell (row, col):
        for num in 1 to 9:
            if isValid(board, row, col, num):
                place num in cell
                if solveSudoku(board):
                    return true
                remove num from cell
        return false // no valid number found
    return true // all cells filled</code></pre>
            <div className="code-explanation">
              Main recursive function that tries numbers 1-9 in each empty cell
            </div>
          </div>

          <div className="code-block">
            <div className="code-block-header">
              <div className="code-step">2</div>
              <div className="code-title">Validation Function</div>
            </div>
            <pre className="code-content"><code>function isValid(board, row, col, num):
    // Check row
    for x in 0 to 8:
        if board[row][x] == num:
            return false
            
    // Check column
    for x in 0 to 8:
        if board[x][col] == num:
            return false
            
    // Check 3x3 box
    startRow = row - row % 3
    startCol = col - col % 3
    for i in 0 to 2:
        for j in 0 to 2:
            if board[startRow + i][startCol + j] == num:
                return false
                
    return true</code></pre>
            <div className="code-explanation">
              Helper function to check if a number is valid in given cell
            </div>
          </div>
        </div>
      </section>

      {/* Algorithm Flow Diagram */}
      <section className="flow-section">
        <h2 className="section-title">Algorithm Flow</h2>
        <div className="flow-diagram">
          <div className="flow-step">
            <div className="flow-icon start">1</div>
            <div className="flow-content">
              <h4>Initialize</h4>
              <p>Start with partially filled 9×9 grid</p>
            </div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="flow-icon process">2</div>
            <div className="flow-content">
              <h4>Find Empty Cell</h4>
              <p>Locate next empty position (0)</p>
            </div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="flow-icon decision">3</div>
            <div className="flow-content">
              <h4>Try Numbers</h4>
              <p>Attempt 1-9 in empty cell</p>
            </div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="flow-icon end">4</div>
            <div className="flow-content">
              <h4>Validate & Recurse</h4>
              <p>Check rules & continue or backtrack</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reference Implementation */}
      <section id="reference" className="doc-section">
        <h2>Reference Implementation</h2>
        <div className="implementation theme-card">
          <div className="implementation-header">
            <div className="header-left">
              <h3>JavaScript Implementation</h3>
              <span className="implementation-badge">Backtracking Algorithm</span>
            </div>
            <button 
              className="copy-button"
              onClick={() => handleCopyCode('mainImpl', solverCode)}
              title="Copy code"
            >
              {copiedStates.mainImpl ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
          <pre className="language-javascript"><code>{`function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) return false;
    }
    
    // Check 3x3 box
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) return false;
        }
    }
    
    return true;
}`}</code></pre>
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="doc-footer">
        <Link to="/documentation" className="btn secondary">
          ← Back to Documentation
        </Link>
        <Link to="/backtracking" state={{ algorithm: 'sudoku' }} className="btn primary">
          Try Sudoku Solver →
        </Link>
      </div>
    </div>
  );
};

// Add CSS at the bottom of the file
const styles = `
  .implementation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
  }

  .implementation-badge {
    background: var(--accent-primary);
    color: var(--text-on-accent);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .doc-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
  }

  @media (max-width: 640px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .cta-row {
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .cta-row .btn {
      width: 100%;
      text-align: center;
    }
    
    .doc-footer {
      flex-direction: column;
      gap: 1rem;
    }
    
    .doc-footer .btn {
      width: 100%;
      text-align: center;
    }
  }
`;

export default SudokuDoc;