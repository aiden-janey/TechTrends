import random

def makeJobId(length):
    result = ''
    chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    c = 0
    while c < len(chars):
        result += chars[random.randint(0, len(chars)-1)]
        c += 1
    return result