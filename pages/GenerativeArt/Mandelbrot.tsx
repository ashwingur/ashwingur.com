import ArtNavBar from "@components/navbars/ArtNavBar";
import { P5CanvasInstance, Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import p5 from "p5";
import vert from "./Mandelbrot/shader.vert";
import frag from "./Mandelbrot/shader.frag";

const Mandelbrot = () => {
  const sketch: Sketch = (p5: P5CanvasInstance) => {
    let width: number;
    let height: number;
    let mandelbrot: p5.Shader;

    p5.preload = () => {};

    p5.setup = () => {
      width = Math.min(p5.windowWidth - 20, 800);
      height = Math.min(p5.windowWidth - 20, 800);
      p5.createCanvas(width, height, p5.WEBGL);
      mandelbrot = p5.createShader(vert, frag);
      p5.shader(mandelbrot);
      // Set the shader uniform p to an array.
      // p is the center point of the Mandelbrot image.
      mandelbrot.setUniform("p", [-0.74364388703, 0.13182590421]);

      // Set the shader uniform r to 0.005.
      // r is the size of the image in Mandelbrot-space.
      mandelbrot.setUniform("r", 0.005);

      p5.noStroke();

      p5.plane(width, height);
    };

    p5.draw = () => {
      //   p5.rect(0, 0, width, height);
      let radius = 0.005 * (p5.sin(p5.frameCount * 0.0005 + 4) + 1);
      mandelbrot.setUniform("r", radius);

      // Add a plane as a drawing surface.
      p5.plane(width, height);
    };
  };

  return (
    <div>
      <ArtNavBar fixed={true} />
      <h1 className="text-center pt-20">Mandelbrot</h1>
      <div className="flex justify-center mt-4 mb-8">
        <NextReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default Mandelbrot;
