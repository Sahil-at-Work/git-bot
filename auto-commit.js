import os
import json
import random
import moment
import subprocess

# Directory where .py files will be stored
CODE_DIR = "."

# List of coding problems and solutions
PROBLEMS = {
    "reverse_string": """def reverse_string(s):
    return s[::-1]

print(reverse_string("hello"))
""",
    "factorial": """def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n-1)

print(factorial(5))
""",
    "fibonacci": """def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    seq = [0, 1]
    for _ in range(2, n):
        seq.append(seq[-1] + seq[-2])
    return seq

print(fibonacci(10))
""",
    "palindrome_check": """def is_palindrome(s):
    return s == s[::-1]

print(is_palindrome("radar"))
print(is_palindrome("hello"))
""",
    "prime_check": """def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

print(is_prime(17))
print(is_prime(18))
"""
}

# Initialize Git
def run_git_command(cmd):
    subprocess.run(cmd, shell=True, check=True)

# Function to create & commit file
def make_commit(day_offset):
    # Pick a random problem
    problem_name, solution = random.choice(list(PROBLEMS.items()))
    filename = f"{problem_name}.py"
    filepath = os.path.join(CODE_DIR, filename)

    # Ensure unique filenames
    i = 1
    while os.path.exists(filepath):
        filename = f"{problem_name}_{i}.py"
        filepath = os.path.join(CODE_DIR, filename)
        i += 1

    # Write solution to file
    with open(filepath, "w") as f:
        f.write(solution)

    # Set commit date (past day)
    commit_date = moment.now().subtract(days=day_offset).format("YYYY-MM-DD HH:mm:ss")

    # Git commands
    run_git_command(f"git add {filepath}")
    run_git_command(f'git commit -m "Solved {problem_name}" --date="{commit_date}"')

    print(f"Committed {filename} on {commit_date}")

# Generate commits for past 5 days
for i in range(5, 0, -1):
    make_commit(i)

# Push changes
run_git_command("git push")

print("All commits created and pushed successfully!")
