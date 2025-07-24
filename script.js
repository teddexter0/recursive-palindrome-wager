/**
 * 🎨 MODERN PALINDROME EXPLORER WITH FLASHY EFFECTS
 * Enhanced JavaScript with debouncing, loading states, and animations
 */

// Your existing functions (kept the same for compatibility)
function cleanString(str) {
    if (typeof str !== 'string') {
        return '';
    }
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function isPalindromeRecursive(originalStr) {
    const cleaned = cleanString(originalStr);
    
    if (cleaned.length <= 1) {
        return true;
    }
    
    if (cleaned[0] === cleaned[cleaned.length - 1]) {
        return isPalindromeRecursive(cleaned.substring(1, cleaned.length - 1));
    } else {
        return false;
    }
}

function findAllPalindromicSubstringsRecursive(originalStr) {
    const foundPalindromes = new Set();
    const s = originalStr;

    function expandAroundCenter(left, right) {
        if (left < 0 || right >= s.length || s[left].toLowerCase() !== s[right].toLowerCase()) {
            return;
        }

        const currentSubstring = s.substring(left, right + 1);
        if (cleanString(currentSubstring).length > 0 && isPalindromeRecursive(currentSubstring)) {
             foundPalindromes.add(currentSubstring);
        }

        expandAroundCenter(left - 1, right + 1);
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);
    }

    for (let i = 0; i < s.length - 1; i++) {
        expandAroundCenter(i, i + 1);
    }

    return Array.from(foundPalindromes);
}

// 🎯 Modern DOM elements
const textInput = document.getElementById('textInput');
const isPalindromeResult = document.getElementById('isPalindromeResult');
const substringsOutput = document.getElementById('substringsOutput');
const resultsContainer = document.getElementById('resultsContainer');
const emptyState = document.getElementById('emptyState');
const loadingSpinner = document.getElementById('loadingSpinner');

// 🕒 Debouncing variables
let typingTimer;
let isTyping = false;
const TYPING_DELAY = 300; // milliseconds

/**
 * 🎪 Enhanced UI update function with animations and loading states
 */
function updateUI() {
    const inputText = textInput.value;

    // Handle loading spinner
    if (isTyping && inputText.trim()) {
        loadingSpinner.classList.add('show');
    } else {
        loadingSpinner.classList.remove('show');
    }

    // Handle empty input
    if (inputText.trim() === '') {
        resultsContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    // Show results, hide empty state
    resultsContainer.classList.remove('hidden');
    emptyState.classList.add('hidden');

    // 🎯 Part 1: Check if the full input is a palindrome
    const isPal = isPalindromeRecursive(inputText);
    isPalindromeResult.textContent = isPal ? '✨ YES! It\'s a palindrome!' : '❌ No, it\'s not a palindrome';
    isPalindromeResult.className = `result-text ${isPal ? 'result-true' : 'result-false'}`;

    // 🎨 Part 2: Find and display all palindromic substrings
    substringsOutput.innerHTML = '';
    const foundSubs = findAllPalindromicSubstringsRecursive(inputText);

    if (foundSubs.length === 0) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.textContent = 'No palindromic substrings found.';
        substringsOutput.appendChild(noResultsDiv);
    } else {
        // Sort palindromes for consistent display
        foundSubs.sort((a, b) => a.length - b.length || a.localeCompare(b));

        // Create palindrome items with staggered animations
        foundSubs.forEach((sub, index) => {
            const span = document.createElement('span');
            span.className = 'palindrome-item';
            span.textContent = sub;
            
            // Add staggered animation delay
            span.style.animationDelay = `${index * 0.1}s`;
            
            // Add hover effect for fun
            span.addEventListener('mouseenter', function() {
                this.classList.add('glow');
            });
            
            span.addEventListener('mouseleave', function() {
                this.classList.remove('glow');
            });
            
            substringsOutput.appendChild(span);
        });
    }
}

/**
 * 🎭 Enhanced input handler with debouncing
 */
function handleInput() {
    isTyping = true;
    clearTimeout(typingTimer);
    
    // Show immediate feedback
    loadingSpinner.classList.add('show');
    
    // Debounce the actual processing
    typingTimer = setTimeout(() => {
        isTyping = false;
        updateUI();
    }, TYPING_DELAY);
}

/**
 * 🎪 Add some extra flair - pulse effect on focus
 */
function handleFocus() {
    textInput.style.transform = 'translateY(-2px) scale(1.02)';
    textInput.style.boxShadow = '0 0 30px rgba(244, 114, 182, 0.3)';
}

function handleBlur() {
    textInput.style.transform = 'translateY(0) scale(1)';
    textInput.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
}

/**
 * 🎯 Event listeners
 */
textInput.addEventListener('input', handleInput);
textInput.addEventListener('focus', handleFocus);
textInput.addEventListener('blur', handleBlur);

/**
 * 🚀 Initialize the app
 */
function initializeApp() {
    // Initial UI update
    updateUI();
    
    // Add some startup animation
    setTimeout(() => {
        document.querySelector('.container').style.animation = 'fadeIn 1s ease-out';
    }, 100);
    
    // Fun Easter egg - double click the title for a surprise!
    document.querySelector('h1').addEventListener('dblclick', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'gradient 3s ease infinite, pulse 2s ease-in-out infinite';
        }, 100);
        
        // Create some temporary sparkles
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSparkle();
            }, i * 100);
        }
    });
}

/**
 * ✨ Fun sparkle effect for Easter egg
 */
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '2rem';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.animation = 'fadeIn 0.5s ease-out, float 2s ease-in-out';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

/**
 * 🎬 Start the show!
 */
document.addEventListener('DOMContentLoaded', initializeApp);

// 🎪 Additional performance optimization
// Throttle resize events if needed
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Any resize-specific code would go here
        console.log('Window resized - app still looking flashy! 🎨');
    }, 250);
});