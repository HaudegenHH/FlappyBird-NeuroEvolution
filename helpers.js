function sigmoid(x){
  return 1 / (1 + Math.exp(-x))
}

// derivative of sigmoid
function dsigmoid(y){
	// since the output is already mapped through sigmoid
  // its not: 
  // return simoid(x) * (1 - sigmoid(x))
  // but rather:  
	return y * (1 - y)  // ..where y is already "sigmoided"
}

function random(arr){
	return arr[Math.random()*arr.length|0]
}

function randomInt(min, max){
	return Math.random() * (max - min) + min | 0
}

function randomFloat(max){
  return Math.random() * max
}

function randomFloatBetween(min, max){
  return Math.random() * (max - min) + min
}

function map(val, minA, maxA, minB, maxB){
  let slope = (maxB - minB) / (maxA - minA)
  return minA + slope * (val - minA)
}

// How to adjust weights ever so slightly
function mutate(x) {
  if (randomFloat(1) < 0.1) {
    //let offset = randomFloatBetween(-0.1, 0.1);    
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

function randomGaussian() {
  let rand = 0;

  for (let i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}

