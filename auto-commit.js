const fs = require('fs');
const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const { Random } = require("random-js");

const random = new Random();
const git = simpleGit();
const PROBLEM_STATEMENTS = [
    { title: "two_sum", description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.", solution: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return [seen[target - num], i]\n        seen[num] = i\n    return []` },
    { title: "fibonacci", description: "Generate Fibonacci sequence up to N.", solution: `def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        print(a, end=" ")\n        a, b = b, a + b\n    print()` },
    { title: "palindrome", description: "Check if a string is a palindrome.", solution: `def is_palindrome(s):\n    return s == s[::-1]` },
    { title: "factorial", description: "Find the factorial of a number.", solution: `def factorial(n):\n    return 1 if n == 0 else n * factorial(n - 1)` },
    { title: "reverse_string", description: "Reverse a given string.", solution: `def reverse_string(s):\n    return s[::-1]` }
];

const getUniqueFilename = (baseName) => {
    let fileName = `${baseName}.py`;
    let count = 1;
    while (fs.existsSync(fileName)) {
        fileName = `${baseName}_${count}.py`;
        count++;
    }
    return fileName;
};

const makeCommit = async (daysLeft) => {
    if (daysLeft <= 0) {
        console.log("All commits done. Pushing to remote...");
        await git.push();
        return;
    }

    const problem = PROBLEM_STATEMENTS[random.integer(0, PROBLEM_STATEMENTS.length - 1)];
    const fileName = getUniqueFilename(problem.title);
    const DATE = moment().subtract(daysLeft, 'days').format("YYYY-MM-DD HH:mm:ss");

    fs.writeFileSync(fileName, `# Problem: ${problem.description}\n\n${problem.solution}\n`);

    console.log(`Commit for ${DATE}: ${fileName}`);

    await git.add([fileName]);
    await git.commit(`Solved: ${problem.title}`, { '--date': DATE });
    
    makeCommit(daysLeft - 1);
};

makeCommit(50);
