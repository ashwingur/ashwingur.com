import React from "react";
import BasicNavbar from "../../components/BasicNavbar";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";

const Circles = () => {
  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let points: Point[] = [];
    let padding = 100;
    let point_gap = 50;
    let time = 0;
    let path_radius_multiplier = 20;
    let direction_scale_multiplier = 5;
    let diameter_multiplier = 6;
    let number_of_layers = 15;
    let speed = 11;
    let hue_multiplier = 100;
    let layer_variance = 100;

    class Point {
      private time_offset: number;
      public layer: number;
      private direction: number;
      public hue: number;
      private last_x: number = 0;
      private last_y: number = 0;

      constructor(public x_centre: number, public y_centre: number) {
        this.layer = Math.ceil(Math.random() * number_of_layers);
        this.time_offset = Math.random();
        this.direction = (Math.random() - 0.5) * direction_scale_multiplier;

        this.hue = Math.random() * layer_variance + hue_multiplier * this.layer;
        this.hue -= Math.floor(this.hue / 360) * 360;
      }

      pathRadius(): number {
        return this.layer * path_radius_multiplier * this.direction;
      }
      diameter(): number {
        return this.layer * diameter_multiplier;
      }

      angle(time: number): number {
        return (
          (this.direction * speed * (time + this.time_offset)) / this.diameter()
        );
      }

      mouseDistance(): number {
        return Math.sqrt(
          Math.pow(this.last_x - p5.mouseX, 2) +
            Math.pow(this.last_y - p5.mouseY, 2)
        );
      }

      position(time: number): number[] {
        let x_pos =
          this.x_centre + this.pathRadius() * p5.cos(this.angle(time));
        let y_pos =
          this.y_centre + this.pathRadius() * p5.sin(this.angle(time));
        this.last_x = x_pos;
        this.last_y = y_pos;
        return [x_pos, y_pos];
      }
    }

    p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      p5.colorMode(p5.HSL);

      for (let x = -padding; x < p5.windowWidth + padding; x += point_gap) {
        for (let y = -padding; y < p5.windowHeight + padding; y += point_gap) {
          points.push(new Point(x, y));
        }
      }
      points.sort((a, b) => a.layer - b.layer);
    };

    p5.draw = () => {
      time += 0.02;
      p5.background(0, 0);
      p5.clear();
      p5.noStroke();

      points.forEach((point) => {
        p5.fill(point.hue, 40, 70, 0.7);
        const [x, y] = point.position(time);
        p5.circle(x, y, point.diameter() - point.mouseDistance() / 70);
      });
    };
  };

  return (
    <div>
      <BasicNavbar absolute={true} />
      <h1 className="text-center pt-20">Bubbles!</h1>
      <div className="fixed inset-0 -z-10">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default Circles;
