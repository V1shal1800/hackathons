"""
1. Pick ten random numbers
2. Sort the ten numbers in decreasing order
3. Print the sorted numbers
4. Repeat two more times
"""


import random

def main():
    for i in range(3):
        numbers = []
        for j in range(10):
            numbers.append(random.randint(1, 100))
        numbers.sort(reverse=True)
        print(numbers)

main()
