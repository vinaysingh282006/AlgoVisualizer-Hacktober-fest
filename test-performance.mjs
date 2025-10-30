// Simple test for performance algorithms
import { readFile } from 'fs/promises';
import { performanceAlgorithms } from './src/algorithms/performanceAlgorithms.js';

// Test data
const testArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = [11, 12, 22, 25, 34, 64, 90];
const searchArray = [11, 12, 22, 25, 34, 64, 90]; // Must be sorted for search algorithms
const target = 25;

console.log('Testing performance algorithms implementation...');

// Test that we can import the module
console.log('✓ Performance algorithms module imported successfully');

// Test some of the existing algorithms
try {
  const bubbleResult = performanceAlgorithms["Bubble Sort"](testArray);
  console.log('✓ Bubble Sort works:', JSON.stringify(bubbleResult) === JSON.stringify(sortedArray));
} catch (error) {
  console.log('✗ Bubble Sort failed:', error.message);
}

try {
  const quickResult = performanceAlgorithms["Quick Sort"](testArray);
  console.log('✓ Quick Sort works:', JSON.stringify(quickResult) === JSON.stringify(sortedArray));
} catch (error) {
  console.log('✗ Quick Sort failed:', error.message);
}

// Test some of our new algorithms
try {
  const bucketResult = performanceAlgorithms["Bucket Sort"](testArray);
  console.log('✓ Bucket Sort works:', JSON.stringify(bucketResult) === JSON.stringify(sortedArray));
} catch (error) {
  console.log('✗ Bucket Sort failed:', error.message);
}

try {
  const cocktailResult = performanceAlgorithms["Cocktail Shaker Sort"](testArray);
  console.log('✓ Cocktail Shaker Sort works:', JSON.stringify(cocktailResult) === JSON.stringify(sortedArray));
} catch (error) {
  console.log('✗ Cocktail Shaker Sort failed:', error.message);
}

try {
  const countingResult = performanceAlgorithms["Counting Sort"](testArray);
  console.log('✓ Counting Sort works:', JSON.stringify(countingResult) === JSON.stringify(sortedArray));
} catch (error) {
  console.log('✗ Counting Sort failed:', error.message);
}

// Test searching algorithms
try {
  const linearResult = performanceAlgorithms["Linear Search"](searchArray, target);
  console.log('✓ Linear Search works:', linearResult === 3);
} catch (error) {
  console.log('✗ Linear Search failed:', error.message);
}

try {
  const binaryResult = performanceAlgorithms["Binary Search"](searchArray, target);
  console.log('✓ Binary Search works:', binaryResult === 3);
} catch (error) {
  console.log('✗ Binary Search failed:', error.message);
}

// Test some new searching algorithms
try {
  const jumpResult = performanceAlgorithms["Jump Search"](searchArray, target);
  console.log('✓ Jump Search works:', jumpResult === 3);
} catch (error) {
  console.log('✗ Jump Search failed:', error.message);
}

try {
  const fibResult = performanceAlgorithms["Fibonacci Search"](searchArray, target);
  console.log('✓ Fibonacci Search works:', fibResult === 3);
} catch (error) {
  console.log('✗ Fibonacci Search failed:', error.message);
}

console.log('\nImplementation verification complete!');