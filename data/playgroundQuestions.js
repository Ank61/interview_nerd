// JavaScript coding questions for the playground with adaptive difficulty
export const playgroundQuestions = {
  beginner: [
    {
      id: '1',
      title: 'Two Sum',
      difficulty: 'easy',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        }
      ],
      starterCode: `function twoSum(nums, target) {
    // Write your solution here
    
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]`,
      solution: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    
    return [];
}`,
      testCases: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] }
      ],
      tags: ['array', 'hash-table', 'two-pointers'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      hints: [
        'Use a hash map to store numbers and their indices',
        'For each number, check if its complement exists in the map'
      ]
    },
    {
      id: '2',
      title: 'Reverse String',
      difficulty: 'easy',
      description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
      examples: [
        {
          input: 's = ["h","e","l","l","o"]',
          output: '["o","l","l","e","h"]',
          explanation: 'Reverse the array in-place.'
        }
      ],
      starterCode: `function reverseString(s) {
    // Write your solution here
    // Modify s in-place
    
}

// Test cases
let test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]`,
      solution: `function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}`,
      testCases: [
        { input: [["h", "e", "l", "l", "o"]], expected: ["o", "l", "l", "e", "h"] },
        { input: [["H", "a", "n", "n", "a", "h"]], expected: ["h", "a", "n", "n", "a", "H"] }
      ],
      tags: ['string', 'two-pointers'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      hints: [
        'Use two pointers approach - one from start, one from end',
        'Swap characters and move pointers towards center'
      ]
    },
    {
      id: '3',
      title: 'Palindrome Check',
      difficulty: 'easy',
      description: 'Write a function to check if a given string is a palindrome (reads the same forwards and backwards).',
      examples: [
        {
          input: 's = "racecar"',
          output: 'true',
          explanation: 'The string reads the same forwards and backwards.'
        }
      ],
      starterCode: `function isPalindrome(s) {
    // Write your solution here
    
}

// Test cases
console.log(isPalindrome("racecar")); // Expected: true
console.log(isPalindrome("hello")); // Expected: false`,
      solution: `function isPalindrome(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}`,
      testCases: [
        { input: ["racecar"], expected: true },
        { input: ["hello"], expected: false },
        { input: ["A man a plan a canal Panama"], expected: true }
      ],
      tags: ['string', 'two-pointers'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      hints: [
        'Clean the string by removing non-alphanumeric characters',
        'Use two pointers to compare characters from both ends'
      ]
    }
  ],
  advanced: [
    {
      id: '4',
      title: 'Valid Parentheses',
      difficulty: 'medium',
      description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
      examples: [
        {
          input: 's = "()"',
          output: 'true',
          explanation: 'The string contains valid parentheses.'
        },
        {
          input: 's = "()[]{}"',
          output: 'true',
          explanation: 'All brackets are properly closed.'
        }
      ],
      starterCode: `function isValid(s) {
    // Write your solution here
    
}

// Test cases
console.log(isValid("()")); // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false`,
      solution: `function isValid(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (char === ')' || char === '}' || char === ']') {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}`,
      testCases: [
        { input: ["()"], expected: true },
        { input: ["()[]{}"], expected: true },
        { input: ["(]"], expected: false },
        { input: ["([)]"], expected: false }
      ],
      tags: ['string', 'stack'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      hints: [
        'Use a stack to keep track of opening brackets',
        'For each closing bracket, check if it matches the most recent opening bracket'
      ]
    },
    {
      id: '5',
      title: 'Binary Tree Traversal',
      difficulty: 'medium',
      description: 'Implement in-order traversal of a binary tree using JavaScript.',
      examples: [
        { input: 'TreeNode(1, null, TreeNode(2, TreeNode(3)))', output: '[1, 3, 2]', explanation: 'In-order: left, root, right' }
      ],
      starterCode: `class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function inorderTraversal(root) {
    // Implement in-order traversal
    
}

// Test case
const root = new TreeNode(1, null, new TreeNode(2, new TreeNode(3)));
console.log(inorderTraversal(root)); // Expected: [1, 3, 2]`,
      solution: `function inorderTraversal(root) {
    const result = [];
    
    function inorder(node) {
        if (node) {
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        }
    }
    
    inorder(root);
    return result;
}`,
      testCases: [
        { input: [{ 'val': 1, 'left': null, 'right': { 'val': 2, 'left': { 'val': 3, 'left': null, 'right': null }, 'right': null } }], expected: [1, 3, 2] }
      ],
      tags: ['binary-tree', 'recursion', 'traversal'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      hints: [
        'Use recursion to traverse the tree',
        'Visit left subtree, then root, then right subtree'
      ]
    },
    {
      id: '6',
      title: 'Merge Intervals',
      difficulty: 'hard',
      description: 'Given a collection of intervals, merge all overlapping intervals.',
      examples: [
        { input: '[[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Merge overlapping intervals' }
      ],
      starterCode: `function mergeIntervals(intervals) {
    // Merge overlapping intervals
    
}

// Test cases
console.log(mergeIntervals([[1,3],[2,6],[8,10],[15,18]])); // Expected: [[1,6],[8,10],[15,18]]
console.log(mergeIntervals([[1,4],[4,5]])); // Expected: [[1,5]]`,
      solution: `function mergeIntervals(intervals) {
    if (!intervals || intervals.length === 0) {
        return [];
    }
    
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = merged[merged.length - 1];
        
        if (current[0] <= last[1]) {
            last[1] = Math.max(last[1], current[1]);
        } else {
            merged.push(current);
        }
    }
    
    return merged;
}`,
      testCases: [
        { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
        { input: [[[1, 4], [4, 5]]], expected: [[1, 5]] }
      ],
      tags: ['intervals', 'sorting', 'greedy'],
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      hints: [
        'Sort intervals by start time first',
        'Merge intervals that overlap by comparing end time with next start time'
      ]
    }
  ]
};

// Difficulty progression mapping
export const difficultyLevels = {
  easy: { points: 10, nextLevel: 'medium' },
  medium: { points: 25, nextLevel: 'hard' },
  hard: { points: 50, nextLevel: 'expert' }
};

// JavaScript configuration
export const languageConfig = {
  name: 'JavaScript',
  icon: '🟨',
  color: 'yellow',
  extension: '.js',
  runCommand: 'node'
};
