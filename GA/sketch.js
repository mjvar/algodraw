// Genetic algorithm that mimics user-drawn images

let target;
let popmax;
let mutationRate;
let population;
let startGA = false;

let resolution = 200;


function setup() {
  createCanvas(800, 800);
  background(0);
  target = [];
  // Create target array
  for (let x = 0; x < resolution; x++){
    target[x] = [];
    for (let y = 0; y < resolution; y++){
      target[x][y] = 0;
    }
  }
  // Set population size and mutation rate
  popmax = 200;
  mutationRate = 0.0001;

  // Create a population with a target array, mutation rate, and population max
  population = new Population(target, mutationRate, popmax, resolution);
}

function draw() {
  if(startGA == true){
    // Generate mating pool from the population
    population.naturalSelection();
    //Create next generation from mating pool
    population.generate();
    // Calculate fitness of each spawn
    population.calcFitness();
    // See if target has been met
    population.evaluate();
    // Print the best performer in the generation
    printBest();
    
    // If we found the target phrase, stop
    if (population.isFinished()) {
      println(millis()/1000.0);
      noLoop();
    }
  }
}

// Pen tool that draws when mouse is dragged
function mouseDragged(){
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 10, 10);
}

// Starting the GA after user drawing
function keyPressed(){
  // Only run this function if the GA hasn't started yet
  if (keyCode === ENTER && startGA == false){
    for (let x = 0; x < resolution; x++){
      for (let y = 0; y < resolution; y++){
        // Get the pixel value (low resolution) of the user's drawing
        thepix = get(x*4, y*4);
        target[x][y] = map(thepix[0], 0, 255, 0, 1);
      }
    }
    // Start the GA
    startGA = true;
  }
}

// Function to draw the best performer of each generation
function printBest(){
  noStroke();
  // Retrieve highest performer from the current gen
  i = population.evaluate();
  pic = population.population[i];

  // Draw the highest perfomrer
  for (let x = 0; x < resolution; x++) {
    for (let y = 0; y < resolution; y++) {
      fill(map(pic.genes[x][y], 0, 1, 0, 255));
      rectMode(CENTER);
      rect(x*4, y*4, 4, 4);
    }
  } 
  // Print some useful metadata
  stroke(0);
  strokeWeight(10);
  fill(255);
  textSize(30);
  text("Generations: " + population.getGenerations(), 20, 750);
  let fitpercent = round(population.population[population.evaluate()].fitness * 10000)/100;
  text("Highest fitness: " + fitpercent + '%', 20, 780);
}