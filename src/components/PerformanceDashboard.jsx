import React, { useState } from 'react';
import ComplexityAnalyzer from './ComplexityAnalyzer';
import { performanceAlgorithms } from '../algorithms/performanceAlgorithms';

const PerformanceDashboard = () => {
  const [selectedAlgorithmName, setSelectedAlgorithmName] = useState('');
  
  const handleAlgorithmSelect = (e) => {
    const algorithmName = e.target.value;
    setSelectedAlgorithmName(algorithmName);
  };
  
  return (
    <div className="performance-dashboard max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Algorithm Performance Analyzer</h2>
      
      <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-white">Select Algorithm</h3>
        <div className="flex flex-wrap gap-4">
          <select 
            onChange={handleAlgorithmSelect}
            className="bg-gray-700 text-white rounded px-4 py-2 flex-grow max-w-md"
            value={selectedAlgorithmName}
          >
            <option value="">Choose an algorithm</option>
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
            <option value="Selection Sort">Selection Sort</option>
            <option value="Quick Sort">Quick Sort</option>
            <option value="Merge Sort">Merge Sort</option>
            <option value="Linear Search">Linear Search</option>
            <option value="Binary Search">Binary Search</option>
          </select>
          
          {selectedAlgorithmName && (
            <div className="bg-blue-900 text-blue-100 px-4 py-2 rounded">
              Selected: {selectedAlgorithmName}
            </div>
          )}
        </div>
      </div>
      
      {selectedAlgorithmName ? (
        <ComplexityAnalyzer 
          algorithm={performanceAlgorithms[selectedAlgorithmName] || null} 
          algorithmName={selectedAlgorithmName}
        />
      ) : (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <p className="text-gray-400 text-lg">Select an algorithm to analyze its performance</p>
        </div>
      )}
    </div>
  );
};

export default PerformanceDashboard;