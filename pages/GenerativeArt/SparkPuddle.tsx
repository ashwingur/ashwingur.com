import ArtNavBar from "../../components/ArtNavBar";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import p5 from "p5";

const SparkPuddle = () => {
  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let width: number;
    let height: number;
    let groundLevel: number;
    const decayRate = 0.04;
    const gravity = 0.5;
    const generationChance = 0.02;
    const startingRadius = 10;
    const explosivenessX = 8;
    const explosivenessY = 10;
    const hueRange = 20;
    const hueValue = 30;
    let particles: Particle[] = [];

    class Particle {
      velocity: p5.Vector;
      position: p5.Vector;
      hue: number;
      light: number;

      constructor(public x: number, public y: number, public radius: number) {
        this.position = p5.createVector(x, y);
        this.velocity = p5.createVector(
          (Math.random() - 0.5) * explosivenessX,
          (Math.random() - 0.5) * explosivenessY
        );
        this.hue = hueValue + (Math.random() - 0.5) * hueRange;
        this.light = 60 + Math.random() * 40;
      }

      update() {
        this.radius -= decayRate;
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.velocity.y += gravity;

        // Check if ground was hit, flip the velocity with some energy lost
        if (this.position.y > groundLevel - this.radius / 2) {
          this.velocity.y *= -(Math.random() / 4 + 0.5);
          this.position.y = groundLevel - this.radius / 2;
        }

        // Check if we hit a wall
        if (this.position.x < 0 || this.position.x >= width) {
          this.velocity.x *= -1;
        }
      }

      draw(reflection: boolean) {
        p5.fill(this.hue, 100, this.light);
        if (reflection) {
          p5.circle(
            this.position.x,
            groundLevel + (groundLevel - this.position.y),
            this.radius
          );
        } else {
          p5.circle(this.position.x, this.position.y, this.radius);
        }
      }

      isDead() {
        return this.radius < 0;
      }
    }

    p5.setup = () => {
      width = Math.min(p5.windowWidth - 20, 1200);
      height = Math.min(p5.windowWidth - 20, 800);
      p5.createCanvas(width, height);
      groundLevel = Math.floor(height * 0.6);
      p5.noStroke();
      p5.colorMode(p5.HSL);
    };

    p5.draw = () => {
      p5.background(0);

      // If a particle is dead remove it from the list
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].isDead()) {
          particles.splice(i, 1);
        }
      }

      if (p5.mouseX >= 0 && p5.mouseX <= width && p5.mouseY < groundLevel)
        for (let i = 0; i < 100; i++) {
          if (Math.random() <= generationChance) {
            particles.push(new Particle(p5.mouseX, p5.mouseY, startingRadius));
          }
        }

      // First draw the reflection and apply a blur
      particles.forEach((p) => {
        p.update();
        p.draw(true);
      });

      p5.filter(p5.BLUR, 4);

      particles.forEach((p) => {
        p.draw(false);
      });
    };
  };

  return (
    <div>
      <ArtNavBar fixed={true} />
      <h1 className="text-center pt-20">Spark Puddle</h1>
      <div className="flex justify-center mt-4 mb-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default SparkPuddle;
