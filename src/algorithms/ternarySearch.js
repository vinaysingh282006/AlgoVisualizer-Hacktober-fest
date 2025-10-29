import { COLOR, createBaseColors } from "../utils/sortingHelpers";

export const ternarySearch = async (array, target, setColorArray, delay) => {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        // Divide the array into three parts
        const mid1 = left + Math.floor((right - left) / 3);
        const mid2 = right - Math.floor((right - left) / 3);

        // Highlight mid1 and mid2
        setColorArray(prevColors => {
            const newColors = [...prevColors];
            newColors[mid1] = COLOR.comparing; // Highlight first mid
            newColors[mid2] = COLOR.comparing; // Highlight second mid
            return newColors;
        });

        await new Promise(resolve => setTimeout(resolve, delay));

        if (array[mid1] === target) {
            setColorArray(prevColors => {
                const newColors = [...prevColors];
                newColors[mid1] = COLOR.sorted; // Found at mid1
                return newColors;
            });
            return mid1;
        }
        if (array[mid2] === target) {
            setColorArray(prevColors => {
                const newColors = [...prevColors];
                newColors[mid2] = COLOR.sorted; // Found at mid2
                return newColors;
            });
            return mid2;
        }

        if (target < array[mid1]) {
            // Target is in the first third
            setColorArray(prevColors => {
                const newColors = [...prevColors];
                newColors[mid1] = COLOR.base;
                newColors[mid2] = COLOR.base;
                return newColors;
            });
            right = mid1 - 1;
        } else if (target > array[mid2]) {
            // Target is in the third third
            setColorArray(prevColors => {
                const newColors = [...prevColors];
                newColors[mid1] = COLOR.base;
                newColors[mid2] = COLOR.base;
                return newColors;
            });
            left = mid2 + 1;
        } else {
            // Target is in the middle third
            setColorArray(prevColors => {
                const newColors = [...prevColors];
                newColors[mid1] = COLOR.base;
                newColors[mid2] = COLOR.base;
                return newColors;
            });
            left = mid1 + 1;
            right = mid2 - 1;
        }
    }

    return -1; // Target not found
};