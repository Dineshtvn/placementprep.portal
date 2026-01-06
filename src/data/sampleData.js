// Admin account (password must be >= 12 chars)
export const adminAccount = {
  id: 'admin1',
  username: 'admin@college',
  password: 'AdminPassLong12!',
  role: 'admin',
  name: 'Admin User',
  fullName: 'Admin User',
  phoneNumber: '9999999999',
  email: 'admin@college.edu',
  securityQuestion: 'What is your favorite color?',
  securityAnswer: 'blue',
  adminPasscode: '1234',
}

// Student account
export const studentAccount = {
  id: 'student1',
  username: 'dinesh',
  password: 'studentpass',
  role: 'student',
  name: 'Dinesh',
  fullName: 'Dinesh',
  phoneNumber: '9876543210',
  email: 'dinesh@student.edu',
  address: 'Sample Street, City',
}

// Sample quizzes - 10 demo quizzes
export const sampleQuizzes = [
  {
    id: 'quiz1',
    title: 'Data Structures - Basics',
    module: 'Coding',
    submodule: 'Data Structures',
    difficulty: 'Easy',
    questions: [
      {
        id: 1,
        question: 'What is the time complexity of binary search in a sorted array?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Binary search divides the search space in half at each step, resulting in O(log n) time complexity.',
      },
      {
        id: 2,
        question: 'Which data structure follows LIFO (Last In First Out) principle?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswer: 1,
        explanation: 'Stack follows LIFO principle where the last element added is the first one to be removed.',
      },
    ],
  },
  {
    id: 'quiz2',
    title: 'Arrays - Basics',
    module: 'Coding',
    submodule: 'Arrays',
    difficulty: 'Easy',
    questions: [
      {
        id: 1,
        question: 'What is the time complexity to access an element in an array by index?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Array access by index is O(1) as it directly calculates the memory address.',
      },
      {
        id: 2,
        question: 'Which method is used to find the length of a string in most languages?',
        options: ['size()', 'length()', 'count()', 'len()'],
        correctAnswer: 1,
        explanation: 'Most languages use length() or similar method to get string length.',
      },
    ],
  },
  {
    id: 'quiz3',
    title: 'Searching & Sorting - Basics',
    module: 'Coding',
    submodule: 'Searching & Sorting',
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'What is the best case time complexity of Quick Sort?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'Best case time complexity of Quick Sort is O(n log n) when pivot divides array equally.',
      },
      {
        id: 2,
        question: 'Which sorting algorithm has worst case time complexity of O(n²)?',
        options: ['Merge Sort', 'Heap Sort', 'Bubble Sort', 'All of the above'],
        correctAnswer: 2,
        explanation: 'Bubble Sort has O(n²) worst case time complexity.',
      },
    ],
  },
  {
    id: 'quiz4',
    title: 'Data Structures - Trees',
    module: 'Coding',
    submodule: 'Data Structures',
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'What is the maximum number of nodes in a binary tree of height h?',
        options: ['2^h', '2^h - 1', 'h²', '2^(h+1) - 1'],
        correctAnswer: 3,
        explanation: 'Maximum nodes in a binary tree of height h is 2^(h+1) - 1.',
      },
      {
        id: 2,
        question: 'In a Binary Search Tree, all left children are:',
        options: ['Greater than parent', 'Less than parent', 'Equal to parent', 'None of the above'],
        correctAnswer: 1,
        explanation: 'In BST, left children are always less than the parent node.',
      },
    ],
  },
  {
    id: 'quiz5',
    title: 'Graph Algorithms',
    module: 'Coding',
    questions: [
      {
        id: 1,
        question: 'Which algorithm is used to find shortest path in unweighted graph?',
        options: ['Dijkstra', 'BFS', 'DFS', 'Floyd-Warshall'],
        correctAnswer: 1,
        explanation: 'BFS (Breadth-First Search) finds shortest path in unweighted graphs.',
      },
      {
        id: 2,
        question: 'What is the time complexity of DFS traversal?',
        options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V²)'],
        correctAnswer: 2,
        explanation: 'DFS time complexity is O(V + E) where V is vertices and E is edges.',
      },
    ],
  },
  {
    id: 'quiz6',
    title: 'Dynamic Programming',
    module: 'Coding',
    questions: [
      {
        id: 1,
        question: 'What is the key principle of Dynamic Programming?',
        options: ['Divide and Conquer', 'Greedy Approach', 'Memoization', 'Backtracking'],
        correctAnswer: 2,
        explanation: 'Dynamic Programming uses memoization to store results of subproblems.',
      },
      {
        id: 2,
        question: 'Fibonacci using DP has time complexity of:',
        options: ['O(2^n)', 'O(n)', 'O(n log n)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'DP reduces Fibonacci from O(2^n) to O(n) by storing computed values.',
      },
    ],
  },
  {
    id: 'quiz7',
    title: 'DBMS - Fundamentals',
    module: 'Core',
    submodule: 'DBMS',
    difficulty: 'Easy',
    questions: [
      {
        id: 1,
        question: 'What does ACID stand for in database transactions?',
        options: ['Atomicity, Consistency, Isolation, Durability', 'Access, Control, Integrity, Data', 'Analysis, Creation, Integration, Deletion', 'None of the above'],
        correctAnswer: 0,
        explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability.',
      },
      {
        id: 2,
        question: 'Which SQL command is used to modify existing data?',
        options: ['INSERT', 'UPDATE', 'DELETE', 'ALTER'],
        correctAnswer: 1,
        explanation: 'UPDATE command is used to modify existing records in a table.',
      },
    ],
  },
  {
    id: 'quiz8',
    title: 'OS - Process Management',
    module: 'Core',
    submodule: 'Operating Systems',
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'What is the purpose of a semaphore?',
        options: ['Memory management', 'Process synchronization', 'File management', 'Device management'],
        correctAnswer: 1,
        explanation: 'Semaphores are used for process synchronization and mutual exclusion.',
      },
      {
        id: 2,
        question: 'Which scheduling algorithm can cause starvation?',
        options: ['Round Robin', 'FCFS', 'Shortest Job First', 'Priority Scheduling'],
        correctAnswer: 3,
        explanation: 'Priority Scheduling can cause starvation if low priority processes never get CPU time.',
      },
    ],
  },
  {
    id: 'quiz9',
    title: 'Arithmetic - Percentages',
    module: 'Aptitude',
    submodule: 'Arithmetic',
    difficulty: 'Easy',
    questions: [
      {
        id: 1,
        question: 'If 15% of a number is 45, what is 30% of that number?',
        options: ['90', '60', '75', '80'],
        correctAnswer: 0,
        explanation: 'If 15% = 45, then 100% = 300. Therefore, 30% = 90.',
      },
      {
        id: 2,
        question: 'A train travels 120 km in 2 hours. What is its speed?',
        options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
        correctAnswer: 1,
        explanation: 'Speed = Distance / Time = 120 / 2 = 60 km/h.',
      },
    ],
  },
  {
    id: 'quiz10',
    title: 'Behavioral Questions',
    module: 'HR',
    submodule: 'Behavioral Questions',
    difficulty: 'Easy',
    questions: [
      {
        id: 1,
        question: 'What is your greatest strength?',
        options: ['Technical skills', 'Communication', 'Problem-solving', 'All of the above'],
        correctAnswer: 3,
        explanation: 'This is a subjective question. Be honest and highlight relevant strengths.',
      },
      {
        id: 2,
        question: 'How do you handle pressure?',
        options: ['Avoid it', 'Stay calm and prioritize', 'Panic', 'Delegate everything'],
        correctAnswer: 1,
        explanation: 'Good answer shows ability to stay calm, prioritize tasks, and manage time effectively.',
      },
    ],
  },
  // Additional Coding Quizzes
  {
    id: 'quiz11',
    title: 'Arrays - Two Pointers',
    module: 'Coding',
    submodule: 'Arrays',
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'What is the time complexity of finding two numbers that sum to target using two pointers?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 0,
        explanation: 'Two pointer technique on sorted array gives O(n) time complexity.',
      },
      {
        id: 2,
        question: 'Two pointers technique is most efficient when array is:',
        options: ['Unsorted', 'Sorted', 'Partially sorted', 'Does not matter'],
        correctAnswer: 1,
        explanation: 'Two pointers work best on sorted arrays for optimal time complexity.',
      },
    ],
  },
  {
    id: 'quiz12',
    title: 'Strings - Pattern Matching',
    module: 'Coding',
    submodule: 'Strings',
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'What is the time complexity of naive string matching algorithm?',
        options: ['O(n)', 'O(n + m)', 'O(n * m)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Naive string matching has O(n * m) where n is text length and m is pattern length.',
      },
      {
        id: 2,
        question: 'KMP algorithm improves string matching to:',
        options: ['O(n)', 'O(n + m)', 'O(n * m)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'KMP algorithm achieves O(n + m) time complexity for string matching.',
      },
    ],
  },
  {
    id: 'quiz13',
    title: 'Loops - Execution Tracing',
    module: 'Coding',
    submodule: 'Loops & Control Flow',
    difficulty: 'Easy',
    questions: [
      {
        id: 1,
        question: 'What is the output: for(i=0; i<3; i++) print(i);',
        options: ['0 1 2', '1 2 3', '0 1 2 3', '1 2'],
        correctAnswer: 0,
        explanation: 'Loop runs from i=0 to i<3, printing 0, 1, 2.',
      },
      {
        id: 2,
        question: 'How many times will a while loop execute if condition is initially false?',
        options: ['0', '1', 'Infinite', 'Depends on condition'],
        correctAnswer: 0,
        explanation: 'While loop checks condition first, so if false initially, it executes 0 times.',
      },
    ],
  },
  {
    id: 'quiz14',
    title: 'Recursion - Basics',
    module: 'Coding',
    submodule: 'Recursion & Backtracking',
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'What is the base case in recursion?',
        options: ['The recursive call', 'The termination condition', 'The return statement', 'The function definition'],
        correctAnswer: 1,
        explanation: 'Base case is the termination condition that stops recursion.',
      },
      {
        id: 2,
        question: 'What happens if base case is missing in recursion?',
        options: ['Compilation error', 'Runtime error', 'Infinite recursion', 'No output'],
        correctAnswer: 2,
        explanation: 'Missing base case causes infinite recursion leading to stack overflow.',
      },
    ],
  },
  {
    id: 'quiz15',
    title: 'Time Complexity - Big-O',
    module: 'Coding',
    submodule: 'Time & Space Complexity',
    difficulty: 'Hard',
    questions: [
      {
        id: 1,
        question: 'What is the time complexity of nested loops with n iterations each?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'],
        correctAnswer: 2,
        explanation: 'Nested loops with n iterations each result in O(n²) time complexity.',
      },
      {
        id: 2,
        question: 'Which is the best time complexity?',
        options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'],
        correctAnswer: 3,
        explanation: 'O(1) constant time is the best possible time complexity.',
      },
    ],
  },
  // Additional Aptitude Quizzes
  {
    id: 'quiz16',
    title: 'Algebra - Equations',
    module: 'Aptitude',
    submodule: 'Algebra & Equations',
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'If 2x + 5 = 15, what is x?',
        options: ['5', '10', '7.5', '8'],
        correctAnswer: 0,
        explanation: '2x + 5 = 15, so 2x = 10, therefore x = 5.',
      },
      {
        id: 2,
        question: 'Solve: 3x - 7 = 14',
        options: ['5', '7', '9', '11'],
        correctAnswer: 1,
        explanation: '3x - 7 = 14, so 3x = 21, therefore x = 7.',
      },
    ],
  },
  {
    id: 'quiz17',
    title: 'Logical Reasoning - Puzzles',
    module: 'Aptitude',
    submodule: 'Logical Reasoning',
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'If all roses are flowers and some flowers are red, then:',
        options: ['All roses are red', 'Some roses are red', 'No roses are red', 'Cannot be determined'],
        correctAnswer: 3,
        explanation: 'From the given statements, we cannot determine if roses are red.',
      },
      {
        id: 2,
        question: 'A is taller than B, B is taller than C. Who is tallest?',
        options: ['A', 'B', 'C', 'Cannot determine'],
        correctAnswer: 0,
        explanation: 'A > B > C, so A is the tallest.',
      },
    ],
  },
  // Additional Core Quizzes
  {
    id: 'quiz18',
    title: 'DBMS - Normalization',
    module: 'Core',
    submodule: 'DBMS',
    difficulty: 'Hard',
    questions: [
      {
        id: 1,
        question: 'What is the purpose of database normalization?',
        options: ['Increase redundancy', 'Reduce redundancy', 'Increase storage', 'Simplify queries'],
        correctAnswer: 1,
        explanation: 'Normalization reduces data redundancy and improves data integrity.',
      },
      {
        id: 2,
        question: 'Third Normal Form (3NF) eliminates:',
        options: ['Partial dependencies', 'Transitive dependencies', 'Functional dependencies', 'All dependencies'],
        correctAnswer: 1,
        explanation: '3NF eliminates transitive dependencies while preserving functional dependencies.',
      },
    ],
  },
  {
    id: 'quiz19',
    title: 'OS - Memory Management',
    module: 'Core',
    submodule: 'Operating Systems',
    difficulty: 'Hard',
    questions: [
      {
        id: 1,
        question: 'What is virtual memory?',
        options: ['Physical RAM', 'Disk storage used as RAM', 'Cache memory', 'Register memory'],
        correctAnswer: 1,
        explanation: 'Virtual memory uses disk storage to extend available memory beyond physical RAM.',
      },
      {
        id: 2,
        question: 'What is page fault?',
        options: ['Page found in memory', 'Page not found in memory', 'Page corrupted', 'Page locked'],
        correctAnswer: 1,
        explanation: 'Page fault occurs when requested page is not in physical memory.',
      },
    ],
  },
  {
    id: 'quiz20',
    title: 'OOPs - Principles',
    module: 'Core',
    submodule: 'OOPs & Design',
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'Which is not a pillar of OOP?',
        options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Compilation'],
        correctAnswer: 3,
        explanation: 'The four pillars are Encapsulation, Inheritance, Polymorphism, and Abstraction.',
      },
      {
        id: 2,
        question: 'What is method overriding?',
        options: ['Same method name, different parameters', 'Same method name and signature in subclass', 'Different method name', 'Method with no return type'],
        correctAnswer: 1,
        explanation: 'Method overriding provides specific implementation in subclass with same signature.',
      },
    ],
  },
]

