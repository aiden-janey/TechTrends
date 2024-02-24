import requests
import matplotlib.pyplot as plt
import numpy as np

response = requests.get("http://localhost:8887/commonLanguages").json()

langs = []
counts = []

for obj in response:
    langs.append(obj['lang'])
    counts.append(obj['num'])

x = np.array(langs)
y = np.array(counts)

plt.pie(y, labels=x)

plt.title("Programming Languages from GTA Web Developer Positions")

plt.show()