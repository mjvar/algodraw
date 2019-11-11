// Genetic Algorithm: Image Imitation (based on Dan Shiffman's code)

// A class to describe a pseudo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA


// Constructor (makes a random DNA)
class DNA {
  constructor(siz) {
    // The genetic sequence
    this.genes = [];

    this.fitness = 0;
    for (let x = 0; x < siz; x++) {
      this.genes[x] = [];
      for (let y = 0; y < siz; y++){
        this.genes[x][y] = random(0, 1);
      }
    }
  }

  // Converts character array to a String
  getPhrase() {
    return this.genes.join("");
  }

  // Fitness function
  calcFitness(target) {
    let score = 0;
    for (let x = 0; x < this.genes.length; x++) {
      for (let y = 0; y < this.genes.length; y++) {
        // Add to fitness score based on how close each pixel is to the target
        score += 1 - abs(this.genes[x][y] - target[x][y]);
      }
    }
    // Exponential fitness functions are faster, because they 
    // give more weight to small differences at the top
    this.fitness = pow(score/this.genes.length/this.genes.length, 2);
  }

  // Crossover
  crossover(partner) {
    // A new child
    let child = new DNA(this.genes.length);

    // Iterate over every part of the gene
    for (let x = 0; x < this.genes.length; x++) {
      for (let y = 0; y < this.genes.length; y++) {
        // Assign values to the genes from the parents; degree of randomness added for variation
        if (abs(this.genes[x][y] - target[x][y]) < abs(partner.genes[x][y] - target[x][y]) && random(1) < 0.2){
          child.genes[x][y] = this.genes[x][y];
        } else {
          child.genes[x][y] = partner.genes[x][y];
        }
      }
    }
    return child;
  }
  
  // Based on a mutation probability, picks a new random character
  mutate(mutationRate) {
    for (let x = 0; x < this.genes.length; x++) {
      for (let y = 0; y < this.genes.length; y++) {
        if (random(1) < mutationRate) {
          this.genes[x][y] = random(0, 1);
        }
      }
    }
  }
}