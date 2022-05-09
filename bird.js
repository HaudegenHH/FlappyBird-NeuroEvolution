class Bird {
	constructor(brain){
    this.x = 30
  	this.y = HEIGHT/2
    this.velY = 0
    this.lift = -9
    this.score = 0
    this.fitness = 0
    if(brain){
      this.brain = brain.copy()
      this.brain.mutate();
    } else {
      this.brain = new NeuralNetwork(4,4,2)
    }
  }
  draw(){
  	ctx.beginPath()
    ctx.fillStyle = "rgba(255,255,255,0.5)"
    ctx.arc(this.x, this.y, 10, 0, TWO_PI, true)
    ctx.fill()
  }
  up(){
    this.velY += this.lift
  }
  think(pipes){

    // find closest pipe
    let closest = null
    let closestDist = Infinity
    for(let i = 0; i < pipes.length; i++){
      let d = pipes[i].x - this.x
      if(d < closestDist && d > 0){
        closest = pipes[i]
        closestDist = d
      }
    }


    let inputs = []
    inputs[0] = this.y / HEIGHT
    inputs[1] = closest.top / HEIGHT    
    inputs[2] = closest.bottom / HEIGHT
    inputs[3] = closest.x / WIDTH

    // with predict() the inputs will be feedforwarded (times the weights, summed, activation fn, etc)
    let output = this.brain.predict(inputs)
    if(output[0] > output[1]){
      this.up()
    }
  }
  mutate(){
    this.brain.mutate()   // mutate rate: 0.1 (-> helpers.js)
  }
  update(){
    this.score++

  	this.velY += GRAVITY
    this.velY *= 0.94  
    this.y += this.velY
    
    if(this.y > HEIGHT){
    	this.y = HEIGHT
      this.velY = 0
    }
    if(this.y < 0){
    	this.y = 0
      this.velY = 0
    }
  }
  copy() {
    return new Bird(this.brain);
  }
}