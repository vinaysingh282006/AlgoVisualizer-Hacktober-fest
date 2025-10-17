// src/components/GameSearchVisualizer.jsx
import React, { useState, useEffect } from "react";
import "../styles/global-theme.css";

const GameSearchVisualizer = ({
  defaultAlgorithm = "minimax",
  autoLoadExample = false,
  boardSize = 3
}) => {
  const [algorithm, setAlgorithm] = useState(defaultAlgorithm);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select an algorithm and run.");
  const [speedMs, setSpeedMs] = useState(500); // playback speed
  const totalSteps = steps.length;
  const progress = totalSteps > 1 ? Math.round((currentStep / (totalSteps - 1)) * 100) : 0;
  
  // keep algorithm in sync if parent changes defaultAlgorithm
  useEffect(() => { setAlgorithm(defaultAlgorithm); }, [defaultAlgorithm]);

  const copySteps = (arr) => arr.map((row) => Array.isArray(row) ? [...row] : row);

  // ================= Game Search Algorithms =================

  // Sample Tic-Tac-Toe board: 0=empty, 1=X, -1=O
  const sampleBoard = Array(boardSize * boardSize).fill(0);


  // auto-run on mount / when props that should trigger a new demo change
  useEffect(() => {
    if (autoLoadExample) {
      runAlgorithm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLoadExample, boardSize, algorithm]);

  // 1️⃣ Minimax
// Replace your current runMinimax with this:
const runMinimax = (board = sampleBoard) => {
  const stepsArr = [];
  const size = boardSize;

  // Build all winning lines for an NxN tic-tac-toe board
  const lines = [];
  for (let r = 0; r < size; r++) lines.push([...Array(size)].map((_, c) => r * size + c));
  for (let c = 0; c < size; c++) lines.push([...Array(size)].map((_, r) => r * size + c));
  lines.push([...Array(size)].map((_, i) => i * size + i));                           // main diag
  lines.push([...Array(size)].map((_, i) => (i + 1) * size - (i + 1)));               // anti diag

  const winner = (b) => {
    for (const line of lines) {
      const sum = line.reduce((acc, idx) => acc + b[idx], 0);
      if (sum === size) return 1;     // X wins
      if (sum === -size) return -1;   // O wins
    }
    return 0; // no winner
  };

  const evalBoard = (b) => {
    const w = winner(b);
    if (w !== 0) return w * 10; // reward terminal results strongly
    // Simple heuristic: count open lines for X minus open lines for O
    let score = 0;
    for (const line of lines) {
      const vals = line.map(i => b[i]);
      if (!vals.includes(-1)) score += 1; // line open for X
      if (!vals.includes(1))  score -= 1; // line open for O
    }
    return score;
  };

  const empties = (b) => b.reduce((acc, v, i) => (v === 0 ? (acc.push(i), acc) : acc), []);
  const clone = (b) => [...b];

  stepsArr.push({ board: copySteps(board), message: "Running Minimax..." });

  // Depth-limited minimax to keep the viz snappy
  const minimax = (b, maximizing, depth = 0) => {
    const w = winner(b);
    const empty = empties(b);

    if (w !== 0 || empty.length === 0 || depth > 6) {
      const val = evalBoard(b);
      stepsArr.push({ board: copySteps(b), message: `Depth ${depth}: leaf score = ${val}` });
      return val;
    }

    if (maximizing) {
      let best = -Infinity;
      for (const idx of empty) {
        const nb = clone(b);
        nb[idx] = 1; // X
        stepsArr.push({ board: copySteps(nb), message: `Try X at ${idx} (depth ${depth})` });
        const val = minimax(nb, false, depth + 1);
        best = Math.max(best, val);
        stepsArr.push({ board: copySteps(nb), message: `Backtrack X at ${idx} → score ${val}` });
      }
      return best;
    } else {
      let best = Infinity;
      for (const idx of empty) {
        const nb = clone(b);
        nb[idx] = -1; // O
        stepsArr.push({ board: copySteps(nb), message: `Try O at ${idx} (depth ${depth})` });
        const val = minimax(nb, true, depth + 1);
        best = Math.min(best, val);
        stepsArr.push({ board: copySteps(nb), message: `Backtrack O at ${idx} → score ${val}` });
      }
      return best;
    }
  };

  minimax(board, true, 0);
  stepsArr.push({ board: copySteps(board), message: "Minimax complete." });
  return stepsArr;
};


  // 2️⃣ Alpha-Beta Pruning
  const runAlphaBeta = (board = sampleBoard) => {
    const stepsArr = [];
    stepsArr.push({ board: copySteps(board), message: "Running Alpha-Beta Pruning..." });
    stepsArr.push({ board: copySteps(board), message: "Alpha-Beta Pruning complete." });
    return stepsArr;
  };

  // 3️⃣ Expectimax
// 3️⃣ Expectimax (Max player X; opponent is a chance node that picks uniformly at random)
const runExpectimax = (board = sampleBoard) => {
  const stepsArr = [];
  const size = boardSize;

  // Build win lines (same as minimax)
  const lines = [];
  for (let r = 0; r < size; r++) lines.push([...Array(size)].map((_, c) => r * size + c));
  for (let c = 0; c < size; c++) lines.push([...Array(size)].map((_, r) => r * size + c));
  lines.push([...Array(size)].map((_, i) => i * size + i));
  lines.push([...Array(size)].map((_, i) => (i + 1) * size - (i + 1)));

  const winner = (b) => {
    for (const line of lines) {
      const sum = line.reduce((acc, idx) => acc + b[idx], 0);
      if (sum === size) return 1;     // X wins
      if (sum === -size) return -1;   // O wins
    }
    return 0;
  };

  const evalBoard = (b) => {
    const w = winner(b);
    if (w !== 0) return w * 10; // terminal bias
    // simple heuristic: open lines X minus open lines O
    let score = 0;
    for (const line of lines) {
      const vals = line.map(i => b[i]);
      if (!vals.includes(-1)) score += 1;
      if (!vals.includes(1))  score -= 1;
    }
    return score;
  };

  const empties = (b) => b.reduce((acc, v, i) => (v === 0 ? (acc.push(i), acc) : acc), []);
  const clone = (b) => [...b];
  const push = (b, message, meta = {}) => stepsArr.push({ board: copySteps(b), message, meta });

  // Depth limit to keep viz tidy
  const MAX_DEPTH = 6;

  push(board, "Running Expectimax (X = Max, O = Chance)…", { depth: 0, node: "max" });

  // node: "max" | "chance"
  const expectimax = (b, depth, node) => {
    const w = winner(b);
    const moves = empties(b);

    // leaf / cutoff
    if (w !== 0 || moves.length === 0 || depth > MAX_DEPTH) {
      const val = evalBoard(b);
      push(b, `Depth ${depth}: leaf score = ${val}`, { depth, node, leaf: true, value: val });
      return val;
    }

    if (node === "max") {
      // Max chooses the move with highest expected value
      let best = -Infinity;
      let bestIdx = -1;
      for (const idx of moves) {
        const nb = clone(b);
        nb[idx] = 1; // X
        push(nb, `Max: try X at ${idx} (d=${depth})`, { depth, node: "max", move: idx });
        const val = expectimax(nb, depth + 1, "chance");
        push(nb, `Backtrack from X at ${idx} → expected ${val}`, { depth, node: "max", move: idx, backtrack: true, value: val });
        if (val > best) { best = val; bestIdx = idx; }
      }
      // Annotate best move at this Max node (for clarity)
      push(b, `Max picks best expected = ${best} (d=${depth})`, { depth, node: "max", best: bestIdx, value: best });
      return best;
    } else {
      // Chance node: opponent O picks uniformly among all moves
      let expected = 0;
      const p = 1 / moves.length;
      for (const idx of moves) {
        const nb = clone(b);
        nb[idx] = -1; // O
        push(nb, `Chance: branch O at ${idx} with p=${p.toFixed(2)} (d=${depth})`, { depth, node: "chance", move: idx, p });
        const val = expectimax(nb, depth + 1, "max");
        expected += p * val;
        push(nb, `Chance: contribution p*val = ${(p * val).toFixed(2)}`, { depth, node: "chance", move: idx, p, value: val });
      }
      push(b, `Chance: expected value = ${expected.toFixed(2)} (d=${depth})`, { depth, node: "chance", value: expected });
      return expected;
    }
  };

  expectimax(board, 0, "max");
  push(board, "Expectimax complete.", { done: true });
  return stepsArr;
};


  // 4️⃣ Monte Carlo Tree Search
  const runMCTS = (board = sampleBoard) => {
    const stepsArr = [];
    stepsArr.push({ board: copySteps(board), message: "Running MCTS..." });
    stepsArr.push({ board: copySteps(board), message: "MCTS complete." });
    return stepsArr;
  };

  // ================= Animation =================
  const runAlgorithm = () => {
    let generatedSteps = [];
    switch (algorithm) {
      case "minimax": generatedSteps = runMinimax(); break;
      case "alphaBetaPruning": generatedSteps = runAlphaBeta(); break;
      case "expectimax": generatedSteps = runExpectimax(); break;
      case "mcts": generatedSteps = runMCTS(); break;
      default: setMessage("Algorithm not implemented!"); return;
    }
    if (generatedSteps.length === 0) { setMessage("No steps generated."); return; }
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(true);
  };

   useEffect(() => {
      if (!isVisualizing || steps.length === 0) return;
    // Stop on the LAST valid index (no extra tick past the end)
      if (currentStep >= steps.length - 1) {
          setIsVisualizing(false);
          setMessage("Visualization complete!");
          return;
        }
        const timer = setTimeout(() => setCurrentStep(prev => prev + 1), speedMs);
        return () => clearTimeout(timer);
      }, [currentStep, isVisualizing, steps, speedMs]);

  const prevStep = () => setCurrentStep(prev => Math.max(prev-1,0));
  const nextStep = () => setCurrentStep(prev => Math.min(prev+1,steps.length-1));
  const resetVisualizer = () => { setSteps([]); setCurrentStep(0); setIsVisualizing(false); setMessage("Select an algorithm and run."); };

   const togglePlayPause = () => {
      if (!steps.length) return;
        setIsVisualizing(v => !v);
      };
    
      // identify moved index for highlight
      const getChangedIndex = () => {
        if (currentStep === 0 || !steps[currentStep] || !steps[currentStep-1]) return -1;
        const a = steps[currentStep-1].board || [];
        const b = steps[currentStep].board || [];
        for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) return i;
        return -1;
      };
     const changedIndex = getChangedIndex();

  const meta = steps[currentStep]?.meta;

  {meta && (
    <div className="ab-hud">
      <span>node: <strong>{meta.node ?? "—"}</strong></span>
      <span>depth: <strong>{meta.depth ?? "—"}</strong></span>
      {typeof meta.value === "number" && (
        <span>value: <strong>{Number.isInteger(meta.value) ? meta.value : meta.value.toFixed(2)}</strong></span>
      )}
      {meta.p !== undefined && <span>p: <strong>{meta.p.toFixed(2)}</strong></span>}
    </div>
  )}


  const renderBoard = () => {
    if (!steps[currentStep]) return null;
    const stepBoard = steps[currentStep].board;

      // 1D NxN board → grid of cells with X/O symbols
        if (Array.isArray(stepBoard) && stepBoard.length && typeof stepBoard[0] === 'number') {
          const symbol = (v) => v === 1 ? "X" : v === -1 ? "O" : "";
          return (
            <div
              className="ttt-grid"
              style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
            >
              {stepBoard.map((v, i) => (
                <div
                  key={i}
                  className={`ttt-cell ${i === changedIndex ? "cell-changed" : ""} ${v === 1 ? "cell-x" : v === -1 ? "cell-o" : ""}`}
                >
                  {symbol(v)}
                </div>
              ))}
            </div>
          );
        }

    if (Array.isArray(stepBoard) && stepBoard.length && typeof stepBoard[0]==='object') {
      return (
        <div className="board">
          {stepBoard.map((item,i)=>(
            <div key={i} className="board-row">
              {Object.entries(item).map(([k,v],j)=>(
                <div key={j} className="cell">{`${k}:${v}`}</div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    return <pre>{JSON.stringify(stepBoard,null,2)}</pre>;
  };

  return (
    <div className="game-search-visualizer">
      <h2>Game Search Algorithm Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select value={algorithm} onChange={(e)=>setAlgorithm(e.target.value)} disabled={isVisualizing}>
          <option value="minimax">Minimax</option>
          <option value="alphaBetaPruning">Alpha-Beta Pruning</option>
          <option value="expectimax">Expectimax</option>
          <option value="mcts">Monte Carlo Tree Search</option>
        </select>
        <button className="btn-primary" onClick={runAlgorithm} disabled={isVisualizing}>Run</button>
        <button onClick={togglePlayPause} disabled={!steps.length}>{isVisualizing ? "Pause" : "Play"}</button>
        <button onClick={prevStep} disabled={currentStep===0}>Prev</button>
        <button onClick={nextStep} disabled={currentStep===steps.length-1}>Next</button>
        <button onClick={resetVisualizer} disabled={isVisualizing}>Reset</button>
     </div>
     
     <div className="controls secondary">
        <label htmlFor="speed">Speed:</label>
        <input
          id="speed"
          type="range"
          min="100"
          max="1500"
          step="50"
          value={speedMs}
          onChange={(e)=>setSpeedMs(Number(e.target.value))}
          title={`${speedMs} ms`}
        />
        <span className="muted">{speedMs} ms</span>
        <span className="muted">Step {totalSteps ? currentStep + 1 : 0} / {totalSteps || 0}</span>
       </div>
 
      <div className="progressbar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>

      {renderBoard()}

      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default GameSearchVisualizer;
