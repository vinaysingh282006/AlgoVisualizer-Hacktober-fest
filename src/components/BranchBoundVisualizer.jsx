// src/components/BranchBoundVisualizer.jsx
import React, { useState, useEffect, useMemo } from "react";
import "../styles/global-theme.css";

/** Normalize user/page values to internal keys */
const normalizeAlgo = (a) => {
  const s = String(a || "").toLowerCase();
  if (s.includes("knap")) return "knapsack";
  return "tsp";
};

const LABELS = { tsp: "TSP (Branch & Bound)", knapsack: "0/1 Knapsack (Branch & Bound)" };

const BranchBoundVisualizer = ({ defaultAlgorithm = "TSP" }) => {
  const [algorithm, setAlgorithm] = useState(normalizeAlgo(defaultAlgorithm));
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [message, setMessage] = useState("Select Branch & Bound algorithm and run.");

  const copySteps = (arr) => arr.map((row) => (Array.isArray(row) ? [...row] : row));

  // ---------- TSP (demo placeholder) ----------
  const tspBB = () => {
    const stepsArr = [];
    const costMatrix = [
      [0, 10, 15, 20],
      [10, 0, 35, 25],
      [15, 35, 0, 30],
      [20, 25, 30, 0],
    ];
    stepsArr.push({ type: "matrix", board: copySteps(costMatrix), message: "Initial cost matrix" });
    stepsArr.push({ type: "matrix", board: copySteps(costMatrix), message: "Branch at City A → B" });
    stepsArr.push({ type: "matrix", board: copySteps(costMatrix), message: "Bound ≈ 10, exploring…" });
    stepsArr.push({ type: "matrix", board: copySteps(costMatrix), message: "Found path A-B-D-C-A (cost 80)" });
    return stepsArr;
  };

  // ---------- 0/1 Knapsack (real Branch & Bound) ----------
  /**
   * items: [{w, v}], capacity: number
   * Produces step snapshots while exploring a decision tree with fractional bound.
   */
  const knapsackBB = () => {
    // You can wire these to inputs later:
    const items = [
      { w: 2, v: 40 },
      { w: 3, v: 50 },
      { w: 4, v: 70 },
    ];
    const capacity = 5;

    // Sort by value/weight ratio (standard for bound quality)
    const indexed = items.map((it, i) => ({ ...it, idx: i, r: it.v / it.w }));
    indexed.sort((a, b) => b.r - a.r);

    const takeSnapshot = (node, msg, action = "") => ({
      type: "knapsack",
      items: indexed,
      decisions: node.decisions.slice(), // -1 unseen, 1 include, 0 exclude
      idx: node.level,
      capLeft: node.capLeft,
      value: node.value,
      bound: node.bound,
       capacity,
       action,
      message: msg,
      bestValue: best.value,
      bestMask: best.decisions.slice(),
    });

    // Fractional bound from current level with remaining capacity
    const boundFrom = (level, capLeft, value) => {
      let b = value;
      let c = capLeft;
      for (let i = level; i < indexed.length; i++) {
        const { w, v } = indexed[i];
        if (w <= c) {
          c -= w;
          b += v;
        } else {
          // take fraction
          b += (v / w) * c;
          break;
        }
      }
      return b;
    };

    // Node structure
    const makeNode = (level, capLeft, value, decisions) => {
      const bound = boundFrom(level, capLeft, value);
      return { level, capLeft, value, bound, decisions };
    };

    const stepsArr = [];
    const n = indexed.length;
    const best = { value: 0, decisions: Array(n).fill(0) };

    // DFS stack (LIFO): explore "include" first to find good solutions early
    const stack = [];
    stack.push(makeNode(0, capacity, 0, Array(n).fill(-1)));
    stepsArr.push(takeSnapshot(stack[0], "Start: empty knapsack", "start"));

    while (stack.length) {
      const node = stack.pop();

      // Prune if bound cannot beat best
      if (node.bound <= best.value + 1e-9) {
        stepsArr.push(takeSnapshot(node, "Prune: bound ≤ best, backtrack", "prune"));
        continue;
      }

      if (node.level === n) {
        // Leaf: compare with best
        if (node.value > best.value) {
          best.value = node.value;
          best.decisions = node.decisions.slice();
          stepsArr.push(takeSnapshot(node, "Leaf: update BEST solution", "best"));
        } else {
          stepsArr.push(takeSnapshot(node, "Leaf: not better than best", "leaf"));
        }
        continue;
      }

      const item = indexed[node.level];

      // Branch 1: include item (if it fits)
      if (item.w <= node.capLeft) {
        const d1 = node.decisions.slice();
        d1[node.level] = 1;
        const n1 = makeNode(
          node.level + 1,
          node.capLeft - item.w,
          node.value + item.v,
          d1
        );
        stepsArr.push(takeSnapshot(n1, `Include item #${item.idx + 1} (w=${item.w}, v=${item.v})`, "include"));
        stack.push(n1);
      } else {
        stepsArr.push(takeSnapshot(node, `Cannot include item #${item.idx + 1} (exceeds capacity)`, "skip"));
      }

      // Branch 2: exclude item
      const d0 = node.decisions.slice();
      d0[node.level] = 0;
      const n0 = makeNode(node.level + 1, node.capLeft, node.value, d0);
      stepsArr.push(takeSnapshot(n0, `Exclude item #${item.idx + 1}`, "exclude"));
      stack.push(n0);
    }

    // Final message with best set mapped back to original order
    const chosen = [];
    for (let i = 0; i < n; i++) {
      if (best.decisions[i] === 1) chosen.push(indexed[i].idx + 1);
    }
    stepsArr.push({
      type: "knapsack",
      items: indexed,
      decisions: best.decisions,
      idx: n,
      capLeft: null,
      value: best.value,
      bound: best.value,
      bestValue: best.value,
      bestMask: best.decisions.slice(),
      capacity,
      message: `Done: best value ${best.value} with items ${chosen.join(", ")}`,
      action: "done",
    });

    return stepsArr;
  };

  // ---------- Run / animation ----------
  const runAlgorithm = () => {
    const key = normalizeAlgo(algorithm);
    let generatedSteps = [];
    if (key === "tsp") generatedSteps = tspBB();
    else if (key === "knapsack") generatedSteps = knapsackBB();
    else {
      setMessage("Algorithm not implemented!");
      return;
    }
    if (!generatedSteps.length) {
      setMessage("No steps generated.");
      return;
    }
    setSteps(generatedSteps);
    setCurrentStep(0);
    setIsVisualizing(true);
  };

  useEffect(() => {
    if (isVisualizing && steps.length > 0) {
      if (currentStep >= steps.length - 1) {
        setIsVisualizing(false);
        return;
      }
      const t = setTimeout(() => setCurrentStep((p) => p + 1), 800);
      return () => clearTimeout(t);
    }
  }, [currentStep, isVisualizing, steps]);

  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));
  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, steps.length - 1));
  const resetVisualizer = () => {
    setSteps([]);
    setCurrentStep(0);
    setIsVisualizing(false);
    setMessage("Select Branch & Bound algorithm and run.");
  };

  // ---------- Renderers ----------
  const renderMatrix = (m) => (
    <div className="board">
      {m.map((row, i) => (
        <div key={i} className="board-row">
          {row.map((val, j) => (
            <div key={j} className="cell">{val}</div>
          ))}
        </div>
      ))}
    </div>
  );

  
  const renderKnapsack = (s) => {
    const { items, decisions, idx, capLeft, value, bound, bestValue, capacity, action, message } = s;
  
    // show chips in ORIGINAL order; algo uses ratio-sorted order
    const byOriginal = [...items].sort((a, b) => a.idx - b.idx);
    const posByOrig = new Map();
    items.forEach((it, i) => posByOrig.set(it.idx, i));
  
    const used = (typeof capacity === "number" && typeof capLeft === "number")
      ? capacity - capLeft
      : null;
  
    const tagClass =
      action === "include" ? "bbk-tag bbk-tag--include" :
      action === "exclude" ? "bbk-tag bbk-tag--exclude" :
      action === "prune"   ? "bbk-tag bbk-tag--prune"   :
      action === "best"    ? "bbk-tag bbk-tag--best"    :
      action === "done"    ? "bbk-tag bbk-tag--done"    :
      action === "start"   ? "bbk-tag bbk-tag--start"   :
      "bbk-tag";
  
    return (
      <div className="bbk-layout">
        {/* LEFT: legend + chips */}
        <div className="bbk-left">
          <div className="bbk-stepbar">
            <span className={tagClass}>{(action || "step").toUpperCase()}</span>
            <span className="bbk-stepmsg">{message}</span>
          </div>
  
          <div className="bbk-legend" aria-label="Legend">
            <span className="bbk-chip bbk-chip--include">Include</span>
            <span className="bbk-chip bbk-chip--exclude">Exclude</span>
            <span className="bbk-chip bbk-chip--current">Current</span>
            <span className="bbk-chip bbk-chip--pending">Pending</span>
          </div>
  
          <div className="bbk-grid">
            {byOriginal.map((it) => {
              const iSorted = posByOrig.get(it.idx);
              const d = decisions[iSorted]; // -1 unknown, 0 exclude, 1 include
              const isCurrent = iSorted === idx;
              const cls =
                d === 1 ? "bbk-card bbk-card--include" :
                d === 0 ? "bbk-card bbk-card--exclude" :
                isCurrent ? "bbk-card bbk-card--current" :
                "bbk-card bbk-card--pending";
  
              return (
                <div key={it.idx} className={cls} title={`v/w = ${(it.v/it.w).toFixed(2)}`}>
                  <div className="bbk-card-id">#{it.idx + 1}</div>
                  <div className="bbk-card-meta">
                    w:{it.w} &middot; v:{it.v}
                  </div>
                  {isCurrent && <span className="bbk-dot" aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        </div>
  
        {/* RIGHT: sticky stats card */}
        <aside className="bbk-right">
          <div className="bbk-cardPanel">
            <div className="bbk-kv"><span className="bbk-k">Value</span><span className="bbk-v">{value}</span></div>
            <div className="bbk-kv"><span className="bbk-k">Bound (UB)</span><span className="bbk-v">{Number.isFinite(bound) ? bound.toFixed(2) : "-"}</span></div>
            <div className="bbk-kv"><span className="bbk-k">Best Value</span><span className="bbk-v bbk-v--best">{bestValue}</span></div>
            <div className="bbk-kv"><span className="bbk-k">Capacity Left</span><span className="bbk-v">{capLeft ?? "-"}</span></div>
  
            {typeof capacity === "number" && typeof used === "number" && (
              <div className="bbk-meter">
                <div className="bbk-meterHead">
                  <span>Capacity usage</span>
                  <span className="bbk-meterNum">{used}/{capacity}</span>
                </div>
                <meter min={0} max={capacity} value={used} />
              </div>
            )}
          </div>
        </aside>
  
        {/* Scoped, namespaced styles to avoid global collisions */}
        <style>{`
          .bbk-layout {
            display: grid;
            grid-template-columns: 1fr minmax(240px, 320px);
            gap: 16px;
            align-items: start;
          }
          @media (max-width: 860px) { .bbk-layout { grid-template-columns: 1fr; } .bbk-right { position: static; } }
  
          .bbk-left { display: grid; gap: 12px; }
          .bbk-stepbar { display:flex; gap:10px; align-items:center; }
          .bbk-stepmsg { opacity:.9; }
  
          .bbk-tag {
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 12px;
            border: 1px solid var(--border, #2a2a2a);
            background: var(--surface-bg, #0e0f13);
            white-space: nowrap;
          }
          .bbk-tag--include { background: rgba(76,175,80,.18); border-color: rgba(76,175,80,.45); }
          .bbk-tag--exclude { background: rgba(244,67,54,.18); border-color: rgba(244,67,54,.45); }
          .bbk-tag--prune   { background: rgba(255,193,7,.18);  border-color: rgba(255,193,7,.45); }
          .bbk-tag--best    { background: rgba(79,195,247,.18); border-color: rgba(79,195,247,.45); }
          .bbk-tag--done    { background: rgba(156,39,176,.18); border-color: rgba(156,39,176,.45); }
          .bbk-tag--start   { background: rgba(33,150,243,.18); border-color: rgba(33,150,243,.4); }
  
          .bbk-legend {
            display:flex; gap:8px; flex-wrap:wrap; align-items:center;
            margin-top: 4px; margin-bottom: 4px;
          }
  
          .bbk-chip {
            padding: 4px 8px; font-size: 12px; border-radius: 8px;
            border: 1px solid var(--border, #2a2a2a); background: var(--surface-bg, #0e0f13);
          }
          .bbk-chip--include { background: rgba(76,175,80,.15); border-color: rgba(76,175,80,.45); }
          .bbk-chip--exclude { background: rgba(244,67,54,.14); border-color: rgba(244,67,54,.45); }
          .bbk-chip--current { background: rgba(33,150,243,.12); border-color: rgba(33,150,243,.4); }
          .bbk-chip--pending { opacity: .9; }
  
          .bbk-grid {
            display:grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 12px;
          }
          .bbk-card {
            position: relative;
            padding: 12px;
            border-radius: 10px;
            border: 1px solid var(--border, #2a2a2a);
            background: var(--surface-bg, #0e0f13);
            line-height: 1.3;
          }
          .bbk-card--include { background: rgba(76,175,80,.15); border-color: rgba(76,175,80,.45); }
          .bbk-card--exclude { background: rgba(244,67,54,.14); border-color: rgba(244,67,54,.45); }
          .bbk-card--current { background: rgba(33,150,243,.12); border-color: rgba(33,150,243,.4); }
          .bbk-card--pending { opacity: .95; }
          .bbk-card-id { font-weight: 700; margin-bottom: 4px; }
          .bbk-card-meta { opacity:.85; }
          .bbk-dot { display:inline-block; width:8px; height:8px; border-radius:50%; background: currentColor; margin-left: 6px; }
  
          .bbk-right { position: sticky; top: 8px; }
          .bbk-cardPanel {
            border:1px solid var(--border, #2a2a2a);
            background: var(--surface-bg, #0e0f13);
            border-radius: 12px;
            padding: 14px;
            display: grid; gap: 8px;
          }
          .bbk-kv { display:flex; align-items:center; justify-content:space-between; }
          .bbk-k { opacity:.75; }
          .bbk-v { font-weight: 700; }
          .bbk-v--best { color:#4fc3f7; }
  
          .bbk-meter { margin-top: 6px; display:grid; gap:6px; }
          .bbk-meterHead { display:flex; justify-content:space-between; opacity:.9; }
          .bbk-meter meter { width:100%; height:12px; }
        `}</style>
      </div>
    );
  };
  
  
  

  const renderBoard = () => {
    const step = steps[currentStep];
    if (!step) return null;
    if (step.type === "matrix") return renderMatrix(step.board);
    if (step.type === "knapsack") return renderKnapsack(step);
    return null;
  };

  return (
    <div className="bb-visualizer">
      <h2>Branch & Bound Visualizer</h2>
      <div className="controls">
        <label>Algorithm:</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(normalizeAlgo(e.target.value))}
          disabled={isVisualizing}
        >
          <option value="tsp">{LABELS.tsp}</option>
          <option value="knapsack">{LABELS.knapsack}</option>
        </select>
        <button onClick={runAlgorithm} disabled={isVisualizing}>Run</button>
        <button onClick={prevStep} disabled={isVisualizing || currentStep === 0}>Prev</button>
        <button onClick={nextStep} disabled={isVisualizing || currentStep === steps.length - 1}>Next</button>
        <button onClick={resetVisualizer} disabled={isVisualizing}>Reset</button>
      </div>

      {renderBoard()}

      <p className="message-bar">{steps[currentStep]?.message || message}</p>
    </div>
  );
};

export default BranchBoundVisualizer;
