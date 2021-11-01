import random

def mysteryFunction():
    x = ["Violex", "Hamsterdam", "Ranger", "Algernon", "Geronimo", "Cocoa", "Panda", "Walle", "Rainbow"]
    y = ["Ming", "Hamster", "Dog", "Mouse", "Duong"]
    for i in range(5):
        x1 = x[random.randint(0, len(x))]
        y1 = y[random.randint(0, len(y))]
        print(x1 + " " + y1)
