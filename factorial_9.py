# Problem: Find the factorial of a number.

def factorial(n):
    return 1 if n == 0 else n * factorial(n - 1)