// Keep sampleQuiz for backward compatibility
export const sampleQuiz = sampleQuizzes[0]

// Sample quiz result
export const sampleQuizResult = {
  id: 'result1',
  userId: 'student1',
  quizId: 'quiz1',
  score: 50,
  totalQuestions: 2,
  correctAnswers: 1,
  timeSpent: 120,
  completedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  answers: [1, 0], // First correct, second wrong
}

// Sample mock interview submission
export const sampleInterviewSubmission = {
  id: 'submission1',
  studentId: 'student1',
  studentName: 'Dinesh',
  module: 'Coding',
  videoBlob: null, // In real app, this would be a blob URL or base64
  videoBlobKey: 'video_submission1', // Key for localStorage/blob storage
  transcript: 'This is a placeholder transcript. In a real implementation, this would be generated from speech-to-text.',
  timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  status: 'pending', // pending, reviewed
  score: null,
  comment: null,
  reviewedBy: null,
  reviewedAt: null,
}

// Module PDFs (sample links - in production these would be actual PDF files)
export const modulePDFs = {
  Coding: '/pdfs/coding-guide.pdf',
  Aptitude: '/pdfs/aptitude-guide.pdf',
  HR: '/pdfs/hr-guide.pdf',
  'Core/DBMS': '/pdfs/dbms-guide.pdf',
}

