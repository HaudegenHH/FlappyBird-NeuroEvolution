class NeuralNetwork {
  constructor(i,h,o){

    if (i instanceof NeuralNetwork) {
        let nn = i;
        this.input_nodes = nn.input_nodes;
        this.hidden_nodes = nn.hidden_nodes;
        this.output_nodes = nn.output_nodes;
        this.weights_ih = nn.weights_ih.copy();
        this.weights_ho = nn.weights_ho.copy();

        this.bias_h = nn.bias_h.copy();
        this.bias_o = nn.bias_o.copy();
        
    } else {
        this.input_nodes = i
        this.hidden_nodes = h
        this.output_nodes = o
        
        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes)
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes)
        this.weights_ih.randomize()
        this.weights_ho.randomize()
        
        this.bias_h = new Matrix(this.hidden_nodes, 1)
        this.bias_o = new Matrix(this.output_nodes, 1)    
        this.bias_h.randomize()
        this.bias_o.randomize()
    }

    this.learningRate = 0.1
  }  
  feedforward(input_array){
    // converting the array into a matrix 
    let inputs = Matrix.fromArray(input_array)
    // calculating the hidden layer by (matrix-)multiplying the weights with the inputs..
    let hidden = Matrix.multiply(this.weights_ih, inputs)
    // ..adding the biasses
    hidden.add(this.bias_h)
    // ..and running the sigmoid ("activation") function for each 
    hidden.map(sigmoid)    
    
    // calculating the output layer (same as above)
    let output = Matrix.multiply(this.weights_ho, hidden)
    output.add(this.bias_o)
    output.map(sigmoid)
    
    return output
  }
  // backpropagation with (stochastic) gradient descent
  train(input_array, target_array){
    //let outputs = this.feedforward(inputs)
    
    // adding some redundancy here (from feedforward)
    let inputs = Matrix.fromArray(input_array)
    // calculating the hidden layer by (matrix-)multiplying the weights with the inputs..
    let hidden = Matrix.multiply(this.weights_ih, inputs)
    // ..adding the biasses
    hidden.add(this.bias_h)
    // ..and running the sigmoid ("activation") function for each 
    hidden.map(sigmoid)    
    
    // calculating the output layer (same as above)
    let outputs = Matrix.multiply(this.weights_ho, hidden)
    outputs.add(this.bias_o)
    outputs.map(sigmoid)
    
    //outputs.print()
    
    
    
    // calculate the error (error = targets - outputs)
    let targets = Matrix.fromArray(target_array)
    let output_errors = Matrix.sub(targets, outputs)
        
    // backpropagate the error by calculating the delta weights:
    /* delta_who = learningRate x Error x Derivative of Sigmoid x Hidden_transposed */
    
    // first, calculate the gradients:
    // gradient = outputs * (1 - outputs) 
    // map the outputs through the derivative of sigmoid
    let gradients = Matrix.map(dsigmoid, outputs)
    gradients.multiply(output_errors)  // Haddamard/Schur product
    gradients.multiply(this.learningRate) // scalar product
    
    // 2nd: calculate the delta weights (hidden->output)
    // outputs (Matrix-)multiplied by the Hidden Matrix (transposed)
    // Hidden Matrix = inputs x weights + bias -> map all with sigmoid
    let hidden_t = Matrix.transpose(hidden) 
    let weights_ho_deltas = Matrix.multiply(gradients, hidden_t)    
    // last piece: adjusting the weights by adding the deltas
    this.weights_ho.add(weights_ho_deltas) 
    // ..and adjusting output biasses by its deltas (which are just the gradients)
    this.bias_o.add(gradients)


    // calculate the hidden layer errors
    // 1st: transposing the weight matrix (weights_hidden_to_output_transposed)
    let who_t = Matrix.transpose(this.weights_ho)
    // 2nd: 'multiply' transposed matrix by the output errors
    let hidden_errors = Matrix.multiply(who_t, output_errors)
    
    // similar as before in the output layer
    // deltas of weights_input_hidden  are calculated by..
    // deltaWeights_ih = learningRate x hiddenError x (H * (1-H)) * Inputs_transposed
    // so, first calculate the gradients
    let hidden_gradients = Matrix.map(dsigmoid, hidden)
    hidden_gradients.multiply(hidden_errors)
    hidden_gradients.multiply(this.learningRate)    
    
    // calculate the input to hidden deltas
    let inputs_t = Matrix.transpose(inputs)
    let weights_ih_deltas = Matrix.multiply(hidden_gradients, inputs_t)
    this.weights_ih.add(weights_ih_deltas)
    this.bias_h.add(hidden_gradients)        
  }
  predict(input_array) {

    // Generating the Hidden Outputs
    let inputs = Matrix.fromArray(input_array)
    let hidden = Matrix.multiply(this.weights_ih, inputs)
    hidden.add(this.bias_h)
    // activation function
    hidden.map(sigmoid)

    let output = Matrix.multiply(this.weights_ho, hidden)
    output.add(this.bias_o)
    output.map(sigmoid)

    return output.toArray()
  }

  serialize() {
    return JSON.stringify(this)
  }

  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data)
    }
    let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes)
    nn.weights_ih = Matrix.deserialize(data.weights_ih)
    nn.weights_ho = Matrix.deserialize(data.weights_ho)
    nn.bias_h = Matrix.deserialize(data.bias_h)
    nn.bias_o = Matrix.deserialize(data.bias_o)
    nn.learning_rate = data.learning_rate
    return nn
  }


  // adding function for neuro-evolution
  copy() {
    return new NeuralNetwork(this)
  }

  mutate() {
    this.weights_ih = Matrix.map(mutate, this.weights_ih)
    this.weights_ho = Matrix.map(mutate, this.weights_ho)
  }
}