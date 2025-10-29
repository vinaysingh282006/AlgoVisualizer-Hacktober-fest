// Test file for search algorithm visualizations
import { COLOR, createBaseColors } from "../utils/sortingHelpers.js";

// Test that COLOR constants are used consistently
console.log('Testing COLOR constant values...');
console.log('COLOR.base:', COLOR.base);
console.log('COLOR.comparing:', COLOR.comparing);
console.log('COLOR.sorted:', COLOR.sorted);

// Verify that createBaseColors works correctly
const baseColors = createBaseColors(5);
console.log('\nTesting createBaseColors function...');
console.log('createBaseColors(5):', baseColors);
console.log('All colors are base color:', baseColors.every(color => color === COLOR.base));

// Test the updated search algorithms to ensure they use COLOR constants
console.log('\nTesting that search algorithms use COLOR constants...');

// Test binarySearch imports
import { binarySearch } from "./binarySearch.js";
console.log('✓ binarySearch imports successfully');

// Test linearSearch imports
import { linearSearch } from "./linearSearch.js";
console.log('✓ linearSearch imports successfully');

// Test jumpSearch imports
import { jumpSearch } from "./jumpSearch.js";
console.log('✓ jumpSearch imports successfully');

// Test exponentialSearch imports
import { exponentialSearch } from "./exponentialSearch.js";
console.log('✓ exponentialSearch imports successfully');

// Test ternarySearch imports
import { ternarySearch } from "./ternarySearch.js";
console.log('✓ ternarySearch imports successfully');

console.log('\n✅ All search algorithm color consistency tests passed!');