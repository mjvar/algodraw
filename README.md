# Algodraw

Genetic algorithm in p5.js that mimics user-generated drawings through random generation, mutation, and survival of the fittest.
[Live demo link here.](https://mjvar.github.io/algodraw/)

Drag mouse to draw, then press enter to start the genetic algorithm.

HOW IT WORKS:
After the user draws something, the genetic algorithm generates 100 random canvasses of pixels. Each of these canvasses is analyzed to determine how close it is to the actual drawing. The closer the canvas is, the more likely it is to survive to the next "generation". 

The next generation is created based on the DNA of the highest-performing canvasses of the previous generation. There is also a chance that the canvasses mutate random pixels, which could help them get closer to the drawing. This process is repeated until the drawing is recreated with 96.5% accuracy (because 100% accuracy is practically impossible).
