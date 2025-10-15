import React from 'react';
import { Link } from 'react-router-dom';

const PerformanceDocs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Performance Analysis Documentation</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">What is Performance Analysis?</h2>
        <p className="text-gray-300 mb-4">
          The Performance Analysis feature in AlgoVisualizer allows you to empirically measure and visualize 
          the actual runtime performance of algorithms with different input sizes. This bridges the gap between 
          theoretical Big O notation and real-world performance characteristics.
        </p>
        
        <h3 className="text-xl font-bold mb-3 text-white">Key Features</h3>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li>Real-time execution time measurement</li>
          <li>Performance visualization with interactive charts</li>
          <li>Comparison of different algorithms</li>
          <li>Analysis with various data types (random, sorted, reverse, nearly sorted)</li>
          <li>Customizable input sizes for detailed analysis</li>
        </ul>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">How to Use Performance Analysis</h2>
        
        <h3 className="text-xl font-bold mb-3 text-white">1. In Algorithm Visualizers</h3>
        <p className="text-gray-300 mb-4">
          When viewing any algorithm visualization, you'll see a "Show Analysis" button in the controls. 
          Click this button to reveal the performance analysis panel below the visualization.
        </p>
        
        <h3 className="text-xl font-bold mb-3 text-white">2. Performance Dashboard</h3>
        <p className="text-gray-300 mb-4">
          Visit the <Link to="/performance" className="text-blue-400 hover:underline">Performance Dashboard</Link> to 
          analyze algorithms without running visualizations. This is useful for comparing multiple algorithms 
          or conducting detailed performance studies.
        </p>
        
        <h3 className="text-xl font-bold mb-3 text-white">3. Customizing Analysis</h3>
        <p className="text-gray-300 mb-4">
          You can customize your performance analysis by:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li>Selecting different data types (random, sorted, etc.)</li>
          <li>Specifying custom input sizes</li>
          <li>Adjusting the range of input sizes to test</li>
        </ul>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Understanding the Results</h2>
        
        <h3 className="text-xl font-bold mb-3 text-white">Performance Charts</h3>
        <p className="text-gray-300 mb-4">
          The line chart shows execution time (in milliseconds) on the Y-axis and input size on the X-axis. 
          This visualization helps you see how an algorithm's performance scales with larger inputs.
        </p>
        
        <h3 className="text-xl font-bold mb-3 text-white">Performance Data Table</h3>
        <p className="text-gray-300 mb-4">
          The data table provides detailed measurements for each input size, including:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li>Input size</li>
          <li>Execution time in milliseconds</li>
          <li>Growth factor compared to the previous input size</li>
        </ul>
        
        <h3 className="text-xl font-bold mb-3 text-white">Complexity Estimation</h3>
        <p className="text-gray-300 mb-4">
          The growth factor helps you understand the algorithm's empirical complexity. For example:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li>A factor near 1 indicates constant time O(1)</li>
          <li>A factor near log(n) indicates logarithmic time O(log n)</li>
          <li>A factor near n indicates linear time O(n)</li>
          <li>A factor near n² indicates quadratic time O(n²)</li>
        </ul>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Benefits for Learning</h2>
        <p className="text-gray-300 mb-4">
          This feature enhances the educational value of AlgoVisualizer by:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li>Providing empirical evidence for theoretical complexity analysis</li>
          <li>Helping students understand real-world performance implications</li>
          <li>Enabling comparison of algorithms in practical scenarios</li>
          <li>Supporting deeper exploration of algorithm behavior with different data types</li>
        </ul>
        
        <p className="text-gray-300">
          Try out the performance analysis feature today and gain deeper insights into how algorithms 
          perform in practice!
        </p>
      </div>
    </div>
  );
};

export default PerformanceDocs;