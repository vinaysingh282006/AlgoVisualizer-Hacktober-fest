// Test file to verify the new performance algorithms work correctly
import { performanceAlgorithms } from './performanceAlgorithms';

// Test data
const testArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = [11, 12, 22, 25, 34, 64, 90];
const searchArray = [11, 12, 22, 25, 34, 64, 90]; // Must be sorted for search algorithms
const target = 25;

console.log('Testing performance algorithms...');

// Test existing algorithms
console.log('\n--- Testing Existing Algorithms ---');

const bubbleResult = performanceAlgorithms["Bubble Sort"](testArray);
console.log('Bubble Sort:', JSON.stringify(bubbleResult) === JSON.stringify(sortedArray) ? 'PASS' : 'FAIL');

const quickResult = performanceAlgorithms["Quick Sort"](testArray);
console.log('Quick Sort:', JSON.stringify(quickResult) === JSON.stringify(sortedArray) ? 'PASS' : 'FAIL');

const linearResult = performanceAlgorithms["Linear Search"](searchArray, target);
console.log('Linear Search:', linearResult === 3 ? 'PASS' : 'FAIL');

// Test new sorting algorithms
console.log('\n--- Testing New Sorting Algorithms ---');

const bucketResult = performanceAlgorithms["Bucket Sort"](testArray);
console.log('Bucket Sort:', JSON.stringify(bucketResult) === JSON.stringify(sortedArray) ? 'PASS' : 'FAIL');

const cocktailResult = performanceAlgorithms["Cocktail Shaker Sort"](testArray);
console.log('Cocktail Shaker Sort:', JSON.stringify(cocktailResult) === JSON.stringify(sortedArray) ? 'PASS' : 'FAIL');

const countingResult = performanceAlgorithms["Counting Sort"](testArray);
console.log('Counting Sort:', JSON.stringify(countingResult) === JSON.stringify(sortedArray) ? 'PASS' : 'FAIL');

const heapResult = performanceAlgorithms["Heap Sort"](testArray);
console.log('Heap Sort:', JSON.stringify(heapResult) === JSON.stringify(sortedArray) ? 'PASS' : 'FAIL');

const introResult = performanceAlgorithms["Intro Sort"](testArray);
console.log('Intro Sort:', JSON.stringify(introResult) === JSON.stringify(sortedArray) ? 'PASS' : 'FAIL');

const radixResult = performanceAlgorithms["Radix Sort"](testArray);
console.log('Radix Sort:', JSON.stringify(radixResult) === JSON.stringify(sortedArray) ? 'PASS' : 'FAIL');

const shellResult = performanceAlgorithms["Shell Sort"](testArray);
console.log('Shell Sort:', JSON.stringify(shellResult) === JSON.stringify(sortedArray) ? 'PASS' : 'FAIL');

const sleepResult = performanceAlgorithms["Sleep Sort"](testArray);
console.log('Sleep Sort:', JSON.stringify(sleepResult) === JSON.stringify(sortedArray) ? 'PASS' : 'FAIL');

const timResult = performanceAlgorithms["Tim Sort"](testArray);
console.log('Tim Sort:', JSON.stringify(timResult) === JSON.stringify(sortedArray) ? 'PASS' : 'FAIL');

// Test new searching algorithms
console.log('\n--- Testing New Searching Algorithms ---');

const jumpResult = performanceAlgorithms["Jump Search"](searchArray, target);
console.log('Jump Search:', jumpResult === 3 ? 'PASS' : 'FAIL');

const fibResult = performanceAlgorithms["Fibonacci Search"](searchArray, target);
console.log('Fibonacci Search:', fibResult === 3 ? 'PASS' : 'FAIL');

const ternaryResult = performanceAlgorithms["Ternary Search"](searchArray, target);
console.log('Ternary Search:', ternaryResult === 3 ? 'PASS' : 'FAIL');

console.log('\nAll tests completed!');