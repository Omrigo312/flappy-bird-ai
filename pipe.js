class Pipe {
  constructor() {
    this.spacing = 100;
    this.top = random(height / 6, (3 / 4) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 6;
  }

  hits(bird) {
    const xHit = bird.x > this.x && bird.x < this.x + this.w;
    const yHit = bird.y < this.top || bird.y > height - this.bottom;

    return xHit && yHit;
  }

  show() {
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }
}
