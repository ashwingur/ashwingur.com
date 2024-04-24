import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Sketch, P5CanvasInstance } from "@p5-wrapper/react";
import React from "react";
import BasicNavbar from "../../components/BasicNavbar";
import p5 from "p5";

const BouncingParticles = () => {
  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let particles: Particle[] = [];

    class Particle {
      position: p5.Vector;
      velocity: p5.Vector;
      constructor(x: number, y: number) {
        this.position = p5.createVector(x, y);
        this.velocity = p5.createVector(20, 20);
      }

      updatePosition() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.x < 0 || this.position.x > p5.windowWidth) {
          this.velocity.x *= -1;
        }
        if (this.position.y < 0 || this.position.y > p5.windowHeight) {
          this.velocity.y *= -1;
        }
      }
    }

    p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      particles.push(new Particle(100, 100));
    };

    p5.draw = () => {
      p5.background(0);
      p5.fill(255);

      particles.forEach((p) => {
        p5.circle(p.position.x, p.position.y, 10);
        p.updatePosition();
      });
    };
  };
  return (
    <div>
      <BasicNavbar absolute={true} />
      <h1 className="text-white text-center pt-20">Bouncing Particles</h1>
      <div className="fixed inset-0 -z-10">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default BouncingParticles;
