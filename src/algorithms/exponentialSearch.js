// exponentialSearch.js
import { COLOR } from "../utils/sortingHelpers";
import { binarySearch } from "./binarySearch"; // (kept in case you still need it elsewhere)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const exponentialSearch = async (array, target, setColorArray, delay) => {
  const n = array.length;
  if (n === 0) return -1;

  // Quick check index 0
  setColorArray(Array.from({ length: n }, (_, idx) => (idx === 0 ? COLOR.comparing : COLOR.base)));
  await sleep(delay);
  if (array[0] === target) {
    setColorArray(Array.from({ length: n }, (_, idx) => (idx === 0 ? COLOR.sorted : COLOR.base)));
    return 0;
  }

  // Exponential probe: 1,2,4,8,...
  let i = 1;
  while (i < n && array[i] <= target) {
    // highlight the probe index i
    setColorArray(Array.from({ length: n }, (_, idx) => (idx === i ? COLOR.comparing : COLOR.base)));
    await sleep(delay);
    i *= 2;
  }

  // Compute window [left, right] to binary-search
  const left = Math.floor(i / 2);
  const right = Math.min(i, n - 1);

  // Shade the window
  setColorArray(
    Array.from({ length: n }, (_, idx) =>
      idx >= left && idx <= right ? COLOR.comparing : COLOR.base
    )
  );
  await sleep(delay);

  // Binary search INSIDE [left, right] on the ORIGINAL array
  let l = left,
    r = right;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);

    // highlight current mid inside the window
    setColorArray(
      Array.from({ length: n }, (_, idx) => {
        if (idx < left || idx > right) return COLOR.base;
        if (idx === mid) return COLOR.comparing;
        return COLOR.scanned;
      })
    );
    await sleep(delay);

    if (array[mid] === target) {
      setColorArray(Array.from({ length: n }, (_, idx) => (idx === mid ? COLOR.sorted : COLOR.base)));
      await sleep(delay);
      return mid; // ✅ return absolute index
    }
    if (array[mid] < target) l = mid + 1;
    else r = mid - 1;
  }

  // Not found
  setColorArray(Array.from({ length: n }, () => COLOR.base));
  await sleep(delay);
  return -1;
};