import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import BasicNavbar from "../../components/BasicNavbar";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import p5 from "p5";
import { Vector } from "p5";

enum Colour {
  Red = 0,
  Orange = 1,
  Yellow = 2,
  Green = 3,
  Blue = 4,
  Purple = 5,
}

const ParticleLife = () => {
  const width = 1200;
  const height = 800;

  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let particles: Particle[];
    let particleRuleSet: ParticleRuleSet;
    const n = 100;
    const nColours = 6;

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
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        // Check if its gone off the screen, wrap it back around
        if (this.position.x < 0) {
          this.position.x = width - 1;
        } else if (this.position.x >= width) {
          this.position.x = 0;
        }

        if (this.position.y < 0) {
          this.position.y = height - 1;
        } else if (this.position.y >= height) {
          this.position.y = 0;
        }
        // Reset acceleration
        this.acceleration.x = 0;
        this.acceleration.y = 0;
      }

      applyForce(force: p5.Vector) {
        this.acceleration.add(force.div(100));
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
        private universal_repulsion_force: number,
        private universal_repulsion_distance: number,
        private max_force_distance: number
      ) {
        // Create a random one for now
        this.ruleMatrix = Array();
        for (let i = 0; i < nColours; i++) {
          this.ruleMatrix.push(Array(nColours));
          for (let j = 0; j < nColours; j++) {
            // For now make all same colours attracted to each other
            if (i === j) {
              this.ruleMatrix[i][j] = 1;
            } else {
              this.ruleMatrix[i][j] = p5.random(-1, 2);
            }
          }
        }
      }

      // Calculate the force to be applied to particle a based on the characteristics of
      // particle b
      forceOnParticle(a: Particle, b: Particle): p5.Vector {
        const distance = a.position.dist(b.position);
        if (distance >= this.max_force_distance) {
          // If the particles are too far, then no force should be applied
          return p5.createVector(0, 0);
        } else if (distance <= this.universal_repulsion_distance) {
          // The particles are too close to each other, apply the universal repulsion force
          // to prevent them from converging to a single point
          return Vector.sub(b.position, a.position)
            .normalize()
            .mult(this.universal_repulsion_force);
        } else {
          // Look at the rule set for the correct force to apply
          const force = this.ruleMatrix[a.colour][b.colour];
          return Vector.sub(b.position, a.position).normalize().mult(force);
        }
      }
    }

    p5.setup = () => {
      p5.createCanvas(width, height);

      particles = new Array();
      for (let i = 0; i < n; i++) {
        particles.push(
          new Particle(
            p5.random(0, width - 1),
            p5.random(0, height - 1),
            Colour.Green
          )
        );
      }

      particleRuleSet = new ParticleRuleSet(-2, 10, 50);
      //   p5.frameRate(1);
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
          //   console.log(forceToApply);

          particles[i].applyForce(forceToApply);
        }
        particles[i].update();
        p5.fill(particles[i].p5Colour);
        p5.circle(particles[i].position.x, particles[i].position.y, 10);
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
