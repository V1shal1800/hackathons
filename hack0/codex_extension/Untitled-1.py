"""
1. Pick 10 random numbers
2. Sort the numbers in decreasing order
3. Print those numbers
4. Repeat 2 more times
"""


import random

def main():
    for i in range(3):
        numbers = []
        for j in range(10):
            numbers.append(random.randint(1, 100))
        numbers.sort(reverse=True)
        print(numbers)

if __name__ == "__main__":
    main()