// Top 100 Coding Questions (similar to PrepInsta)
export const codingQuestions = [
  // Introduction & Basics
  {
    id: 1,
    title: 'Positive or Negative number',
    category: 'Introduction',
    difficulty: 'Easy',
    description: 'Write a program to check if a number is positive or negative.',
    example: 'Input: 5\nOutput: Positive\n\nInput: -3\nOutput: Negative',
    solutions: {
      c: '// C solution\n#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    if (n > 0) printf("Positive");\n    else if (n < 0) printf("Negative");\n    else printf("Zero");\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    if (n > 0) cout << "Positive";\n    else if (n < 0) cout << "Negative";\n    else cout << "Zero";\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        if (n > 0) System.out.println("Positive");\n        else if (n < 0) System.out.println("Negative");\n        else System.out.println("Zero");\n    }\n}',
      python: '# Python solution\nn = int(input())\nif n > 0:\n    print("Positive")\nelif n < 0:\n    print("Negative")\nelse:\n    print("Zero")',
    },
  },
  {
    id: 2,
    title: 'Even or Odd number',
    category: 'Introduction',
    difficulty: 'Easy',
    description: 'Write a program to check if a number is even or odd.',
    example: 'Input: 4\nOutput: Even\n\nInput: 7\nOutput: Odd',
    solutions: {
      c: '// C solution\n#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    if (n % 2 == 0) printf("Even");\n    else printf("Odd");\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    cout << (n % 2 == 0 ? "Even" : "Odd");\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(n % 2 == 0 ? "Even" : "Odd");\n    }\n}',
      python: '# Python solution\nn = int(input())\nprint("Even" if n % 2 == 0 else "Odd")',
    },
  },
  {
    id: 3,
    title: 'Sum of First N Natural numbers',
    category: 'Introduction',
    difficulty: 'Easy',
    description: 'Write a program to find the sum of first N natural numbers.',
    example: 'Input: 5\nOutput: 15 (1+2+3+4+5)',
    solutions: {
      c: '// C solution\n#include <stdio.h>\nint main() {\n    int n, sum = 0;\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) sum += i;\n    printf("%d", sum);\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, sum = 0;\n    cin >> n;\n    for (int i = 1; i <= n; i++) sum += i;\n    cout << sum;\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int sum = n * (n + 1) / 2;\n        System.out.println(sum);\n    }\n}',
      python: '# Python solution\nn = int(input())\nprint(n * (n + 1) // 2)',
    },
  },
  {
    id: 4,
    title: 'Greatest of two numbers',
    category: 'Introduction',
    difficulty: 'Easy',
    description: 'Write a program to find the greatest of two numbers.',
    example: 'Input: 5, 8\nOutput: 8',
    solutions: {
      c: '// C solution\n#include <stdio.h>\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d", a > b ? a : b);\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << max(a, b);\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(Math.max(a, b));\n    }\n}',
      python: '# Python solution\na, b = map(int, input().split())\nprint(max(a, b))',
    },
  },
  {
    id: 5,
    title: 'Greatest of three numbers',
    category: 'Introduction',
    difficulty: 'Easy',
    description: 'Write a program to find the greatest of three numbers.',
    example: 'Input: 5, 8, 3\nOutput: 8',
    solutions: {
      c: '// C solution\n#include <stdio.h>\nint main() {\n    int a, b, c;\n    scanf("%d %d %d", &a, &b, &c);\n    int max = (a > b) ? (a > c ? a : c) : (b > c ? b : c);\n    printf("%d", max);\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\nusing namespace std;\nint main() {\n    int a, b, c;\n    cin >> a >> b >> c;\n    cout << max(a, max(b, c));\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        int c = sc.nextInt();\n        System.out.println(Math.max(a, Math.max(b, c)));\n    }\n}',
      python: '# Python solution\na, b, c = map(int, input().split())\nprint(max(a, b, c))',
    },
  },
  // Number Programs
  {
    id: 6,
    title: 'Prime number',
    category: 'Number Programs',
    difficulty: 'Medium',
    description: 'Write a program to check if a number is prime or not.',
    example: 'Input: 7\nOutput: Prime\n\nInput: 10\nOutput: Not Prime',
    solutions: {
      c: '// C solution\n#include <stdio.h>\n#include <math.h>\nint main() {\n    int n, i, flag = 1;\n    scanf("%d", &n);\n    if (n <= 1) flag = 0;\n    for (i = 2; i <= sqrt(n); i++) {\n        if (n % i == 0) { flag = 0; break; }\n    }\n    printf(flag ? "Prime" : "Not Prime");\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\n#include <cmath>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    bool isPrime = (n > 1);\n    for (int i = 2; i <= sqrt(n); i++) {\n        if (n % i == 0) { isPrime = false; break; }\n    }\n    cout << (isPrime ? "Prime" : "Not Prime");\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        boolean isPrime = n > 1;\n        for (int i = 2; i <= Math.sqrt(n); i++) {\n            if (n % i == 0) { isPrime = false; break; }\n        }\n        System.out.println(isPrime ? "Prime" : "Not Prime");\n    }\n}',
      python: '# Python solution\nimport math\nn = int(input())\nis_prime = n > 1\nfor i in range(2, int(math.sqrt(n)) + 1):\n    if n % i == 0:\n        is_prime = False\n        break\nprint("Prime" if is_prime else "Not Prime")',
    },
  },
  {
    id: 7,
    title: 'Palindrome number',
    category: 'Number Programs',
    difficulty: 'Medium',
    description: 'Write a program to check if a number is palindrome or not.',
    example: 'Input: 121\nOutput: Palindrome\n\nInput: 123\nOutput: Not Palindrome',
    solutions: {
      c: '// C solution\n#include <stdio.h>\nint main() {\n    int n, rev = 0, temp;\n    scanf("%d", &n);\n    temp = n;\n    while (temp > 0) {\n        rev = rev * 10 + temp % 10;\n        temp /= 10;\n    }\n    printf(rev == n ? "Palindrome" : "Not Palindrome");\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, rev = 0, temp;\n    cin >> n;\n    temp = n;\n    while (temp > 0) {\n        rev = rev * 10 + temp % 10;\n        temp /= 10;\n    }\n    cout << (rev == n ? "Palindrome" : "Not Palindrome");\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int rev = 0, temp = n;\n        while (temp > 0) {\n            rev = rev * 10 + temp % 10;\n            temp /= 10;\n        }\n        System.out.println(rev == n ? "Palindrome" : "Not Palindrome");\n    }\n}',
      python: '# Python solution\nn = int(input())\ntemp = n\nrev = 0\nwhile temp > 0:\n    rev = rev * 10 + temp % 10\n    temp //= 10\nprint("Palindrome" if rev == n else "Not Palindrome")',
    },
  },
  {
    id: 8,
    title: 'Armstrong number',
    category: 'Number Programs',
    difficulty: 'Medium',
    description: 'Write a program to check if a number is Armstrong number or not.',
    example: 'Input: 153\nOutput: Armstrong (1³ + 5³ + 3³ = 153)',
    solutions: {
      c: '// C solution\n#include <stdio.h>\n#include <math.h>\nint main() {\n    int n, sum = 0, temp, digits = 0;\n    scanf("%d", &n);\n    temp = n;\n    while (temp) { digits++; temp /= 10; }\n    temp = n;\n    while (temp) {\n        sum += pow(temp % 10, digits);\n        temp /= 10;\n    }\n    printf(sum == n ? "Armstrong" : "Not Armstrong");\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\n#include <cmath>\nusing namespace std;\nint main() {\n    int n, sum = 0, temp, digits = 0;\n    cin >> n;\n    temp = n;\n    while (temp) { digits++; temp /= 10; }\n    temp = n;\n    while (temp) {\n        sum += pow(temp % 10, digits);\n        temp /= 10;\n    }\n    cout << (sum == n ? "Armstrong" : "Not Armstrong");\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int sum = 0, temp = n, digits = String.valueOf(n).length();\n        while (temp > 0) {\n            sum += Math.pow(temp % 10, digits);\n            temp /= 10;\n        }\n        System.out.println(sum == n ? "Armstrong" : "Not Armstrong");\n    }\n}',
      python: '# Python solution\nn = int(input())\ndigits = len(str(n))\ntemp = n\nsum_val = 0\nwhile temp > 0:\n    sum_val += (temp % 10) ** digits\n    temp //= 10\nprint("Armstrong" if sum_val == n else "Not Armstrong")',
    },
  },
  {
    id: 9,
    title: 'Fibonacci Series upto nth term',
    category: 'Number Programs',
    difficulty: 'Medium',
    description: 'Write a program to print Fibonacci series up to nth term.',
    example: 'Input: 7\nOutput: 0 1 1 2 3 5 8',
    solutions: {
      c: '// C solution\n#include <stdio.h>\nint main() {\n    int n, a = 0, b = 1, c;\n    scanf("%d", &n);\n    printf("%d %d ", a, b);\n    for (int i = 2; i < n; i++) {\n        c = a + b;\n        printf("%d ", c);\n        a = b;\n        b = c;\n    }\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, a = 0, b = 1, c;\n    cin >> n;\n    cout << a << " " << b << " ";\n    for (int i = 2; i < n; i++) {\n        c = a + b;\n        cout << c << " ";\n        a = b;\n        b = c;\n    }\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int a = 0, b = 1;\n        System.out.print(a + " " + b + " ");\n        for (int i = 2; i < n; i++) {\n            int c = a + b;\n            System.out.print(c + " ");\n            a = b;\n            b = c;\n        }\n    }\n}',
      python: '# Python solution\nn = int(input())\na, b = 0, 1\nprint(a, b, end=" ")\nfor i in range(2, n):\n    c = a + b\n    print(c, end=" ")\n    a, b = b, c',
    },
  },
  {
    id: 10,
    title: 'Factorial of a number',
    category: 'Number Programs',
    difficulty: 'Easy',
    description: 'Write a program to find factorial of a number.',
    example: 'Input: 5\nOutput: 120 (5! = 5×4×3×2×1)',
    solutions: {
      c: '// C solution\n#include <stdio.h>\nint main() {\n    int n, fact = 1;\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) fact *= i;\n    printf("%d", fact);\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\nusing namespace std;\nint main() {\n    int n, fact = 1;\n    cin >> n;\n    for (int i = 1; i <= n; i++) fact *= i;\n    cout << fact;\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        long fact = 1;\n        for (int i = 1; i <= n; i++) fact *= i;\n        System.out.println(fact);\n    }\n}',
      python: '# Python solution\nn = int(input())\nfact = 1\nfor i in range(1, n + 1):\n    fact *= i\nprint(fact)',
    },
  },
  // Array Programs
  {
    id: 11,
    title: 'Reverse an array',
    category: 'Array Programs',
    difficulty: 'Easy',
    description: 'Write a program to reverse an array.',
    example: 'Input: [1, 2, 3, 4, 5]\nOutput: [5, 4, 3, 2, 1]',
    solutions: {
      c: '// C solution\n#include <stdio.h>\nint main() {\n    int n, arr[100];\n    scanf("%d", &n);\n    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n    for (int i = 0, j = n-1; i < j; i++, j--) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    int arr[n];\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    reverse(arr, arr + n);\n    for (int i = 0; i < n; i++) cout << arr[i] << " ";\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n        for (int i = 0, j = n-1; i < j; i++, j--) {\n            int temp = arr[i];\n            arr[i] = arr[j];\n            arr[j] = temp;\n        }\n        for (int i = 0; i < n; i++) System.out.print(arr[i] + " ");\n    }\n}',
      python: '# Python solution\nn = int(input())\narr = list(map(int, input().split()))\narr.reverse()\nprint(*arr)',
    },
  },
  {
    id: 12,
    title: 'Find largest element in array',
    category: 'Array Programs',
    difficulty: 'Easy',
    description: 'Write a program to find the largest element in an array.',
    example: 'Input: [3, 7, 2, 9, 1]\nOutput: 9',
    solutions: {
      c: '// C solution\n#include <stdio.h>\nint main() {\n    int n, arr[100], max = 0;\n    scanf("%d", &n);\n    for (int i = 0; i < n; i++) {\n        scanf("%d", &arr[i]);\n        if (arr[i] > max) max = arr[i];\n    }\n    printf("%d", max);\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    int arr[n];\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    cout << *max_element(arr, arr + n);\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        int max = Integer.MIN_VALUE;\n        for (int i = 0; i < n; i++) {\n            arr[i] = sc.nextInt();\n            if (arr[i] > max) max = arr[i];\n        }\n        System.out.println(max);\n    }\n}',
      python: '# Python solution\nn = int(input())\narr = list(map(int, input().split()))\nprint(max(arr))',
    },
  },
  // String Programs
  {
    id: 13,
    title: 'Reverse a string',
    category: 'String Programs',
    difficulty: 'Easy',
    description: 'Write a program to reverse a string.',
    example: 'Input: "hello"\nOutput: "olleh"',
    solutions: {
      c: '// C solution\n#include <stdio.h>\n#include <string.h>\nint main() {\n    char str[100];\n    scanf("%s", str);\n    int len = strlen(str);\n    for (int i = 0, j = len-1; i < j; i++, j--) {\n        char temp = str[i];\n        str[i] = str[j];\n        str[j] = temp;\n    }\n    printf("%s", str);\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\n#include <algorithm>\n#include <string>\nusing namespace std;\nint main() {\n    string str;\n    cin >> str;\n    reverse(str.begin(), str.end());\n    cout << str;\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String str = sc.next();\n        StringBuilder sb = new StringBuilder(str);\n        System.out.println(sb.reverse().toString());\n    }\n}',
      python: '# Python solution\ns = input()\nprint(s[::-1])',
    },
  },
  {
    id: 14,
    title: 'Check if string is palindrome',
    category: 'String Programs',
    difficulty: 'Easy',
    description: 'Write a program to check if a string is palindrome or not.',
    example: 'Input: "madam"\nOutput: Palindrome\n\nInput: "hello"\nOutput: Not Palindrome',
    solutions: {
      c: '// C solution\n#include <stdio.h>\n#include <string.h>\nint main() {\n    char str[100];\n    scanf("%s", str);\n    int len = strlen(str);\n    int flag = 1;\n    for (int i = 0, j = len-1; i < j; i++, j--) {\n        if (str[i] != str[j]) { flag = 0; break; }\n    }\n    printf(flag ? "Palindrome" : "Not Palindrome");\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string str;\n    cin >> str;\n    string rev = str;\n    reverse(rev.begin(), rev.end());\n    cout << (str == rev ? "Palindrome" : "Not Palindrome");\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String str = sc.next();\n        String rev = new StringBuilder(str).reverse().toString();\n        System.out.println(str.equals(rev) ? "Palindrome" : "Not Palindrome");\n    }\n}',
      python: '# Python solution\ns = input()\nprint("Palindrome" if s == s[::-1] else "Not Palindrome")',
    },
  },
  // Pattern Programs
  {
    id: 15,
    title: 'Right Triangle Star Pattern',
    category: 'Pattern Programs',
    difficulty: 'Easy',
    description: 'Write a program to print right triangle star pattern.',
    example: 'Input: 5\nOutput:\n*\n**\n***\n****\n*****',
    solutions: {
      c: '// C solution\n#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) printf("*");\n        printf("\\n");\n    }\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) cout << "*";\n        cout << endl;\n    }\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 1; i <= n; i++) {\n            for (int j = 1; j <= i; j++) System.out.print("*");\n            System.out.println();\n        }\n    }\n}',
      python: '# Python solution\nn = int(input())\nfor i in range(1, n + 1):\n    print("*" * i)',
    },
  },
  {
    id: 16,
    title: 'Pyramid Star Pattern',
    category: 'Pattern Programs',
    difficulty: 'Medium',
    description: 'Write a program to print pyramid star pattern.',
    example: 'Input: 5\nOutput:\n    *\n   ***\n  *****\n *******\n*********',
    solutions: {
      c: '// C solution\n#include <stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= n-i; j++) printf(" ");\n        for (int j = 1; j <= 2*i-1; j++) printf("*");\n        printf("\\n");\n    }\n    return 0;\n}',
      cpp: '// C++ solution\n#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= n-i; j++) cout << " ";\n        for (int j = 1; j <= 2*i-1; j++) cout << "*";\n        cout << endl;\n    }\n    return 0;\n}',
      java: '// Java solution\nimport java.util.Scanner;\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        for (int i = 1; i <= n; i++) {\n            for (int j = 1; j <= n-i; j++) System.out.print(" ");\n            for (int j = 1; j <= 2*i-1; j++) System.out.print("*");\n            System.out.println();\n        }\n    }\n}',
      python: '# Python solution\nn = int(input())\nfor i in range(1, n + 1):\n    print(" " * (n - i) + "*" * (2 * i - 1))',
    },
  },
]

// Coding question categories
export const codingCategories = [
  'All',
  'Introduction',
  'Number Programs',
  'Array Programs',
  'String Programs',
  'Pattern Programs',
]
