import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { P5CanvasInstance, P5WrapperProps, Sketch } from "@p5-wrapper/react";
import BasicNavbar from "../../components/BasicNavbar";
import p5 from "p5";

const ParticleLife = () => {
  const width = 1200;
  const height = 800;

  const sketch: Sketch = (p5: P5CanvasInstance) => {
    enum Colour {
      Red = 0,
      Orange = 1,
      Yellow = 2,
      Green = 3,
      Blue = 4,
      Purple = 5,
    }
    let particles: Particle[];
    let particleRuleSet: ParticleRuleSet;
    const n = 300;
    const nColours = 6;
    const dampingFactor = 0.9;
    const close_repulsion_distance = 50;
    // Keep this negative
    const close_repulsion_force = 10;
    const max_distance_force = 200;
    const wall_bounce = 3;
    const speed = 50; // Lower is faster
    class Particle {
      position: p5.Vector;
      velocity: p5.Vector;
      acceleration: p5.Vector;
      p5Colour: p5.Color;
      constructor(x: number, y: number, public colour: Colour) {
        this.position = p5.createVector(x, y);
        this.velocity = p5.createVector(0, 0);
        this.acceleration = p5.createVector(0, 0);
        this.p5Colour = p5.color(0, 0, 0);
        this.setColour(colour);
      }
      update() {
        this.velocity.add(this.acceleration).mult(dampingFactor);
        this.position.add(this.velocity);
        // Check if its gone off the screen, wrap it back around
        if (this.position.x < 0) {
          // this.position.x = width - 1;
          this.position.x = 0;
          this.velocity.x *= -wall_bounce;
        } else if (this.position.x >= width) {
          this.position.x = width - 1;
          this.velocity.x *= -wall_bounce;
        }
        if (this.position.y < 0) {
          this.position.y = 0;
          this.velocity.y *= -wall_bounce;
        } else if (this.position.y >= height) {
          this.position.y = height - 1;
          this.velocity.y *= -wall_bounce;
        }
        // Reset acceleration
        this.acceleration.x = 0;
        this.acceleration.y = 0;
      }
      applyForce(force: p5.Vector) {
        this.acceleration.add(force.div(speed));
      }
      setColour(colour: Colour) {
        switch (colour) {
          case Colour.Red:
            this.p5Colour = p5.color(235, 64, 52);
            break;
          case Colour.Orange:
            this.p5Colour = p5.color(235, 147, 52);
            break;
          case Colour.Yellow:
            this.p5Colour = p5.color(255, 242, 99);
            break;
          case Colour.Green:
            this.p5Colour = p5.color(64, 235, 52);
            break;
          case Colour.Blue:
            this.p5Colour = p5.color(52, 134, 235);
            break;
          case Colour.Purple:
            this.p5Colour = p5.color(168, 52, 235);
            break;
          default:
            this.p5Colour = p5.color(0, 0, 0);
        }
      }
    }
    // Defines a CxC matrix regarding the attraction/repulsion rules
    // for all the various colours
    class ParticleRuleSet {
      ruleMatrix: number[][];
      constructor(
        private universal_repulsion_distance: number,
        private max_force_distance: number
      ) {
        // Create a random one for now
        this.ruleMatrix = Array();
        for (let i = 0; i < nColours; i++) {
          this.ruleMatrix.push(Array(nColours));
          for (let j = 0; j < nColours; j++) {
            if (i === j) {
              // this.ruleMatrix[i][j] = 1;
              this.ruleMatrix[i][j] = Math.random() * 4 - 2;
              // this.ruleMatrix[i][j] = 0;
            } else {
              this.ruleMatrix[i][j] = Math.random() * 4 - 2;
            }
          }
        }
      }
      // Calculate the force to be applied to particle a based on the characteristics of
      // particle b
      forceOnParticle(a: Particle, b: Particle): p5.Vector {
        // const r = a.position.dist(b.position);
        const { r, directionVector } = this.calculateDistanceAndVector(a, b);
        if (
          r >=
          (this.max_force_distance - this.universal_repulsion_distance) * 2 +
            this.universal_repulsion_distance
        ) {
          // If the particles are too far, then no force should be applied
          return p5.createVector(0, 0);
        } else if (r <= this.universal_repulsion_distance) {
          // The particles are too close to each other, apply the universal repulsion force
          // to prevent them from converging to a single point

          // COULDNT USE p5.Vector static method for some reason, cause window not defined error???
          // So I'm creating and doing the subtraction myself
          return directionVector
            .normalize()
            .mult(
              r / this.universal_repulsion_distance - close_repulsion_force
            );
        } else {
          // Look at the rule set for the correct force to apply
          // We use an absolute value cartesian equation
          const F = this.ruleMatrix[a.colour][b.colour];
          const force =
            (F /
              (this.max_force_distance - this.universal_repulsion_distance)) *
            Math.abs(r - this.max_force_distance);
          return directionVector.normalize().mult(force);
        }
      }

      calculateDistanceAndVector(a: Particle, b: Particle) {
        // Calculate straight line distance
        const r = a.position.dist(b.position);

        // Calculate the wrapped distance in both x and y directions
        let wrappedDistanceX = p5.abs(b.position.x - a.position.x);
        if (wrappedDistanceX > width / 2) {
          wrappedDistanceX = width - wrappedDistanceX;
        }

        let wrappedDistanceY = p5.abs(b.position.y - a.position.y);
        if (wrappedDistanceY > height / 2) {
          wrappedDistanceY = height - wrappedDistanceY;
        }

        // Create a vector between the points
        let directionVector = p5.createVector(
          b.position.x - a.position.x,
          b.position.y - a.position.y
        );

        // Adjust vector for wrapping in x direction
        if (wrappedDistanceX < p5.abs(b.position.x - a.position.x)) {
          if (b.position.x < a.position.x) {
            directionVector.x = width - a.position.x + b.position.x;
          } else {
            directionVector.x = -width + b.position.x - a.position.x;
          }
        }

        // Adjust vector for wrapping in y direction
        if (wrappedDistanceY < p5.abs(b.position.y - a.position.y)) {
          if (b.position.y < a.position.y) {
            directionVector.y = height - a.position.y + b.position.y;
          } else {
            directionVector.y = -height + b.position.y - a.position.y;
          }
        }

        return { r, directionVector };
      }

      setRuleMatrix(newRules: number[][]) {
        // Make sure its nColours by nColours
        this.ruleMatrix = newRules;
      }
    }
    p5.setup = () => {
      p5.createCanvas(width, height);
      const coloursArray = [
        Colour.Red,
        Colour.Orange,
        Colour.Yellow,
        Colour.Green,
        Colour.Blue,
        Colour.Purple,
      ];
      particles = new Array();
      for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * coloursArray.length);
        const randomColour = coloursArray[randomIndex] as Colour;

        particles.push(
          new Particle(
            p5.random(0, width - 1),
            p5.random(0, height - 1),
            randomColour
          )
        );
      }
      particleRuleSet = new ParticleRuleSet(
        close_repulsion_distance,
        max_distance_force
      );
      particleRuleSet.setRuleMatrix([
        // R, O, Y, G, B, P
        [1, 2, 0, 0, -4, 0], // R
        [0, 1, 2, 0, 0, 0], // O
        [0, 0, -3, 0, 0, 0], // Y
        [0, -3, 0, 1, 0, 0], // G
        [0, 0, 0, 0, 1, 0], // B
        [2, 0, 0, 0, 0, 1], // P
      ]);
      p5.noStroke();
      p5.frameRate(30);
    };

    p5.draw = () => {
      p5.background(0);
      for (let i = 0; i < n; i++) {
        // Loop through every other particle and apply the force to it
        for (let j = 0; j < n; j++) {
          // Dont apply force on it self
          if (i == j) continue;
          const forceToApply = particleRuleSet.forceOnParticle(
            particles[i],
            particles[j]
          );

          particles[i].applyForce(forceToApply);
        }
        particles[i].update();
        p5.fill(particles[i].p5Colour);
        p5.circle(particles[i].position.x, particles[i].position.y, 6);
      }
    };
  };

  return (
    <div>
      <BasicNavbar absolute={true} />
      <h1 className="text-center pt-20">Particle Life</h1>
      <div className="flex justify-center mt-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default ParticleLife;
