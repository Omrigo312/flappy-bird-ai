function getClosestPipe(pipes, birdX) {
  let closest = null;
  let closestD = Infinity;
  for (const pipe of pipes) {
    let d = pipe.x + pipe.w - birdX;
    if (d < closestD && d > 0) {
      closest = pipe;
      closestD = d;
    }
  }
  return closest;
}

function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newX = x + offset;
    return newX;
  }
  return x;
}

class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.7;
    this.lift = -16;
    this.velocity = 0;

    this.score = 0; // the longer the bird lives, the highest the score
    this.fitness = 0;

    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }

  show() {
    stroke(255);
    fill(255, 50);
    ellipse(this.x, this.y, 32, 32);
  }

  up() {
    this.velocity += this.lift;
  }

  think(pipes) {
    const closestPipe = getClosestPipe(pipes, this.x);

    // dividing by height for data normalization
    const inputs = [
      this.y / height,
      closestPipe.top / height,
      closestPipe.bottom / height,
      closestPipe.x / width,
      this.velocity / 10,
    ];
    const output = this.brain.predict(inputs);

    if (output[1] > output[0]) {
      this.up();
    }
  }

  offscreen() {
    return this.y > height || this.y < 0;
  }

  update() {
    this.score++;
    this.velocity += this.gravity;
    this.y += this.velocity;
  }
}
