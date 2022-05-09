class Matrix {
	constructor(rows, cols){
    if(!rows || !cols){
    	console.log("The constructor requires the num of rows and columns!")
    } else {
      this.rows = rows
      this.cols = cols
      this.data = Array(rows).fill().map(_ => new Array(cols).fill(0))    
    }
  }  
  print(){
  	console.table(this.data)
  }
  randomize(){
  	for(let i = 0; i < this.rows; i++){
    	for(let j = 0; j < this.cols; j++){
        this.data[i][j] = Math.random() * 2 - 1 
      }
    }
  }
  add(n){
  	if(n instanceof Matrix){
    	for(let i = 0; i < this.rows; i++){
    	  for(let j = 0; j < this.cols; j++){
          this.data[i][j] += n.data[i][j]
        }
      }
    } else {
    	for(let i = 0; i < this.rows; i++){
    	  for(let j = 0; j < this.cols; j++){
          this.data[i][j] += n
        }
      }
    }
  }
  multiply(n){
    if(n instanceof Matrix){
    	// haddamard / schur product
      for(let i = 0; i < this.rows; i++){
    		for(let j = 0; j < this.cols; j++){
        	this.data[i][j] *= n.data[i][j]
      	}
    	}
    } else {
    	// scalar product    
  		for(let i = 0; i < this.rows; i++){
    		for(let j = 0; j < this.cols; j++){
        	this.data[i][j] *= n
      	}
    	}
    }
  }
  // map receives a lambda fn
  map(fn){
  	for(let i = 0; i < this.rows; i++){
    	for(let j = 0; j < this.cols; j++){
        let val = this.data[i][j]
        this.data[i][j] = fn(val)
      }
    }
    return this
  }
  static map(fn, m){
    let result = new Matrix(m.rows, m.cols)
    for(let i = 0; i < m.rows; i++){
    	for(let j = 0; j < m.cols; j++){
        let val = m.data[i][j]
        result.data[i][j] = fn(val)
      }
    }
    return result
  }
  static transpose(m){
  	let matrix = new Matrix(m.cols, m.rows)
    for(let i = 0; i < m.rows; i++){
    	for(let j = 0; j < m.cols; j++){
        matrix.data[j][i] = m.data[i][j]
      }
    }
    return matrix
  }
  static multiply(a, b){
    if(!(a instanceof Matrix) || !(b instanceof Matrix)){
    	console.log("a and b must be instances of class Matrix")
    	return 
    } else {
      if(a.cols !== b.rows){
    		console.log("Columns of Matrix a must match rows of Matrix b")
      	return
    	}	
    	let result = new Matrix(a.rows, b.cols)
    	for(let i = 0; i < a.rows; i++){
    		for(let j = 0; j < b.cols; j++){
      		let sum = 0
        	// calculating the dot product (sum of all cols of a times all rows of b)
        	for(let k = 0; k < a.cols; k++){          
        		sum += a.data[i][k] * b.data[k][j]
        	}
        	result.data[i][j] = sum
      	}
    	}
    	return result
  	}
  }
  static sub(a, b){
  	let matrix = new Matrix(a.rows, a.cols)
    for(let i = 0; i < a.rows; i++){
    	for(let j = 0; j < a.cols; j++){
        matrix.data[i][j] = a.data[i][j] - b.data[i][j]
      }
    }
    return matrix
  }
  static fromArray(arr){
  	let matrix = new Matrix(arr.length, 1)
    for(let i = 0; i < arr.length; i++){
    	matrix.data[i][0] = arr[i]
    }
    return matrix
  }
  toArray(){
  	let arr = []
		for(let i = 0; i < this.rows; i++){
    	for(let j = 0; j < this.cols; j++){
        arr.push(this.data[i][j])
      }
    }
    return arr
  }
  copy() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }
  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let matrix = new Matrix(data.rows, data.cols);
    matrix.data = data.data;
    return matrix;
  }
}