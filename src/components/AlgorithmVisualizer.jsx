// src/components/AlgorithmVisualizer.jsx
import React, { useState, useEffect, useMemo, useCallback, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import algorithmsData from "../algorithms/algorithms.json";
import "../styles/UnifiedVisualizer.css";
import ComplexityAnalyzer from "./ComplexityAnalyzer";
import { performanceAlgorithms } from "../algorithms/performanceAlgorithms";
import { AlgorithmUtils } from "../algorithms/runner"; // ✅ Import AlgorithmUtils

// Import all your algorithm functions here
import { runAlgorithmAsync, getAlgorithmType } from "../algorithms/runner";

// Configuration constants for better maintainability
const DEFAULT_ARRAY_SIZE = 15;
const DEFAULT_ANIMATION_SPEED = 300;
const MIN_ANIMATION_SPEED = 50;
const MAX_ANIMATION_SPEED = 1200;
const BAR_HEIGHT_MULTIPLIER = 2.2;
const MIN_BAR_HEIGHT = 2;

// Utility functions for better code organization
const arrayUtils = {
  generateRandomArray: (size) => Array.from(
    { length: size },
    () => Math.floor(Math.random() * 50) + 5
  ),
  
  getRandomElement: (arr) => arr[Math.floor(Math.random() * arr.length)]
};

// Visualization configuration
const VISUALIZATION_CONFIG = {
  barWidth: "26px",
  motionTransition: "height {speed}ms cubic-bezier(.2,.8,.2,1), background-color 180ms ease",
  highlightScale: "scaleY(1.12)",
  normalScale: "scaleY(1)"
};

export default function AlgorithmVisualizer({
  algorithmName,
  initialArray,
  visualOnly = false,
  hideTitle = false,
  array: externalArray,
  colorArray,
  barGap,
  fontSize,
}) {
  // Consolidated state management
  const [state, setState] = useState({
    array: [],
    steps: [],
    currentStep: 0,
    target: null,
    isAnimating: false,
    isPaused: false,
    animationSpeedMs: DEFAULT_ANIMATION_SPEED,
    barMotion: true,
    perspective3D: false
  });

  const [error, setError] = useState(null);
  const [showPerformanceAnalysis, setShowPerformanceAnalysis] = useState(false);

  // ✅ Responsive bar width calculation
const containerRef = useRef(null);
const [computedBarWidth, setComputedBarWidth] = useState(26); // default width

const computeBarWidth = useCallback(() => {
  const container = containerRef.current;
  if (!container) return;

  const numBars = state.array?.length || 0;
  const gap = 8; // space between bars
  const containerWidth = container.clientWidth;
  const totalGap = gap * (numBars - 1);
  const availableWidth = containerWidth - totalGap;

  // Minimum and maximum bar width limits
  const minWidth = 6;
  const maxWidth = 60;

  let width = numBars > 0 ? Math.floor(availableWidth / numBars) : 26;
  width = Math.max(minWidth, Math.min(maxWidth, width));

  setComputedBarWidth(width);
}, [state.array]);

// ✅ Recompute bar width on mount and window resize
useLayoutEffect(() => {
  computeBarWidth();
  window.addEventListener("resize", computeBarWidth);
  return () => window.removeEventListener("resize", computeBarWidth);
}, [computeBarWidth]);


  // Determine if component is controlled by external array
  const controlled = useMemo(() => Array.isArray(externalArray), [externalArray]);
 
  // Generate new array
  const generateArray = useCallback(() => {
    if (controlled) return;
    
    const newArr = arrayUtils.generateRandomArray(DEFAULT_ARRAY_SIZE);
    
    setState(prev => ({
      ...prev,
      array: newArr,
      steps: [],
      currentStep: 0,
      target: algorithmsData.find((a) => a.name === algorithmName)?.type === "searching" 
        ? arrayUtils.getRandomElement(newArr) 
        : null
    }));
  }, [controlled, algorithmName]);

  // Apply initialArray from props when provided/changed
  useEffect(() => {
    if (controlled) return;
    
    if (Array.isArray(initialArray) && initialArray.length > 0) {
      setState(prev => ({
        ...prev,
        array: [...initialArray],
        steps: [],
        currentStep: 0,
        target: algorithmsData.find((a) => a.name === algorithmName)?.type === "searching"
          ? arrayUtils.getRandomElement(initialArray)
          : null
      }));
    }
  }, [initialArray, algorithmName, controlled]);

  // If no initialArray provided, generate a default once on mount
  useEffect(() => {
    if (controlled) return;
    if (!initialArray || initialArray.length === 0) {
      generateArray();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Run the algorithm and generate steps
  useEffect(() => {
    if (visualOnly || controlled) {
      setState(prev => ({ ...prev, steps: [], currentStep: 0 }));
      return;
    }
    // Do not auto-run; wait for Start
  }, [visualOnly, controlled]);

  const handleStart = useCallback(() => {
    if (visualOnly || controlled) return; // nothing to animate in visual-only
    
    (async () => {
      try {
        const result = await runAlgorithmAsync(algorithmName, state.array, state.target);
        setState(prev => ({ 
          ...prev, 
          steps: result.steps || [],
          currentStep: 0,
          isAnimating: true
        }));
      } catch (err) {
        setError(err.message); // show error if fail
      }
    })();
  }, [visualOnly, controlled, algorithmName, state.array, state.target]);

  const handlePauseResume = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const handleReset = useCallback(() => {
    // Clear the animation interval
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }
    
    setState(prev => ({ 
      ...prev, 
      steps: [],
      currentStep: 0,
      isAnimating: false,
      isPaused: false
    }));
    
    // Reset array to original state
    if (!controlled && Array.isArray(initialArray) && initialArray.length > 0) {
      setState(prev => ({ ...prev, array: [...initialArray] }));
    } else {
      if (!controlled) generateArray();
    }
  }, [controlled, initialArray, generateArray]);

  // Animate steps with pause/resume support
  useEffect(() => {
    if (controlled) return;
    if (!state.isAnimating || state.steps.length === 0) return;
    
    // Clear any existing interval
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }
    
    // Don't start new interval if paused
    if (state.isPaused) return;
    
    animationIntervalRef.current = setInterval(() => {
      setState(prev => {
        // Don't advance if paused
        if (prev.isPaused) return prev;
        
        const next = prev.currentStep + 1;
        const step = prev.steps[next];
        
        if (step && step.type === "swap" && Array.isArray(step.array)) {
          return { ...prev, array: step.array, currentStep: next };
        } else if (step && step.type === "move" && Array.isArray(step.array)) {
          return { ...prev, array: step.array, currentStep: next };
        } else if (step && step.type === "cycle" && Array.isArray(step.array)) {
          return { ...prev, array: step.array, currentStep: next };
        } else if (step && step.type === "done" && Array.isArray(step.array)) {
          return { ...prev, array: step.array, currentStep: next };
        }
        
        if (next < prev.steps.length - 1) return { ...prev, currentStep: next };
        
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
        }
        return { ...prev, isAnimating: false, isPaused: false, currentStep: next };
      });
    }, Math.max(MIN_ANIMATION_SPEED, state.animationSpeedMs));
    
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [state.isAnimating, state.isPaused, state.steps, state.animationSpeedMs, controlled]);

  // Determine algorithm type using centralized runner
  const resolveAlgoType = useCallback((name) => getAlgorithmType(name), []);
  const algoType = useMemo(() => resolveAlgoType(algorithmName), [algorithmName, resolveAlgoType]);
  const displayArray = useMemo(() => controlled ? externalArray ?? [] : state.array, [controlled, externalArray, state.array]);

  // ✅ Check if algorithm requires special handling
  const requiresSpecialHandling = useMemo(() => {
    // Algorithms that modify array in real-time or have unique visualization needs
    const specialAlgorithms = ["Sleep Sort"];
    return specialAlgorithms.includes(algorithmName);
  }, [algorithmName]);

  // Handler functions for state updates
  const updateState = useCallback((key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateTarget = useCallback((value) => {
    updateState('target', Number(value));
  }, [updateState]);

  const updateAnimationSpeed = useCallback((value) => {
    updateState('animationSpeedMs', Number(value));
  }, [updateState]);

  const toggleBarMotion = useCallback(() => {
    updateState('barMotion', !state.barMotion);
  }, [state.barMotion, updateState]);

  const togglePerspective3D = useCallback(() => {
    updateState('perspective3D', !state.perspective3D);
  }, [state.perspective3D, updateState]);

  // Keyboard controls for speed adjustment and pause/resume
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle if not in input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setState(prev => ({
          ...prev,
          animationSpeedMs: Math.max(MIN_ANIMATION_SPEED, prev.animationSpeedMs - 50)
        }));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setState(prev => ({
          ...prev,
          animationSpeedMs: Math.min(MAX_ANIMATION_SPEED, prev.animationSpeedMs + 50)
        }));
      } else if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        // Spacebar or 'P' to pause/resume
        e.preventDefault();
        setState(prev => {
          // Only toggle if animation is running
          if (prev.isAnimating) {
            return { ...prev, isPaused: !prev.isPaused };
          }
          return prev;
        });
      }
    };

    if (!visualOnly && !controlled) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [visualOnly, controlled]);

  // Get speed label for better UX
  const getSpeedLabel = useCallback((speed) => {
    if (speed <= 100) return "Very Fast";
    if (speed <= 250) return "Fast";
    if (speed <= 500) return "Normal";
    if (speed <= 800) return "Slow";
    return "Very Slow";
  }, []);

  // Memoize the bar rendering to prevent unnecessary re-renders
  const renderBars = useMemo(() => {
    return displayArray.map((val, idx) => {
      let colorClass = "bar-default";
      let isHighlighted = false;
      const step = state.steps[state.currentStep];
      
      // ✅ Special handling for algorithms that modify array in real-time
      if (requiresSpecialHandling && state.isAnimating && !state.isPaused) {
        colorClass = "bar-move"; // Use move color for real-time algorithms
      } else if (!visualOnly && !controlled && step) {
        if (step.type === "compare" && Array.isArray(step.indices)) {
          isHighlighted = step.indices.includes(idx);
          if (isHighlighted) colorClass = "bar-compare";
        } else if (step.type === "swap") {
          isHighlighted = step.indices && step.indices.includes(idx);
          if (isHighlighted) colorClass = "bar-swap";
        } else if (step.type === "move") {
          isHighlighted = step.indices && step.indices.includes(idx);
          if (isHighlighted) colorClass = "bar-move";
        } else if (step.type === "cycle") {
          isHighlighted = step.indices && step.indices.includes(idx);
          if (isHighlighted) colorClass = "bar-cycle";
        } else if (step.type === "probe") {
          isHighlighted = step.index === idx;
          if (isHighlighted) colorClass = "bar-probe";
        } else if (step.type === "done") {
          colorClass = "bar-done";
        }
      }

      // Enhanced bar with Framer Motion animations and 3D effects
      return (
        <motion.div
          key={idx}
          className={`visualization-bar ${colorClass}`}
          style={{
            height: `${Math.max(val, MIN_BAR_HEIGHT) * BAR_HEIGHT_MULTIPLIER}px`,
            width: `${computedBarWidth}px`,
            backgroundColor: Array.isArray(colorArray) ? colorArray[idx] : undefined,
            transition: state.barMotion
              ? VISUALIZATION_CONFIG.motionTransition.replace('{speed}', state.animationSpeedMs)
              : "none",
            transformStyle: "preserve-3d",
            transform: state.perspective3D 
              ? `perspective(1000px) rotateX(15deg) translateZ(${isHighlighted ? 10 : 0}px)`
              : "none"
          }}
          initial={{ 
            scale: 0.8,
            opacity: 0.7,
            y: 20
          }}
          animate={{ 
            scale: isHighlighted ? 1.15 : 1,
            opacity: 1,
            y: 0,
            boxShadow: isHighlighted 
              ? "0 0 15px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.4)" 
              : "0 2px 8px rgba(0, 0, 0, 0.1)",
            zIndex: isHighlighted ? 10 : 1
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            duration: state.animationSpeedMs / 1000
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5)",
            zIndex: 20,
            y: -5
          }}
        >
          <motion.span 
            className="bar-value"
            style={{ fontSize: fontSize ?? undefined }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {val}
          </motion.span>
        </motion.div>
      );
    });
  }, [displayArray, visualOnly, controlled, state.steps, state.currentStep, colorArray, state.barMotion, state.animationSpeedMs, fontSize, requiresSpecialHandling, state.isAnimating, state.isPaused, computedBarWidth, state.perspective3D]);

  return (
    <div className="unified-visualizer">
      {!hideTitle && (
        <motion.h2 
          className="text-xl font-bold mb-2 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {algorithmName ?? "Visualizer"}
        </motion.h2>
      )}
      {!visualOnly && !controlled && (
        <motion.div 
          className="visualization-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button 
            onClick={generateArray}
            aria-label="Generate new array"
          >
            Generate Array
          </button>
          <button
            onClick={handleStart}
            disabled={state.isAnimating}
            aria-label={state.isAnimating ? "Running algorithm" : "Start algorithm"}
          >
            {state.isAnimating ? "Running..." : "Start"}
          </button>
          <button
            onClick={handlePauseResume}
            disabled={!state.isAnimating}
            aria-label={state.isPaused ? "Resume algorithm" : "Pause algorithm"}
            className={state.isPaused ? "pause-btn paused" : "pause-btn"}
            title={state.isPaused ? "Resume (Space/P)" : "Pause (Space/P)"}
          >
            {state.isPaused ? "▶️ Resume" : "⏸️ Pause"}
          </button>
          <button
            onClick={() => {
              if (animationIntervalRef.current) {
                clearInterval(animationIntervalRef.current);
              }
              updateState('isAnimating', false);
              updateState('isPaused', false);
            }}
            disabled={!state.isAnimating}
            aria-label="Stop algorithm"
          >
            Stop
          </button>
          <button 
            onClick={handleReset}
            aria-label="Reset visualization"
          >
            Reset
          </button>
          <button 
            onClick={() => setShowPerformanceAnalysis(!showPerformanceAnalysis)}
            aria-label="Toggle performance analysis"
          >
            {showPerformanceAnalysis ? "Hide Analysis" : "Show Analysis"}
          </button>
          {algorithmsData.find((a) => a.name === algorithmName)?.type ===
            "searching" && (
            <input
              type="number"
              value={state.target ?? ""}
              onChange={(e) => updateTarget(e.target.value)}
              placeholder="Target"
              aria-label="Search target value"
            />
          )}
          <div className="speed-control-wrapper">
            <div className="speed-control-header">
              <label className="speed-label">
                Speed: <span className="speed-value">{state.animationSpeedMs}ms</span>
              </label>
              <span className="speed-badge">{getSpeedLabel(state.animationSpeedMs)}</span>
            </div>
            <div className="speed-slider-container">
              <button
                className="speed-adjust-btn"
                onClick={() => updateAnimationSpeed(Math.min(MAX_ANIMATION_SPEED, state.animationSpeedMs + 50))}
                aria-label="Decrease speed"
                title="Decrease speed (or press -)"
              >
                −
              </button>
              <input
                type="range"
                className="speed-slider"
                min={MIN_ANIMATION_SPEED}
                max={MAX_ANIMATION_SPEED}
                step="20"
                value={state.animationSpeedMs}
                onChange={(e) => updateAnimationSpeed(e.target.value)}
                aria-label="Animation speed control"
                aria-valuetext={`${state.animationSpeedMs} milliseconds, ${getSpeedLabel(state.animationSpeedMs)}`}
              />
              <button
                className="speed-adjust-btn"
                onClick={() => updateAnimationSpeed(Math.max(MIN_ANIMATION_SPEED, state.animationSpeedMs - 50))}
                aria-label="Increase speed"
                title="Increase speed (or press +)"
              >
                +
              </button>
            </div>
            <div className="speed-indicators">
              <span className="speed-indicator-label">Faster</span>
              <span className="speed-indicator-label">Slower</span>
            </div>
          </div>
          <label>
            <input
              type="checkbox"
              checked={state.barMotion}
              onChange={toggleBarMotion}
              aria-label="Toggle smooth animation"
            />
            Smooth animation
          </label>
          <label>
            <input
              type="checkbox"
              checked={state.perspective3D}
              onChange={togglePerspective3D}
              aria-label="Toggle 3D perspective"
            />
            3D Perspective
          </label>
        </motion.div>
      )}

      {algoType === "searching" && state.target && (
        <motion.p 
          className="target-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Target: {state.target}
        </motion.p>
      )}
      <div
        className="visualization-container" 
        ref={containerRef}
        style={{ 
          gap: barGap ? barGap : undefined,
          perspective: state.perspective3D ? "1000px" : "none"
        }}
      >
        <AnimatePresence>
          {renderBars}
        </AnimatePresence>
      </div>
      
      {showPerformanceAnalysis && !visualOnly && !controlled && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ComplexityAnalyzer 
            algorithm={performanceAlgorithms[algorithmName] || null} 
            algorithmName={algorithmName}
            // ✅ Pass algorithm complexity information
            complexity={AlgorithmUtils.getTimeComplexity(algorithmName)}
          />
        </motion.div>
      )}
      {error && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Error: {error}
        </motion.div>
      )}
    </div>
  );
}