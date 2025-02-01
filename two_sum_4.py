# Problem: Given an array of integers, return indices of the two numbers such that they add up to a specific target.

def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        if target - num in seen:
            return [seen[target - num], i]
        seen[num] = i
    return []
