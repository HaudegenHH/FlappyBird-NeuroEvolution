class Pipe {
	constructor(){
  	this.x = WIDTH    
    this.spacing = 150    
    this.top = randomInt(HEIGHT / 6, 3 / 4 * HEIGHT)
    this.bottom = HEIGHT - (this.top + this.spacing)
    this.speed = 2
    this.highlight = false
    this.w = 20
    this.bottomY = this.top + this.spacing
  }
  draw(){
  	ctx.beginPath()
    if(this.highlight){
    	ctx.fillStyle = '#f00'
    } else {
    	ctx.fillStyle = '#fff'    
    }
    ctx.fillRect(this.x, 0, this.w, this.top)
    ctx.fillRect(this.x, this.bottomY, this.w, this.bottom)
    ctx.closePath()
  }
  update(){
  	this.x -= this.speed
  }
  collides(bird){
  	if(bird.y < this.top || bird.y > this.bottomY){
      if(bird.x > this.x && bird.x < this.x + this.w){
      	this.highlight = true
        return true
      }
    } 
    this.highlight = false
    return false
  }
}