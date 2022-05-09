// calculate the fitness for each bird and normalize (between 0 and 1, add up to 1)	
/*
function calculateFitness(){
	let sum = 0
	for(let bird of birds){
		sum += bird.score
	}

	for(let bird of birds){
		bird.fitness = bird.score / sum
	}
}

/*
function pickOne(){
	let bird = random(savedBirds)
	let child = new Bird(bird.brain)
    child.mutate()

	return child
}
*/



// Normalize the fitness of all birds
function normalizeFitness() {
  // Make score exponentially better?
  for (let i = 0; i < savedBirds.length; i++) {
    savedBirds[i].score = Math.pow(savedBirds[i].score, 2);
  }

  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < savedBirds.length; i++) {
    sum += savedBirds[i].score;
  }
  // Divide by the sum
  for (let i = 0; i < savedBirds.length; i++) {
    savedBirds[i].fitness = savedBirds[i].score / sum;
  }
}

function nextGeneration(){

	normalizeFitness()

	// Generate a new set of birds
  	birds = generate(savedBirds);

  	savedBirds = []
}

// Generate a new population of birds
function generate(oldBirds) {
  let newBirds = [];
  for (let i = 0; i < oldBirds.length; i++) {
    // Select a bird based on fitness
    let bird = poolSelection(oldBirds);
    newBirds[i] = bird;
  }
  return newBirds;
}

// An algorithm for picking one bird from an array
// based on fitness
function poolSelection(birds) {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = randomFloat(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= birds[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  let bird = birds[index]
  let child = new Bird(bird.brain)
  child.mutate()
  
  return child;
}



