// Static coding questions for the playground with adaptive difficulty
export const playgroundQuestions = {
  javascript: [
    {
      id: 'js-1',
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
      spaceComplexity: 'O(n)'
    },
    {
      id: 'js-2',
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
        { input: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] },
        { input: [["H","a","n","n","a","h"]], expected: ["h","a","n","n","a","H"] }
      ],
      tags: ['string', 'two-pointers'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'js-3',
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
      spaceComplexity: 'O(n)'
    }
  ],
  
  typescript: [
    {
      id: 'ts-1',
      title: 'Generic Array Filter',
      difficulty: 'easy',
      description: 'Create a generic function that filters an array based on a predicate function with proper TypeScript typing.',
      examples: [
        {
          input: 'filterArray([1, 2, 3, 4, 5], x => x > 3)',
          output: '[4, 5]',
          explanation: 'Filter numbers greater than 3.'
        }
      ],
      starterCode: `function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
    // Write your solution here
    
}

// Test cases
console.log(filterArray([1, 2, 3, 4, 5], x => x > 3)); // Expected: [4, 5]
console.log(filterArray(['a', 'b', 'c'], x => x !== 'b')); // Expected: ['a', 'c']`,
      solution: `function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
    const result: T[] = [];
    
    for (const item of arr) {
        if (predicate(item)) {
            result.push(item);
        }
    }
    
    return result;
}`,
      testCases: [
        { input: [[1, 2, 3, 4, 5], x => x > 3], expected: [4, 5] },
        { input: [['a', 'b', 'c'], x => x !== 'b'], expected: ['a', 'c'] }
      ],
      tags: ['generics', 'array', 'functional-programming'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)'
    },
    {
      id: 'ts-2',
      title: 'Interface Implementation',
      difficulty: 'medium',
      description: 'Create a User class that implements a given interface with proper type safety.',
      examples: [
        {
          input: 'new User("John", 25).getInfo()',
          output: '"John (25 years old)"',
          explanation: 'Implement the interface methods correctly.'
        }
      ],
      starterCode: `interface IUser {
    name: string;
    age: number;
    getInfo(): string;
    isAdult(): boolean;
}

class User implements IUser {
    // Implement the interface here
    
}

// Test cases
const user = new User("John", 25);
console.log(user.getInfo()); // Expected: "John (25 years old)"
console.log(user.isAdult()); // Expected: true`,
      solution: `interface IUser {
    name: string;
    age: number;
    getInfo(): string;
    isAdult(): boolean;
}

class User implements IUser {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    getInfo(): string {
        return \`\${this.name} (\${this.age} years old)\`;
    }
    
    isAdult(): boolean {
        return this.age >= 18;
    }
}`,
      testCases: [
        { input: ["John", 25], expected: { info: "John (25 years old)", isAdult: true } },
        { input: ["Alice", 16], expected: { info: "Alice (16 years old)", isAdult: false } }
      ],
      tags: ['interface', 'class', 'oop'],
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 'ts-3',
      title: 'Promise Chain with Types',
      difficulty: 'hard',
      description: 'Create a function that chains promises with proper TypeScript typing and error handling.',
      examples: [
        {
          input: 'processData([1, 2, 3])',
          output: 'Promise<string[]>',
          explanation: 'Transform numbers to strings asynchronously.'
        }
      ],
      starterCode: `async function processData(numbers: number[]): Promise<string[]> {
    // Write your solution here
    // 1. Double each number
    // 2. Convert to string
    // 3. Add "processed: " prefix
    
}

// Test cases
processData([1, 2, 3]).then(result => {
    console.log(result); // Expected: ["processed: 2", "processed: 4", "processed: 6"]
});`,
      solution: `async function processData(numbers: number[]): Promise<string[]> {
    const doubleNumbers = (nums: number[]): Promise<number[]> => {
        return Promise.resolve(nums.map(n => n * 2));
    };
    
    const convertToStrings = (nums: number[]): Promise<string[]> => {
        return Promise.resolve(nums.map(n => n.toString()));
    };
    
    const addPrefix = (strings: string[]): Promise<string[]> => {
        return Promise.resolve(strings.map(s => \`processed: \${s}\`));
    };
    
    try {
        const doubled = await doubleNumbers(numbers);
        const strings = await convertToStrings(doubled);
        const prefixed = await addPrefix(strings);
        return prefixed;
    } catch (error) {
        throw new Error(\`Processing failed: \${error}\`);
    }
}`,
      testCases: [
        { input: [[1, 2, 3]], expected: ["processed: 2", "processed: 4", "processed: 6"] },
        { input: [[5, 10]], expected: ["processed: 10", "processed: 20"] }
      ],
      tags: ['async', 'promises', 'error-handling'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 'py-4',
      title: 'Binary Tree Traversal',
      difficulty: 'medium',
      description: 'Implement in-order traversal of a binary tree.',
      examples: [
        { input: 'TreeNode(1, None, TreeNode(2, TreeNode(3)))', output: '[1, 3, 2]', explanation: 'In-order: left, root, right' }
      ],
      starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    # Implement in-order traversal
    pass`,
      solution: `def inorder_traversal(root):
    result = []
    def inorder(node):
        if node:
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)
    inorder(root)
    return result`,
      testCases: [
        { input: [{'val': 1, 'left': null, 'right': {'val': 2, 'left': {'val': 3, 'left': null, 'right': null}, 'right': null}}], expected: [1, 3, 2] }
      ],
      tags: ['binary-tree', 'recursion', 'traversal'],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)'
    },
    {
      id: 'py-5',
      title: 'Merge Intervals',
      difficulty: 'hard',
      description: 'Given a collection of intervals, merge all overlapping intervals.',
      examples: [
        { input: '[[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Merge overlapping intervals' }
      ],
      starterCode: `def merge_intervals(intervals):
    # Merge overlapping intervals
    pass`,
      solution: `def merge_intervals(intervals):
    if not intervals:
        return []
    
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for current in intervals[1:]:
        last = merged[-1]
        if current[0] <= last[1]:
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)
    
    return merged`,
      testCases: [
        { input: [[[1,3],[2,6],[8,10],[15,18]]], expected: [[1,6],[8,10],[15,18]] },
        { input: [[[1,4],[4,5]]], expected: [[1,5]] }
      ],
      tags: ['intervals', 'sorting', 'greedy'],
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)'
    }
  ]
};

// Difficulty progression mapping
export const difficultyLevels = {
  easy: { points: 10, nextLevel: 'medium' },
  medium: { points: 25, nextLevel: 'hard' },
  hard: { points: 50, nextLevel: 'expert' }
};

// Language-specific configurations
export const languageConfigs = {
  javascript: {
    name: 'JavaScript',
    icon: '🟨',
    color: 'yellow',
    extension: '.js',
    runCommand: 'node'
  },
  typescript: {
    name: 'TypeScript',
    icon: '🔷',
    color: 'blue',
    extension: '.ts',
    runCommand: 'ts-node'
  },
  python: {
    name: 'Python',
    icon: '🐍',
    color: 'green',
    extension: '.py',
    runCommand: 'python3'
  }
};
