import React from "react";
import BasicNavbar from "../../components/BasicNavbar";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const NeonBeehive = () => {
  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let particles: Particle[] = [];
    let sparks: Spark[] = [];
    let hexagonSize = 15;
    let speed = 2;
    let spawnPeriod = 20;
    let timeSinceLastSpawn = 0;
    let frameRate = 180;
    let particle_radius = 3;
    let particle_colour = 0;
    let particle_life = 500;
    let spark_life = 10;
    let spark_spread = 10;
    let spark_frequency = 0.1;

    class Spark {
      life: number;

      constructor(public x: number, public y: number, public colour: number) {
        this.life = spark_life;
      }

      update() {
        this.life--;
      }

      draw() {
        p5.fill(this.colour, 50, 60);
        p5.circle(this.x, this.y, 2);
      }

      isDead() {
        return this.life < 0;
      }
    }

    class Particle {
      life: number;
      distance_travelled: number;
      direction_angle: number;

      constructor(public x: number, public y: number, public colour: number) {
        this.life = particle_life;
        this.distance_travelled = 0;
        this.direction_angle = Math.floor(p5.random(0, 3)) * 240;
      }

      update() {
        // Increment the distance travelled
        this.distance_travelled += speed;
        // If it has reached the hexagon size, then we must make a turn
        if (this.distance_travelled >= hexagonSize) {
          // Update x,y
          this.x += hexagonSize * p5.cos(this.direction_angle);
          this.y += hexagonSize * p5.sin(this.direction_angle);
          // Update direction by +-60 degrees for a hexagon. 120 is for a triangle
          this.direction_angle += Math.random() > 0.5 ? 60 : -60;
          this.direction_angle %= 360; // Keep it between 0 and 360

          // New line started, reset distance travelled
          this.distance_travelled = 0;
        }

        // Create a random spark
        if (Math.random() < spark_frequency) {
          sparks.push(
            new Spark(
              this.x +
                this.distance_travelled * p5.cos(this.direction_angle) +
                Math.random() * spark_spread,
              this.y +
                this.distance_travelled * p5.sin(this.direction_angle) +
                Math.random() * spark_spread,
              this.colour
            )
          );
        }

        this.life--;
      }

      draw() {
        p5.fill(this.colour, 80, 60);
        p5.circle(
          this.x + this.distance_travelled * p5.cos(this.direction_angle),
          this.y + this.distance_travelled * p5.sin(this.direction_angle),
          particle_radius
        );
      }

      isDead(): boolean {
        return this.life < 0;
      }
    }

    p5.setup = () => {
      p5.createCanvas(800, 800);

      p5.angleMode(p5.DEGREES);

      //   for (let i = 0; i < 1; i++) {
      //     particles.push(new Particle(400, 400));
      //   }

      p5.colorMode(p5.HSL);
      p5.noStroke();
      p5.frameRate(frameRate);
      p5.background(0, 0, 0);
    };

    p5.draw = () => {
      p5.background(0, 0, 0, 0.03);

      particle_colour += 0.15;
      particle_colour %= 360;

      timeSinceLastSpawn++;
      if (timeSinceLastSpawn >= spawnPeriod) {
        particles.push(new Particle(400, 400, particle_colour));
        timeSinceLastSpawn = 0;
      }

      // If a particle is dead remove it from the list
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].isDead()) {
          particles.splice(i, 1);
        }
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        if (sparks[i].isDead()) {
          sparks.splice(i, 1);
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      sparks.forEach((s) => {
        s.update();
        s.draw();
      });
    };
  };

  return (
    <div>
      <BasicNavbar absolute={true} />
      <h1 className="text-center pt-20">Neon Beehive</h1>
      <div className="flex justify-center mt-4">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default NeonBeehive;
