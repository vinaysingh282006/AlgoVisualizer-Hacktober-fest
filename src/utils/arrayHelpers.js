// src/utils/arrayHelpers.js

// Constants for better code maintainability
const BAR_HEIGHT_MULTIPLIER = 5; // Multiplier to convert array values to pixel height
const MIN_PASSWORD_LENGTH = 8; // Minimum required password length

export const generateRandomArray = (length, min, max) => {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

export const createBars = (array) => {
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = '';
    array.forEach(num => {
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${num * BAR_HEIGHT_MULTIPLIER}px`; // Adjust bar height
        arrayContainer.appendChild(bar);
    });
};
// ===== NEW PASSWORD VALIDATION HELPER =====
/**
 * Validates password strength
 * Rules:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 * - At least 1 special character
 */
export const validatePassword = (password) => {
    const errors = [];

    if (!password.match(/[A-Z]/)) {
        errors.push("Add at least one uppercase letter");
    }
    if (!password.match(/[a-z]/)) {
        errors.push("Add at least one lowercase letter");
    }
    if (!password.match(/[0-9]/)) {
        errors.push("Add at least one number");
    }
    if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
        errors.push("Add at least one special character");
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
        errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};
