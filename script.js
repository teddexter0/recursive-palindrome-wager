/**
 * Cleans a string by converting to lowercase and removing non-alphanumeric characters.
 * @param {string} str The input string.
 * @returns {string} The cleaned string.
 */
function cleanString(str) {
    if (typeof str !== 'string') {
        return ''; // Handle non-string inputs gracefully
    }
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Recursively checks if a string is a palindrome after cleaning.
 * @param {string} originalStr The original input string.
 * @returns {boolean} True if the cleaned string is a palindrome, false otherwise.
 */
function isPalindromeRecursive(originalStr) {
    const cleaned = cleanString(originalStr);

    // Base Case 1: An empty string or a single character string is a palindrome.
    if (cleaned.length <= 1) {
        return true;
    }

    // Recursive Step: Compare the first and last characters.
    // If they match, recurse on the substring excluding the first and last characters.
    if (cleaned[0] === cleaned[cleaned.length - 1]) {
        // cleaned.substring(1, cleaned.length - 1) gets the string without its first and last chars.
        return isPalindromeRecursive(cleaned.substring(1, cleaned.length - 1));
    } else {
        // If the first and last characters don't match, it's not a palindrome.
        return false;
    }
}

/**
 * Finds all unique palindromic substrings within an original string.
 * Uses an "expand around center" strategy with a recursive helper.
 * @param {string} originalStr The input string to search within.
 * @returns {string[]} An array of unique palindromic substrings.
 */
function findAllPalindromicSubstringsRecursive(originalStr) {
    // Use a Set to store unique palindromes to avoid duplicates automatically.
    const foundPalindromes = new Set();
    const s = originalStr; // Use 's' for brevity in the helper function

    /**
     * Recursively expands outwards from a center point to find palindromes.
     * @param {number} left The left pointer.
     * @param {number} right The right pointer.
     */
    function expandAroundCenter(left, right) {
        // Base Case: Stop if pointers are out of bounds or characters don't match.
        // Also, ensure characters are alphanumeric before comparison if not already pre-cleaned.
        // For simplicity here, we'll expand on the raw string and then clean the substring.
        if (left < 0 || right >= s.length || s[left].toLowerCase() !== s[right].toLowerCase()) {
            return;
        }

        // Check if the current substring (from left to right) is a palindrome after cleaning
        // This is important because the original string might have non-alphanumeric chars
        // that we need to ignore for the actual palindrome check.
        const currentSubstring = s.substring(left, right + 1);
        if (cleanString(currentSubstring).length > 0 && isPalindromeRecursive(currentSubstring)) {
             foundPalindromes.add(currentSubstring);
        }

        // Recursive Step: Expand outwards
        expandAroundCenter(left - 1, right + 1);
    }

    // Iterate through each character as a potential center for odd-length palindromes (e.g., "aba")
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i); // Single character as center
    }

    // Iterate through each space between characters as a potential center for even-length palindromes (e.g., "abba")
    for (let i = 0; i < s.length - 1; i++) {
        expandAroundCenter(i, i + 1); // Two characters as center
    }

    // Convert the Set to an Array for the final output.
    return Array.from(foundPalindromes);
}

// Get references to DOM elements
const textInput = document.getElementById('textInput');
const isPalindromeResult = document.getElementById('isPalindromeResult');
const substringsOutput = document.getElementById('substringsOutput');

/**
 * Updates the UI based on the input text.
 */
function updateUI() {
    const inputText = textInput.value;

    // --- Part 1: Check if the full input is a palindrome ---
    if (inputText.trim() === '') {
        isPalindromeResult.textContent = 'Type something to check...';
        isPalindromeResult.className = 'result-text'; // Reset class
    } else {
        const isPal = isPalindromeRecursive(inputText);
        isPalindromeResult.textContent = isPal ? 'YES, it is a palindrome!' : 'NO, it is not a palindrome.';
        isPalindromeResult.className = `result-text ${isPal ? 'result-true' : 'result-false'}`;
    }


    // --- Part 2: Find and display all palindromic substrings ---
    substringsOutput.innerHTML = ''; // Clear previous results

    if (inputText.trim() === '') {
        const p = document.createElement('p');
        p.className = 'no-results';
        p.textContent = 'Type something to see results...';
        substringsOutput.appendChild(p);
    } else {
        const foundSubs = findAllPalindromicSubstringsRecursive(inputText);

        if (foundSubs.length === 0) {
            const p = document.createElement('p');
            p.className = 'no-results';
            p.textContent = 'No palindromic substrings found.';
            substringsOutput.appendChild(p);
        } else {
            // Sort them for consistent display
            foundSubs.sort((a, b) => a.length - b.length || a.localeCompare(b));

            foundSubs.forEach(sub => {
                const span = document.createElement('span');
                span.className = 'palindrome-item';
                span.textContent = sub;
                substringsOutput.appendChild(span);
            });
        }
    }
}

// Add an event listener to the input field
// The 'input' event fires whenever the value of an <input> or <textarea> element has been changed.
textInput.addEventListener('input', updateUI);

// Initial UI update when the page loads
updateUI();