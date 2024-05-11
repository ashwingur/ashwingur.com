import ArtNavBar from "../../components/ArtNavBar";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import p5 from "p5";

const TheDownpour = () => {
  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let width: number;
    let height: number;
    let walls: Wall[] = [];
    let particles: Particle[] = [];
    const gravity = 0.2;
    const rainDensity = 30;
    const numLayers = 5;
    const hue = Math.random() * 360;
    const terminalVelocity = 10;
    const layerVelocityMultiplier = 1;

    class Particle {
      pos: p5.Vector;
      prev_pos: p5.Vector;
      vel: p5.Vector;
      life: number;
      layer: number;

      constructor(public x: number, public y: number) {
        this.layer = Math.floor(Math.random() * numLayers);
        this.pos = p5.createVector(x, y);
        this.prev_pos = this.pos.copy();
        this.vel = p5.createVector(
          2 + this.layer * 0,
          3 + this.layer * layerVelocityMultiplier
        );
        this.life = 300;
      }

      update() {
        this.life--;
        const prev_x = this.pos.x;
        const prev_y = this.pos.y;
        this.prev_pos = this.pos.copy();
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.vel.y += gravity;
        if (
          this.vel.y >=
          terminalVelocity + this.layer * layerVelocityMultiplier
        ) {
          this.vel.y = terminalVelocity + this.layer * layerVelocityMultiplier;
        }

        // Go through every wall and check if there was a collision
        walls.forEach((w) => {
          if (
            w.layer > this.layer ||
            !w.isCollision(prev_x, prev_y, this.pos.x, this.pos.y)
          ) {
            return;
          }
          // Collision logic
          if (w.walltype === WallType.HORIZONTAL) {
            this.pos.y -= this.vel.y;
            this.vel.y *= -Math.random() * 0.1;
            this.vel.x *= 0.5;
          } else if (w.walltype === WallType.VERTICAL) {
            this.vel.x *= -Math.random() * 0.2;
            this.pos.x += this.vel.x;
          } else if (w.walltype === WallType.DIAGONAL) {
            this.pos.y -= this.vel.y;
            if (Math.sign(this.vel.x) !== Math.sign(w.gradient)) {
              this.vel.x *= -1;
            }
            // this.vel.x *= Math.sign(w.gradient);
            this.vel.y *= -Math.random() * 0.1;
          }

          // Randomly decrease the lifetime of the particle
          this.life *= Math.random();
        });
      }

      draw() {
        p5.fill(hue, 50, 80 + this.vel.mag() * 2);
        p5.circle(this.pos.x, this.pos.y, 2);
      }

      drawPrev() {
        p5.fill(hue, 50, 50 + this.vel.mag());
        p5.circle(this.prev_pos.x, this.prev_pos.y, 2);
      }

      isDead() {
        return this.life < 0;
      }
    }
    enum WallType {
      HORIZONTAL,
      VERTICAL,
      DIAGONAL,
    }

    class Wall {
      x_points: number[] = [];
      y_points: number[] = [];
      walltype: WallType;
      gradient: number = 0;

      constructor(
        private start_x: number,
        private start_y: number,
        private end_x: number,
        private end_y: number,
        public layer: number
      ) {
        if (end_x < start_x) {
          throw new Error(
            `Start x (${start_x}) should be less than end x (${end_x})`
          );
        }

        // Generate all the points along a straight line from the start and end coordinates
        // Consider 3 scenarios: horizontal, vertical and diagonal line
        if (start_x == end_x) {
          this.initialiseVerticalLine();
          this.walltype = WallType.VERTICAL;
        } else if (start_y == end_y) {
          this.initialiseHorizontalLine();
          this.walltype = WallType.HORIZONTAL;
        } else {
          this.initialiseDiagonalLine();
          this.walltype = WallType.DIAGONAL;
        }
      }

      initialiseHorizontalLine() {
        for (let x = this.start_x; x <= this.end_x; x++) {
          this.x_points.push(x);
          this.y_points.push(this.start_y);
        }
      }

      initialiseVerticalLine() {
        for (let y = this.start_y; y <= this.end_y; y++) {
          this.x_points.push(this.start_x);
          this.y_points.push(y);
        }
      }

      initialiseDiagonalLine() {
        let m = (this.end_y - this.start_y) / (this.end_x - this.start_x);
        console.log(`gradient is ${m}`);
        for (let x = this.start_x; x < this.end_x; x++) {
          this.x_points.push(x);
          this.y_points.push(this.start_y + m * (x - this.start_x));
        }
        this.gradient = m;
      }

      isCollision(
        prev_x: number,
        prev_y: number,
        curr_x: number,
        curr_y: number
      ): boolean {
        if (this.walltype === WallType.HORIZONTAL) {
          // Check if x pos within bounds
          if (curr_x >= this.start_x && curr_x <= this.end_x) {
            // Now check if the wall was crossed by the Y value
            if (prev_y < this.start_y && curr_y >= this.start_y) {
              return true;
            }
          }
        } else if (this.walltype === WallType.VERTICAL) {
          // Check if y pos within bounds
          if (curr_y >= this.start_y && curr_y <= this.end_y) {
            // Now check if the wall was crossed by the Y value
            if (
              (prev_x < this.start_x && curr_x >= this.start_x) ||
              (prev_x >= this.start_x && curr_x < this.start_x)
            ) {
              return true;
            }
          }
        } else if (this.walltype === WallType.DIAGONAL) {
          // Frist verify its within bounds of x
          if (
            curr_x < this.start_x &&
            curr_x > this.end_x &&
            prev_x < this.start_x &&
            prev_x > this.end_x
          ) {
            return false;
          }
          // First check if the particle was above the line
          if (prev_y <= this.y_points[Math.floor(prev_x) - this.start_x]) {
            // Then check if the particle was below the line afterwards
            if (curr_y >= this.y_points[Math.floor(curr_x) - this.start_x]) {
              return true;
            }
          }
        } else {
          console.log("Unknown wall type.");
        }

        return false;
      }

      draw() {
        p5.fill(255);
        for (let i = 0; i < this.x_points.length; i++) {
          p5.rect(this.x_points[i], this.y_points[i], 1, 1);
        }
      }

      static makeHouseShape(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        layer: number
      ): Wall[] {
        let house: Wall[] = [];

        // Left wall
        house.push(new Wall(x1, y1, x1, height, layer));
        // Right wall
        house.push(
          new Wall(x1 + 2 * (x2 - x1), y1, x1 + 2 * (x2 - x1), height, layer)
        );
        // Left roof
        house.push(new Wall(x1, y1, x2 + 1, y2, layer));
        // Right roof
        house.push(new Wall(x2 - 1, y2, x1 + 2 * (x2 - x1), y1, layer));

        return house;
      }

      static squareBuilding() {
        return [
          new Wall(
            295,
            Math.floor(0.3 * height),
            505,
            Math.floor(0.3 * height),
            0
          ),
          new Wall(
            -200,
            Math.floor(0.7 * height),
            width,
            Math.floor(0.7 * height),
            0
          ),
          new Wall(
            300,
            Math.floor(0.3 * height),
            300,
            Math.floor(0.7 * height),
            0
          ),
          new Wall(
            500,
            Math.floor(0.3 * height),
            500,
            Math.floor(0.7 * height),
            0
          ),
        ];
      }

      static diagonalRoof() {
        return [
          new Wall(100, 500, 401, 400, 0),
          new Wall(399, 400, 700, 500, 0),
        ];
      }
      static twoLayerRoof() {
        return [
          new Wall(100, 500, 401, 400, 1),
          new Wall(399, 400, 700, 500, 1),
          new Wall(100, 300, 401, 200, 0),
          new Wall(399, 200, 700, 300, 0),
        ];
      }
    }

    p5.setup = () => {
      width = Math.min(p5.windowWidth - 20, 800);
      height = Math.min(p5.windowWidth - 20, 800);
      p5.createCanvas(width, height);

      // walls.push(...Wall.squareBuilding());
      // walls.push(...Wall.twoLayerRoof());
      walls.push(...Wall.makeHouseShape(500, 300, 700, 200, 4));
      walls.push(...Wall.makeHouseShape(350, 500, 550, 400, 3));
      walls.push(...Wall.makeHouseShape(600, 550, 750, 450, 0));
      walls.push(...Wall.makeHouseShape(50, 700, 300, 600, 1));

      p5.noStroke();
      p5.colorMode(p5.HSL);
    };

    p5.draw = () => {
      p5.background(0, 0, 0, 0.2);

      for (let i = 0; i < rainDensity; i++) {
        particles.push(
          new Particle(
            Math.floor(-0.2 * width + Math.random() * 1.2 * width),
            -(Math.random() * 100 + 100)
          )
        );
      }

      // If a particle is dead remove it from the list
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].isDead()) {
          particles.splice(i, 1);
        }
      }

      particles.forEach((p) => {
        p.drawPrev();
      });
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // walls.forEach((w) => {
      //   w.draw();
      // });
    };
  };

  return (
    <div>
      <ArtNavBar fixed={true} />
      <h1 className="text-center pt-20">The Downpour.</h1>
      <div className="flex justify-center mt-4 mb-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default TheDownpour;
