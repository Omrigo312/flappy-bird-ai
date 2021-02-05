const TOTAL = 400;

let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;

function setup() {
  createCanvas(800, 600);
  slider = createSlider(1, 100, 1);

  for (let i = 0; i < TOTAL; i++) {
    birds.push(new Bird());
  }
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 75 === 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      const pipe = pipes[i];

      pipe.update();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (pipe.hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
        }
      }

      if (pipe.offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].offscreen()) {
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }

    for (const bird of birds) {
      bird.think(pipes);
      bird.update();
    }

    if (birds.length === 0) {
      counter = 0;
      nextGeneration();
      pipes = [];
    }
  }

  // Drawing
  background(0);

  for (const bird of birds) {
    bird.show();
  }

  for (const pipe of pipes) {
    pipe.show();
  }
}

// function keyPressed() {
//   if (key === ' ') {
//     bird.up();
//   }
// }
