import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Sketch, P5CanvasInstance } from "@p5-wrapper/react";
import React from "react";
import BasicNavbar from "../../components/BasicNavbar";
import p5 from "p5";
import { useTheme } from "next-themes";

const BouncingParticles = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let particles: Particle[] = [];
    let default_num_particles = 50;
    let default_speed = 10;
    let default_size = 10;
    let speed_slider: p5.Element;
    let size_slider: p5.Element;
    let amount_slider: p5.Element;

    class Particle {
      position: p5.Vector;
      velocity: p5.Vector;
      constructor(
        x: number = p5.random(0, p5.windowWidth),
        y: number = p5.random(0, p5.windowHeight)
      ) {
        this.position = p5.createVector(x, y);
        this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
        this.velocity.normalize();
      }

      updatePosition(speed: number) {
        this.position.x += this.velocity.x * speed;
        this.position.y += this.velocity.y * speed;

        if (this.position.x < 0) {
          this.position.x = 0;
          this.velocity.x *= -1;
        } else if (this.position.x >= p5.windowWidth) {
          this.position.x = p5.windowWidth - 1;
          this.velocity.x *= -1;
        }

        if (this.position.y < 0) {
          this.position.y = 0;
          this.velocity.y *= -1;
        } else if (this.position.y >= p5.windowHeight) {
          this.position.y = p5.windowHeight - 1;
          this.velocity.y *= -1;
        }
      }
    }

    p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);

      speed_slider = p5.createSlider(1, 100, default_speed, 1);
      speed_slider.size(200);
      speed_slider.position(p5.windowWidth / 2 - 100, 150);

      amount_slider = p5.createSlider(1, 1000, default_num_particles, 1);
      amount_slider.size(200);
      amount_slider.position(p5.windowWidth / 2 - 100, 180);

      size_slider = p5.createSlider(1, 100, default_size, 1);
      size_slider.size(200);
      size_slider.position(p5.windowWidth / 2 - 100, 210);

      for (let i = 0; i < default_num_particles; i++) {
        particles.push(new Particle());
      }

      p5.noStroke();
      // p5.fill(0);
      currentTheme === "light" ? p5.fill(0) : p5.fill(255);
    };

    p5.draw = () => {
      // Have a low alpha value for the blur effect
      // p5.clear();
      p5.background(0, 10);
      currentTheme === "light" ? p5.background(255, 10) : p5.background(0, 10);
      // Apply a blur for a trail effect
      p5.filter(p5.BLUR, 5);

      // Add or delete particles if slider changed
      const amount_value = amount_slider.value() as number;
      while (amount_value !== particles.length) {
        if (amount_value < particles.length) {
          particles.pop();
        } else {
          particles.push(new Particle());
        }
      }

      particles.forEach((p) => {
        p5.circle(p.position.x, p.position.y, size_slider.value() as number);
        p.updatePosition(speed_slider.value() as number);
      });
    };
  };
  return (
    <div>
      <BasicNavbar absolute={true} />
      <h1 className="text-center pt-20">Bouncing Particles</h1>
      <div className="fixed inset-0 -z-10">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default BouncingParticles;
