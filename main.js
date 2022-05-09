const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const log = console.log
const WIDTH = canvas.width = 400
const HEIGHT = canvas.height = 400

const TWO_PI = Math.PI * 2
const GRAVITY = 0.18   

const TOTAL = 250 // total population
let birds = []
let savedBirds = []
let pipes = []
let generation = 1

let frameCount = 0


/*
document.addEventListener('keydown', ({keyCode}) => {
	if(keyCode == 32){
		bird.up()
  	}
})
*/

function init(){
  for(let i = 0; i < TOTAL; i++){
    birds[i] = new Bird()
  }

  //pipes.push(new Pipe())
  //log(pipes[0])

  animate()
}

function animate(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT)
  
	if(pipes.length > 0){
    for(let i = pipes.length-1; i >= 0; i--){  
      pipes[i].update()
      pipes[i].draw()

      for(let j = birds.length-1; j >= 0; j--){
        if(pipes[i].collides(birds[j])) {        
          savedBirds.push(birds.splice(j, 1)[0])
        }
      }      

      if(pipes[i].x < -20){
        pipes.splice(i, 1)
      }
    }
  
  
    birds.forEach(bird => {
      bird.think(pipes)
      bird.update()
      bird.draw()  
    })
  }

  if(birds.length == 0){
    nextGeneration()
    pipes = []
    pipes.push(new Pipe())
    generation++
  }

  ctx.font = '30px serif';
  ctx.fillText("Generation: " + generation,20,20)


	if(frameCount % 150 === 0){
  	pipes.push(new Pipe())
  }
	frameCount++
  
	requestAnimationFrame(animate)
}

init()
